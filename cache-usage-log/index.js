/*
 * 缓存用量记录 (Cache Usage Log) for SillyTavern + 酒馆助手 (JS-Slash-Runner)
 *
 * 记录每次生成返回的 usage（缓存写入 / 缓存读取 / 未缓存输入 / 输出 / 推理 / 费用）。
 * 结果写进该条 AI 消息的 extra.cache_usage（随聊天存档持久化），显示在消息编辑按钮旁。
 *
 * 原理：包装酒馆主窗口 window.parent.fetch，拦截 /api/backends/chat-completions/generate 的响应，
 *       clone 一份在后台解析，不影响酒馆原本的处理。
 */
;(function () {
  'use strict';

  const LOG = '[缓存用量记录]';
  const TARGET_PATH = '/api/backends/chat-completions/generate';
  const STYLE_ID = 'cul_script_style';
  const UI_WINDOW = window.parent;
  const UI_DOCUMENT = UI_WINDOW.document;

  const DEFAULTS = {
    enabled: true,
    showBadge: true,
    // 缓存口径（同 CPA-Manager-Plus 的 cache_input_mode）：
    //   auto | separate_from_input | included_in_input | read_included_creation_separate
    cacheInputMode: 'auto',
    maxRecords: 200,
    records: [],
  };

  // ------------------------------------------------------------
  //  样式注入（注入到主页面 head）
  // ------------------------------------------------------------
  function injectStyle() {
    if (UI_DOCUMENT.getElementById(STYLE_ID)) return;
    const style = UI_DOCUMENT.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.cache-usage-log-settings .checkbox_label {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 6px;',
      '}',
      '.cache-usage-log-settings .cul-row {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 6px;',
      '  margin: 6px 0;',
      '}',
      '/* 消息上的用量条（常驻显示，放在悬停按钮栏外） */',
      '.mes .cul-badge {',
      '  display: inline-flex !important;',
      '  visibility: visible !important;',
      '  opacity: 1 !important;',
      '  align-items: center;',
      '  align-self: center;',
      '  flex-shrink: 0;',
      '  gap: 0.7em;',
      '  margin: 0 6px;',
      '  padding: 1px 8px;',
      '  border-radius: 6px;',
      '  background: rgba(127, 127, 127, 0.1);',
      '  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;',
      '  font-size: 0.72em;',
      '  line-height: 1.6;',
      '  white-space: nowrap;',
      '  color: var(--SmartThemeBodyColor, #ccc);',
      '  user-select: none;',
      '}',
      '.mes .cul-badge > span { opacity: 0.9; }',
      '.mes .cul-badge .cul-total { color: var(--SmartThemeBodyColor, #ccc); font-weight: 600; }',
      '.mes .cul-badge .cul-in   { color: #8ab4f8; }',
      '.mes .cul-badge .cul-out  { color: #c3a6ff; }',
      '.mes .cul-badge .cul-r    { color: #7fd1ae; }',
      '.mes .cul-badge .cul-w    { color: #e6c07b; }',
      '.mes .cul-badge .cul-ch.good { color: #7fd1ae; }',
      '.mes .cul-badge .cul-ch.mid  { color: #e6c07b; }',
      '.mes .cul-badge .cul-ch.bad  { color: #ef8a8a; }',
      '.mes .cul-badge .cul-cost { color: var(--SmartThemeBodyColor, #ccc); opacity: 0.65; }',
    ].join('\n');
    UI_DOCUMENT.head.appendChild(style);
  }

  // ------------------------------------------------------------
  //  设置（使用酒馆助手脚本变量持久化，并向后兼容旧版 extensionSettings）
  // ------------------------------------------------------------
  let settings = null;

  function loadSettings() {
    let raw = {};
    try {
      raw = getVariables({ type: 'script' }) || {};
    } catch (e) {
      console.warn(LOG, '读取脚本变量失败', e);
    }

    // 迁移旧版原生扩展保存在 extensionSettings.cache_usage_log 里的数据
    const legacy = SillyTavern?.extensionSettings?.cache_usage_log;
    if (legacy && typeof legacy === 'object' && Object.keys(raw).length === 0) {
      raw = _.cloneDeep(legacy);
    }

    const merged = _.cloneDeep(DEFAULTS);
    for (const key of Object.keys(DEFAULTS)) {
      if (raw[key] !== undefined) {
        merged[key] = _.cloneDeep(raw[key]);
      }
    }
    if (!Array.isArray(merged.records)) merged.records = [];
    settings = merged;
    return settings;
  }

  function getSettings() {
    return settings || loadSettings();
  }

  const save = _.debounce(() => {
    if (!settings) return;
    try {
      replaceVariables(_.cloneDeep(settings), { type: 'script' });
    } catch (e) {
      console.warn(LOG, '保存脚本变量失败', e);
    }
  }, 150);

  // ------------------------------------------------------------
  //  usage 解析
  // ------------------------------------------------------------
  function num(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }

  /**
   * 把一个 usage 对象（Claude 或 OpenAI 格式）合并进 acc。
   * 后到的非空字段覆盖先到的（Claude 流式里 message_delta 的 output_tokens 是累计值）。
   */
  function mergeUsage(acc, u) {
    if (!u || typeof u !== 'object') return acc;
    const set = (key, val) => {
      const n = num(val);
      if (n === undefined) return;
      // 流式里 message_delta 可能把 input 类字段报 0，不用 0 覆盖已有的非 0 值
      if (n === 0 && acc[key]) return;
      acc[key] = n;
    };

    // Claude
    set('input', u.input_tokens);
    set('cacheWrite', u.cache_creation_input_tokens ?? u.cache_creation_tokens ?? u.cache_write_tokens);
    set('cacheRead', u.cache_read_input_tokens ?? u.cache_read_tokens);
    set('output', u.output_tokens);
    set('reasoning', u.output_tokens_details?.thinking_tokens);
    if (u.cache_creation) {
      set('cacheWrite5m', u.cache_creation.ephemeral_5m_input_tokens);
      set('cacheWrite1h', u.cache_creation.ephemeral_1h_input_tokens);
    }

    // OpenAI 兼容
    if (u.prompt_tokens !== undefined) {
      acc.format = acc.format || 'openai';
      const d = u.prompt_tokens_details || {};
      set('cacheRead', d.cached_tokens ?? d.cache_read_tokens);
      set('cacheWrite', d.cache_write_tokens ?? d.cache_creation_tokens);
      set('input', u.prompt_tokens);
    }
    set('output', u.completion_tokens);
    set('reasoning', u.completion_tokens_details?.reasoning_tokens);

    set('cost', u.cost);
    acc.found = true;
    return acc;
  }

  function handlePayload(acc, obj) {
    if (!obj || typeof obj !== 'object') return;
    // Claude 流式
    if (obj.type === 'message_start' && obj.message) {
      acc.format = 'claude';
      if (obj.message.model) acc.model = obj.message.model;
      mergeUsage(acc, obj.message.usage);
    }
    if (obj.type === 'message_delta') {
      acc.format = 'claude';
      mergeUsage(acc, obj.usage);
    }
    // Claude 非流式 / OpenAI 最后一块 / 其他带 usage 的
    if (obj.type !== 'message_start' && obj.type !== 'message_delta' && obj.usage) {
      if (obj.type === 'message') acc.format = 'claude';
      mergeUsage(acc, obj.usage);
    }
    if (obj.model && !acc.model) acc.model = obj.model;
    if (obj.provider) acc.provider = obj.provider;
  }

  async function parseStream(response, acc) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';
    const flushLine = line => {
      line = line.trim();
      if (!line.startsWith('data:')) return;
      const data = line.slice(5).trim();
      if (!data || data === '[DONE]') return;
      try {
        handlePayload(acc, JSON.parse(data));
      } catch {
        /* 忽略非 JSON 行 */
      }
    };
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      let idx;
      while ((idx = buf.indexOf('\n')) >= 0) {
        flushLine(buf.slice(0, idx));
        buf = buf.slice(idx + 1);
      }
    }
    if (buf) flushLine(buf);
  }

  async function parseJson(response, acc) {
    const text = await response.text();
    try {
      handlePayload(acc, JSON.parse(text));
    } catch {
      /* ignore */
    }
  }

  // ------------------------------------------------------------
  //  记录
  // ------------------------------------------------------------
  const MODE_SEPARATE = 'separate_from_input';
  const MODE_INCLUDED = 'included_in_input';
  const MODE_READ_INCLUDED = 'read_included_creation_separate';

  function inferMode(acc, rawInput, cacheRead, cacheWrite) {
    const setting = getSettings().cacheInputMode;
    if (setting && setting !== 'auto') return setting;
    if (acc.format === 'openai') return MODE_INCLUDED;
    const cached = cacheRead + cacheWrite;
    if (cached > 0 && rawInput >= cached) return MODE_INCLUDED;
    return MODE_SEPARATE;
  }

  function normalizeCache(mode, rawInput, cacheRead, cacheWrite) {
    switch (mode) {
      case MODE_INCLUDED:
        return { input: Math.max(0, rawInput - cacheRead - cacheWrite), totalInput: rawInput };
      case MODE_READ_INCLUDED:
        return { input: Math.max(0, rawInput - cacheRead), totalInput: rawInput + cacheWrite };
      default:
        return { input: rawInput, totalInput: rawInput + cacheRead + cacheWrite };
    }
  }

  function finalize(acc, reqInfo) {
    const cacheWrite = acc.cacheWrite ?? 0;
    const cacheRead = acc.cacheRead ?? 0;
    const rawInput = acc.input ?? 0;
    const cacheInputMode = inferMode(acc, rawInput, cacheRead, cacheWrite);
    const { input, totalInput } = normalizeCache(cacheInputMode, rawInput, cacheRead, cacheWrite);
    return {
      time: Date.now(),
      model: acc.model || reqInfo.model || '',
      source: reqInfo.source || '',
      provider: acc.provider || '',
      format: acc.format || '',
      stream: reqInfo.stream,
      found: !!acc.found,
      cacheInputMode,
      rawInput,
      totalInput,
      cacheWrite,
      cacheWrite5m: acc.cacheWrite5m,
      cacheWrite1h: acc.cacheWrite1h,
      input,
      cacheRead,
      hitRate: totalInput > 0 ? cacheRead / totalInput : 0,
      reasoning: acc.reasoning,
      output: acc.output ?? 0,
      cost: acc.cost,
    };
  }

  function addRecord(rec) {
    const s = getSettings();
    s.records.unshift(rec);
    if (s.records.length > s.maxRecords) s.records.length = s.maxRecords;
    save();
    console.log(LOG, rec);
    if (rec.found) {
      pending.usage = rec;
      tryAttach();
    }
  }

  // ------------------------------------------------------------
  //  挂到消息上（写进 message.extra，随聊天文件持久化）
  // ------------------------------------------------------------
  const pending = { usage: null, messageId: null };

  function tryAttach() {
    if (!pending.usage || pending.messageId === null) return;
    const { chat, saveChat } = SillyTavern;
    const id = pending.messageId;
    const msg = chat[id];
    const usage = pending.usage;
    pending.usage = null;
    pending.messageId = null;
    if (!msg || msg.is_user) return;

    msg.extra = msg.extra || {};
    msg.extra.cache_usage = usage;
    // 同步到当前 swipe，切换 swipe 时各自保留
    const sw = msg.swipe_info?.[msg.swipe_id];
    if (sw) {
      sw.extra = sw.extra || {};
      sw.extra.cache_usage = usage;
    }
    saveChat();
    renderBadge(id);
  }

  function onGenerationStarted(_type, _opts, dryRun) {
    if (dryRun) return;
    pending.usage = null;
    pending.messageId = null;
  }

  function onMessageReceived(id) {
    pending.messageId = Number(id);
    tryAttach();
  }

  // ------------------------------------------------------------
  //  fetch 钩子（包装主窗口 UI_WINDOW.fetch，卸载时可还原）
  // ------------------------------------------------------------
  let origFetch = null;

  function installFetchHook() {
    if (origFetch) return;
    origFetch = UI_WINDOW.fetch.bind(UI_WINDOW);

    UI_WINDOW.fetch = async function (input, init) {
      const url = typeof input === 'string' ? input : input?.url || String(input);
      const response = await origFetch(input, init);
      try {
        if (!getSettings().enabled || !url.includes(TARGET_PATH) || !response.ok) return response;

        let reqInfo = {};
        try {
          const body = JSON.parse(init?.body || '{}');
          reqInfo = { model: body.model, source: body.chat_completion_source, stream: !!body.stream };
        } catch {
          /* ignore */
        }

        const copy = response.clone();
        const acc = {};
        const isSse = (response.headers.get('content-type') || '').includes('text/event-stream') || reqInfo.stream;
        (isSse ? parseStream(copy, acc) : parseJson(copy, acc))
          .then(() => addRecord(finalize(acc, reqInfo)))
          .catch(e => console.warn(LOG, '解析失败', e));
      } catch (e) {
        console.warn(LOG, e);
      }
      return response;
    };
  }

  function uninstallFetchHook() {
    if (origFetch) {
      UI_WINDOW.fetch = origFetch;
      origFetch = null;
    }
  }

  // ------------------------------------------------------------
  //  UI 与徽章渲染
  // ------------------------------------------------------------
  function short(n) {
    n = Number(n) || 0;
    const f = (v, u) => `${v < 10 ? +v.toFixed(1) : Math.round(v)}${u}`;
    if (n >= 1e6) return f(n / 1e6, 'M');
    if (n >= 1e3) return f(n / 1e3, 'k');
    return String(n);
  }

  function money(c) {
    if (c === undefined || !Number.isFinite(c)) return null;
    return `$${c >= 1 ? c.toFixed(2) : c >= 0.01 ? c.toFixed(3) : c.toFixed(4)}`;
  }

  function renderBadge(id) {
    const el = $(`#chat .mes[mesid="${id}"]`);
    if (!el.length) return;
    el.find('.cul-badge').remove();
    if (!getSettings().showBadge) return;
    const rec = SillyTavern.chat?.[id]?.extra?.cache_usage;
    if (!rec) return;
    const rate = rec.hitRate || 0;
    const chCls = rate >= 0.8 ? 'good' : rate >= 0.3 ? 'mid' : 'bad';
    const seg = (cls, text) => `<span class="cul-${cls}">${text}</span>`;
    const total = rec.totalInput ?? (rec.input || 0) + (rec.cacheRead || 0) + (rec.cacheWrite || 0);
    const parts = [
      seg('total', `Σ${short(total)}`),
      seg('in', `↑${short(rec.input)}`),
      seg('out', `↓${short(rec.output)}`),
      seg('r', `R${short(rec.cacheRead)}`),
      seg('w', `W${short(rec.cacheWrite)}`),
      seg(`ch ${chCls}`, `CH${(rate * 100).toFixed(1)}%`),
    ];
    const cost = rec.cost !== undefined ? money(Number(rec.cost)) : null;
    if (cost) parts.push(seg('cost', cost));
    const badge = $(`<div class="cul-badge">${parts.join('')}</div>`);
    // 放在 .mes_buttons 外面（它默认悬停才显示），保证常驻可见
    const buttons = el.find('.mes_buttons').first();
    if (buttons.length) buttons.before(badge);
    else el.find('.ch_name').first().append(badge);
  }

  function renderAllBadges() {
    $('#chat .mes').each(function () {
      renderBadge($(this).attr('mesid'));
    });
  }

  function exportRecords() {
    const s = getSettings();
    const blob = new Blob([JSON.stringify(s.records, null, 2)], { type: 'application/json' });
    const a = UI_DOCUMENT.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `cache-usage-${Date.now()}.json`;
    UI_DOCUMENT.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 3000);
    toastr.success(`已导出 ${s.records.length} 条缓存用量记录`, '缓存用量记录');
  }

  function clearRecords() {
    const s = getSettings();
    s.records = [];
    save();
    toastr.info('已清空缓存用量历史记录', '缓存用量记录');
  }

  function buildSettingsHtml() {
    return `
    <div id="cul_settings_panel" class="cache-usage-log-settings">
      <div class="inline-drawer">
        <div class="inline-drawer-toggle inline-drawer-header">
          <b>缓存用量记录</b>
          <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
        </div>
        <div class="inline-drawer-content">
          <label class="checkbox_label"><input id="cul_enabled" type="checkbox" /><span>启用记录</span></label>
          <label class="checkbox_label"><input id="cul_badge" type="checkbox" /><span>在消息上显示用量</span></label>
          <label for="cul_mode">缓存口径（input_tokens 是否含缓存）</label>
          <select id="cul_mode" class="text_pole">
            <option value="auto">自动（推荐）</option>
            <option value="separate_from_input">不含缓存：↑ = input（原生 Claude）</option>
            <option value="included_in_input">含缓存：↑ = input − R − W（OpenAI 等）</option>
            <option value="read_included_creation_separate">含读取不含写入：↑ = input − R</option>
          </select>
          <div class="cul-row">
            <div id="cul_export" class="menu_button">导出 JSON</div>
            <div id="cul_clear" class="menu_button">清空记录</div>
          </div>
        </div>
      </div>
    </div>`;
  }

  function bindUI() {
    const s = getSettings();
    $('#cul_enabled')
      .prop('checked', s.enabled)
      .on('change', function () {
        s.enabled = this.checked;
        save();
      });
    $('#cul_badge')
      .prop('checked', s.showBadge)
      .on('change', function () {
        s.showBadge = this.checked;
        save();
        renderAllBadges();
      });
    $('#cul_mode')
      .val(s.cacheInputMode || 'auto')
      .on('change', function () {
        s.cacheInputMode = this.value;
        save();
      });
    $('#cul_clear').on('click', clearRecords);
    $('#cul_export').on('click', exportRecords);
  }

  function registerScriptButtons() {
    appendInexistentScriptButtons([
      { name: '导出用量JSON', visible: true },
      { name: '清空用量记录', visible: true },
    ]);
    eventOn(getButtonEvent('导出用量JSON'), exportRecords);
    eventOn(getButtonEvent('清空用量记录'), clearRecords);
    replaceScriptInfo(
      [
        '版本: 0.3.0',
        '类型: 酒馆助手脚本',
        '功能: 记录每次生成返回的缓存与 Token 用量（支持 Claude / OpenAI 格式），常驻显示在消息旁。',
        '设置: 可在「扩展设置 -> 缓存用量记录」中调整开关与缓存口径。',
      ].join('\n'),
    );
  }

  function init() {
    injectStyle();
    loadSettings();
    registerScriptButtons();

    $('#cul_settings_panel').remove();
    $('#extensions_settings2').append(buildSettingsHtml());
    bindUI();
    installFetchHook();

    eventOn(tavern_events.GENERATION_STARTED, onGenerationStarted);
    eventOn(tavern_events.MESSAGE_RECEIVED, onMessageReceived);
    eventOn(tavern_events.CHARACTER_MESSAGE_RENDERED, id => renderBadge(id));
    for (const ev of [
      tavern_events.CHAT_CHANGED,
      tavern_events.MORE_MESSAGES_LOADED,
      tavern_events.MESSAGE_SWIPED,
      tavern_events.MESSAGE_UPDATED,
      tavern_events.MESSAGE_DELETED,
    ]) {
      eventOn(ev, () => setTimeout(renderAllBadges, 0));
    }

    renderAllBadges();
    console.log(LOG, '已加载');
  }

  function destroy() {
    uninstallFetchHook();
    $('#cul_settings_panel').remove();
    $('#chat .mes .cul-badge').remove();
    $(UI_DOCUMENT.getElementById(STYLE_ID)).remove();
  }

  $(init);
  $(window).on('pagehide', destroy);
})();
