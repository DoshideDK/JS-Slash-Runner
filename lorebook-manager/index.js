;(function () {
  try {
    var host = (window.parent && window.parent !== window) ? window.parent : window;
    var doc = host.document;
    if (!doc) return;
    if (doc.getElementById('wbm_script_style') || doc.getElementById('worldbook-manager-css')) return;
    var style = doc.createElement('style');
    style.id = 'wbm_script_style';
    style.textContent = [
      '/* ===== 世界书管理器 ===== */',
      ':root {',
      '  --wbm-line: rgba(255, 255, 255, 0.09);',
      '  --wbm-line-strong: rgba(255, 255, 255, 0.16);',
      '  --wbm-text: #e8ebf6;',
      '  --wbm-muted: #9299ad;',
      '  --wbm-faint: #656c7f;',
      '  --wbm-accent: #7c6cff;',
      '  --wbm-accent-2: #3dd6c6;',
      '  --wbm-danger: #ff647c;',
      '  --wbm-shadow: 0 24px 70px rgba(0, 0, 0, 0.55);',
      '}',
      '/* 浮动窗口，不锁定背景滚动 */',
      '#wbm_overlay, #wbm_overlay * { box-sizing: border-box; }',
      '#wbm_overlay {',
      '  position: fixed; z-index: 2147482000; display: none;',
      '  grid-template-rows: auto minmax(0, 1fr) auto;',
      '  color: var(--wbm-text); font-size: 14px; line-height: 1.5;',
      '  font-family: var(--mainFontFamily, "Noto Sans SC", "Microsoft YaHei", system-ui, -apple-system, sans-serif);',
      '  background: linear-gradient(150deg, rgba(30, 33, 47, 0.99), rgba(17, 19, 28, 0.99));',
      '  border: 1px solid var(--wbm-line-strong); border-radius: 14px;',
      '  box-shadow: var(--wbm-shadow); overflow: hidden;',
      '}',
      '#wbm_overlay.wbm-visible { display: grid; }',
      '#wbm_overlay::before {',
      '  content: ""; position: absolute; inset: 0 0 auto 0; height: 3px; pointer-events: none;',
      '  background: linear-gradient(90deg, var(--wbm-accent), var(--wbm-accent-2), #67aaff);',
      '}',
      '.wbm-header {',
      '  display: flex; align-items: center; gap: 16px; padding: 13px 16px 12px;',
      '  border-bottom: 1px solid var(--wbm-line); background: rgba(255, 255, 255, 0.018); flex: 0 0 auto;',
      '  cursor: grab; touch-action: none; -webkit-user-select: none; user-select: none;',
      '}',
      '.wbm-header:active { cursor: grabbing; }',
      '.wbm-header-actions { cursor: default; }',
      '.wbm-resize {',
      '  position: absolute; z-index: 50; right: 0; bottom: 0; width: 22px; height: 22px;',
      '  cursor: nwse-resize; touch-action: none; -webkit-user-select: none; user-select: none;',
      '  -webkit-tap-highlight-color: transparent;',
      '}',
      '.wbm-resize::after {',
      '  content: ""; position: absolute; right: 4px; bottom: 4px; width: 8px; height: 8px;',
      '  border-right: 2px solid var(--wbm-faint); border-bottom: 2px solid var(--wbm-faint); opacity: 0.85;',
      '}',
      '.wbm-brand { display: flex; align-items: center; gap: 11px; min-width: 0; }',
      '.wbm-brand-icon {',
      '  display: flex; align-items: center; justify-content: center; width: 38px; height: 38px;',
      '  border-radius: 12px; color: #fff; font-size: 17px;',
      '  background: linear-gradient(135deg, var(--wbm-accent), var(--wbm-accent-2));',
      '  box-shadow: 0 8px 20px rgba(124, 108, 255, 0.32);',
      '}',
      '.wbm-brand h2 { margin: 0; font-size: 17px; line-height: 1.25; letter-spacing: 0.02em; }',
      '.wbm-brand p { margin: 2px 0 0; color: var(--wbm-muted); font-size: 12px; }',
      '.wbm-header-spacer { flex: 1; }',
      '.wbm-header-actions { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; justify-content: flex-end; }',
      '.wbm-btn, .wbm-btn-ghost, .wbm-icon-btn {',
      '  appearance: none; border: 1px solid var(--wbm-line-strong); border-radius: 9px;',
      '  background: rgba(255, 255, 255, 0.045); color: var(--wbm-text);',
      '  font: inherit; font-size: 13px; line-height: 1; padding: 8px 11px; cursor: pointer;',
      '  transition: background 0.15s ease, border-color 0.15s ease, transform 0.06s ease;',
      '  white-space: nowrap;',
      '}',
      '.wbm-btn:hover, .wbm-btn-ghost:hover, .wbm-icon-btn:hover { background: rgba(255, 255, 255, 0.09); border-color: rgba(255, 255, 255, 0.28); }',
      '.wbm-btn:active, .wbm-icon-btn:active { transform: translateY(1px); }',
      '.wbm-btn.is-primary { background: linear-gradient(135deg, rgba(124, 108, 255, 0.95), rgba(61, 214, 198, 0.88)); border-color: transparent; color: #0b0c12; font-weight: 700; }',
      '.wbm-btn.is-danger { color: var(--wbm-danger); border-color: rgba(255, 100, 124, 0.42); background: rgba(255, 100, 124, 0.08); }',
      '.wbm-btn[disabled], .wbm-icon-btn[disabled] { opacity: 0.42; cursor: not-allowed; }',
      '.wbm-icon-btn { width: 32px; height: 32px; padding: 0; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; }',
      '.wbm-input, .wbm-textarea {',
      '  width: 100%; min-width: 0; border: 1px solid var(--wbm-line-strong); border-radius: 9px;',
      '  background: rgba(8, 9, 14, 0.65); color: var(--wbm-text); font: inherit; font-size: 13px;',
      '  padding: 8px 10px; outline: none; transition: border-color 0.15s ease, box-shadow 0.15s ease;',
      '}',
      '.wbm-input:focus, .wbm-textarea:focus { border-color: rgba(124, 108, 255, 0.78); box-shadow: 0 0 0 3px rgba(124, 108, 255, 0.14); }',
      '.wbm-textarea { resize: vertical; min-height: 84px; line-height: 1.55; }',
      '.wbm-check { display: inline-flex; align-items: center; gap: 7px; color: var(--wbm-text); cursor: pointer; user-select: none; font-size: 13px; }',
      '.wbm-check input[type="checkbox"] { width: 15px; height: 15px; accent-color: var(--wbm-accent); cursor: pointer; }',
      '.wbm-field { display: flex; flex-direction: column; gap: 5px; min-width: 0; }',
      '.wbm-field > label { color: var(--wbm-muted); font-size: 12px; }',
      '.wbm-help { color: var(--wbm-faint); font-size: 11.5px; line-height: 1.45; }',
      '.wbm-hidden { display: none !important; }',
      '.wbm-right-panels { flex: 1 1 auto; min-height: 0; overflow: auto; padding: 14px 14px 18px; }',
      '.wbm-right-panels::-webkit-scrollbar { width: 8px; }',
      '.wbm-right-panels::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.14); border-radius: 999px; }',
      '.wbm-section-title { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin: 0 0 8px; font-size: 13px; font-weight: 700; color: var(--wbm-text); }',
      '.wbm-section-title:not(:first-child) { margin-top: 20px; }',
      '.wbm-section-hint { color: var(--wbm-faint); font-size: 11.5px; line-height: 1.55; }',
      '.wbm-preset-list { display: flex; flex-direction: column; gap: 6px; margin-top: 9px; }',
      '.wbm-preset-item { display: flex; align-items: center; gap: 7px; padding: 8px 9px; border: 1px solid var(--wbm-line); border-radius: 10px; background: rgba(255, 255, 255, 0.024); }',
      '.wbm-preset-item[data-worldbook-preset] { border-color: rgba(124, 108, 255, 0.24); background: rgba(124, 108, 255, 0.055); }',
      '.wbm-preset-main { flex: 1; min-width: 0; }',
      '.wbm-preset-name { font-size: 13px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
      '.wbm-preset-meta { margin-top: 2px; color: var(--wbm-faint); font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
      '.wbm-preset-actions { display: flex; gap: 3px; }',
      '.wbm-preset-actions .wbm-icon-btn { width: 28px; height: 28px; font-size: 11px; }',
      '.wbm-preset-handle { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 28px; flex: 0 0 auto; color: var(--wbm-faint); cursor: grab; touch-action: none; -webkit-user-select: none; user-select: none; }',
      '.wbm-preset-handle:hover { color: var(--wbm-text); }',
      '.wbm-preset-handle:active { cursor: grabbing; }',
      '.wbm-preset-name { cursor: text; }',
      '.wbm-preset-item.is-dragging { opacity: 0.55; border-color: rgba(124, 108, 255, 0.7); background: rgba(124, 108, 255, 0.1); }',
      '.wbm-preset-name.is-renaming { display: none; }',
      '.wbm-preset-name-input { font-size: 13px; font-weight: 600; padding: 4px 7px; }',
      '.wbm-empty { display: flex; align-items: center; justify-content: center; min-height: 72px; padding: 16px; color: var(--wbm-faint); font-size: 12px; border: 1px dashed var(--wbm-line); border-radius: 10px; margin-top: 9px; }',
      '.wbm-footer { display: flex; align-items: center; gap: 10px; padding: 7px 14px; border-top: 1px solid var(--wbm-line); color: var(--wbm-faint); font-size: 11.5px; flex: 0 0 auto; }',
      '.wbm-footer .wbm-footer-right { margin-left: auto; }',
      '.wbm-dialog-mask { position: fixed; inset: 0; z-index: 2147482100; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(4, 5, 9, 0.66); backdrop-filter: blur(5px); }',
      '.wbm-dialog { display: flex; flex-direction: column; width: min(560px, calc(100vw - 30px)); max-height: min(86vh, 820px); color: var(--wbm-text); font-size: 13.5px; background: linear-gradient(150deg, #202433, #14161f); border: 1px solid var(--wbm-line-strong); border-radius: 16px; box-shadow: var(--wbm-shadow); overflow: hidden; }',
      '.wbm-dialog-head { display: flex; align-items: center; gap: 9px; padding: 13px 15px; border-bottom: 1px solid var(--wbm-line); }',
      '.wbm-dialog-head h3 { flex: 1; margin: 0; font-size: 15px; }',
      '.wbm-dialog-body { flex: 1 1 auto; min-height: 0; overflow: auto; padding: 14px 15px 16px; }',
      '.wbm-dialog-foot { display: flex; align-items: center; justify-content: flex-end; gap: 7px; padding: 11px 15px; border-top: 1px solid var(--wbm-line); }',
      '.wbm-menu-item { cursor: pointer; }',
      '@media (max-width: 680px) {',
      '  .wbm-header { padding: 10px 11px; }',
      '  .wbm-brand p { display: none; }',
      '  .wbm-input, .wbm-textarea { font-size: 16px; }',
      '  .wbm-dialog-mask { padding: 0; align-items: flex-end; }',
      '  .wbm-dialog { width: 100vw; max-height: 100dvh; border-radius: 18px 18px 0 0; border-bottom: 0; }',
      '  .wbm-dialog-foot .wbm-btn { flex: 1 1 auto; min-height: 40px; }',
      '}',
    ].join('\n');
    doc.head.appendChild(style);
  } catch (e) {
    console.warn('[世界书管理器] CSS 注入失败', e);
  }
})();

/* 世界书管理器 for SillyTavern + 酒馆助手 (JS-Slash-Runner)
 * 功能：全局世界书预设、角色 / 聊天绑定预设。
 * 依赖：window.TavernHelper (酒馆助手)
 */
(async function () {
  'use strict';

  if (window.__WBM_PRESET_LOADED__) return;
  window.__WBM_PRESET_LOADED__ = true;

  const UI_WINDOW = window.parent && window.parent !== window ? window.parent : window;
  const UI_DOCUMENT = UI_WINDOW.document || document;
  const IS_SCRIPT_IFRAME = UI_WINDOW !== window;

  const $ = UI_WINDOW.jQuery || window.jQuery;
  if (!$) {
    console.error('[世界书管理器] 未找到 jQuery，脚本无法加载');
    return;
  }

  /**
   * 在酒馆助手脚本 iframe 中注册脚本按钮。扩展模式不会调用成功。
   */
  function registerScriptButton(openFn) {
    if (!IS_SCRIPT_IFRAME) return false;
    const buttonName = '世界书管理设置';
    try {
      if (typeof window.appendInexistentScriptButtons === 'function') {
        window.appendInexistentScriptButtons([{ name: buttonName, visible: true }]);
      }
      if (typeof window.getButtonEvent === 'function' && typeof window.eventOn === 'function') {
        window.eventOn(window.getButtonEvent(buttonName), openFn);
      }
      if (typeof window.replaceScriptInfo === 'function') {
        window.replaceScriptInfo(
          [
            '版本: 1.6.1',
            '类型: 酒馆助手脚本',
            '入口: 点击“' + buttonName + '”。',
            '功能: 全局世界书预设、角色 / 聊天绑定预设。',
          ].join('\n'),
        );
      }
      return true;
    } catch (error) {
      console.warn('[世界书管理器] 注册脚本按钮失败', error);
      return false;
    }
  }

  const WBM = {
    version: '1.6.1',
    name: '世界书管理器',
    /** 旧版本地存储键，仅作迁移与本机回退使用 */
    storageKey: 'wbm.settings.v1',
  };

  window.WorldbookManager = WBM;
  if (UI_WINDOW && UI_WINDOW !== window && !UI_WINDOW.WorldbookManager) {
    UI_WINDOW.WorldbookManager = WBM;
  }

  // ---------------------------------------------------------------------------
  // 基础工具
  // ---------------------------------------------------------------------------

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function waitFor(check, timeout = 45000, interval = 180) {
    const started = Date.now();
    while (Date.now() - started < timeout) {
      try {
        const value = check();
        if (value) return value;
      } catch (error) {
        // 继续等待
      }
      await sleep(interval);
    }
    return null;
  }

  function clone(value) {
    if (value === undefined || value === null) return value;
    try {
      const cloneImpl = UI_WINDOW.structuredClone || (typeof structuredClone === 'function' ? structuredClone : null);
      if (cloneImpl) return cloneImpl(value);
    } catch (error) {
      // fall through
    }
    return JSON.parse(JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value === undefined || value === null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function text(value) {
    return value === undefined || value === null ? '' : String(value);
  }

  function uniqueId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }

  function safeJsonParse(string) {
    try {
      return JSON.parse(string);
    } catch (error) {
      return null;
    }
  }

  function safeArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function notify(message, type = 'info', title = WBM.name) {
    const toastr = UI_WINDOW.toastr || window.toastr;
    if (toastr && typeof toastr[type] === 'function') {
      toastr[type](message, title);
      return;
    }
    if (type === 'error') console.error(`[${title}]`, message);
    else console.log(`[${title}]`, message);
  }

  function formatError(error) {
    if (!error) return '未知错误';
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    return String(error);
  }

  function debounce(fn, wait = 180) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  function makeTimestamp() {
    const date = new Date();
    const pad = value => String(value).padStart(2, '0');
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}`;
  }

  function downloadFile(filename, content, mime = 'application/json') {
    try {
      const blob = new Blob([content], { type: `${mime};charset=utf-8` });
      const url = URL.createObjectURL(blob);
      const a = UI_DOCUMENT.createElement('a');
      a.href = url;
      a.download = filename;
      UI_DOCUMENT.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 3000);
    } catch (error) {
      notify(`下载失败：${formatError(error)}`, 'error');
    }
  }

  // ---------------------------------------------------------------------------
  // 条目工具
  // ---------------------------------------------------------------------------

  function getEntryUid(entry) {
    const uid = Number(entry && entry.uid);
    return Number.isFinite(uid) ? uid : null;
  }

  function entryEnabled(entry) {
    return entry ? entry.enabled !== false : true;
  }

  // ---------------------------------------------------------------------------
  // 偏好
  // ---------------------------------------------------------------------------

  function defaultPreferences() {
    return {
      /** 全局世界书预设：{id,name,global:[],entryStates:{book:{uid:enabled}},recordEntries} */
      worldbookPresets: [],
      /** 绑定预设：{id,name,global:[],charPrimary,charAdditional:[],chat} */
      bindingPresets: [],
    };
  }

  // ---------------------------------------------------------------------------
  // 偏好存储
  // 主存储使用酒馆助手的「脚本变量」（type: 'script'），它随脚本/世界书一起保存，
  // 因此同一个 URL 打开的不同设备/客户端可以共享同一套预设。
  // localStorage 仅作为旧版本迁移与本机回退。
  // ---------------------------------------------------------------------------

  /** 用于区分「从未写入」与「被清空」的偏好字段。 */
  const PREF_STORAGE_KEYS = ['worldbookPresets', 'bindingPresets'];

  /** 解析酒馆助手注入的 API：脚本作用域里的全局函数优先，其次 TavernHelper 对象。 */
  function tavernApi(name) {
    try {
      if (typeof window[name] === 'function') return window[name].bind(window);
    } catch (error) {
      // ignore
    }
    const helper = UI_WINDOW.TavernHelper || window.TavernHelper;
    if (helper && typeof helper[name] === 'function') return helper[name].bind(helper);
    return null;
  }

  /** 当前脚本的变量作用域；拿不到脚本 id 时返回 null。 */
  function getScriptVarScope() {
    const getScriptId = tavernApi('getScriptId');
    if (!getScriptId) return null;
    try {
      const id = getScriptId();
      return id ? { type: 'script', script_id: id } : null;
    } catch (error) {
      return null;
    }
  }

  function looksLikePreferences(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
    return PREF_STORAGE_KEYS.some(key => Object.prototype.hasOwnProperty.call(value, key));
  }

  /** 读取共享的脚本变量；没有偏好数据时返回 null。 */
  function readSharedPreferences() {
    const getVariables = tavernApi('getVariables');
    const scope = getScriptVarScope();
    if (!getVariables || !scope) return null;
    try {
      const raw = getVariables(scope);
      return looksLikePreferences(raw) ? raw : null;
    } catch (error) {
      console.warn('[世界书管理器] 读取脚本变量失败', error);
      return null;
    }
  }

  /** 把偏好写入共享的脚本变量；成功返回 true。 */
  function writeSharedPreferences(preferences) {
    const replaceVariables = tavernApi('replaceVariables');
    const scope = getScriptVarScope();
    if (!replaceVariables || !scope) return false;
    try {
      replaceVariables(clone(preferences), scope);
      return true;
    } catch (error) {
      console.warn('[世界书管理器] 写入脚本变量失败', error);
      return false;
    }
  }

  function loadPreferences() {
    const defaults = defaultPreferences();
    const stored = readSharedPreferences() || safeJsonParse(UI_WINDOW.localStorage.getItem(WBM.storageKey));
    if (!stored || typeof stored !== 'object') return defaults;
    return {
      ...defaults,
      ...stored,
      worldbookPresets: Array.isArray(stored.worldbookPresets) ? stored.worldbookPresets : defaults.worldbookPresets,
      bindingPresets: Array.isArray(stored.bindingPresets) ? stored.bindingPresets : defaults.bindingPresets,
    };
  }

  function savePreferences() {
    const shared = writeSharedPreferences(state.preferences);
    try {
      UI_WINDOW.localStorage.setItem(WBM.storageKey, JSON.stringify(state.preferences));
    } catch (error) {
      console.warn('[世界书管理器] 保存偏好失败', error);
    }
    return shared;
  }

  // ---------------------------------------------------------------------------
  // 状态
  // ---------------------------------------------------------------------------

  const state = {
    /** 酒馆助手接口 */
    T: null,
    /** 管理器是否已经打开 */
    opened: false,
    /** 已经初始化的 UI 是否已创建 */
    domReady: false,
    /** 世界书名称列表 */
    names: [],
    /** 全局开启的世界书 */
    globalNames: new Set(),
    /** 当前角色卡绑定：{primary, additional} 或 null */
    charBooks: null,
    /** 当前聊天绑定：string|null */
    chatBook: null,
    /** 偏好 */
    preferences: loadPreferences(),
    /** 操作中的计数，用于防止重复点击 */
    busy: false,
  };

  /** 每个世界书一把操作锁，避免并发写覆盖 */
  const worldbookQueues = new Map();

  function enqueueWorldbook(name, task) {
    const key = `worldbook:${name}`;
    const previous = worldbookQueues.get(key) || Promise.resolve();
    const next = previous.catch(() => undefined).then(task);
    worldbookQueues.set(
      key,
      next.catch(() => undefined),
    );
    return next;
  }

  const scheduleRender = debounce(() => {
    if (state.opened && state.domReady) renderAll();
  }, 60);

  function getTavernHelper() {
    return UI_WINDOW.TavernHelper || window.TavernHelper || state.T;
  }

  function safeGetCharBooks() {
    try {
      const T = getTavernHelper();
      const result = T.getCharWorldbookNames('current');
      if (!result || typeof result !== 'object') return null;
      return {
        primary: result.primary || null,
        additional: safeArray(result.additional).filter(Boolean),
      };
    } catch (error) {
      return null;
    }
  }

  function safeGetChatBook() {
    try {
      const T = getTavernHelper();
      return T.getChatWorldbookName('current') || null;
    } catch (error) {
      return null;
    }
  }

  function refreshBindings() {
    const T = getTavernHelper();
    if (!T || !T.getWorldbookNames) return;
    try {
      state.globalNames = new Set(T.getGlobalWorldbookNames());
    } catch (error) {
      state.globalNames = new Set();
    }
    state.charBooks = safeGetCharBooks();
    state.chatBook = safeGetChatBook();
  }

  async function refreshWorldbookNames() {
    const T = getTavernHelper();
    if (!T || !T.getWorldbookNames) throw new Error('酒馆助手尚未初始化');
    state.names = safeArray(T.getWorldbookNames()).slice().sort((a, b) => text(a).localeCompare(text(b), 'zh-Hans-CN'));
    refreshBindings();
    return state.names;
  }

  /**
   * 用 mutator 原子地更新某个世界书。
   * mutator 收到当前条目的深拷贝；若返回值不是数组，则使用传入的数组。
   */
  async function mutateWorldbook(name, mutator) {
    const T = getTavernHelper();
    if (!T || !T.getWorldbook || !T.replaceWorldbook) throw new Error('酒馆助手尚未初始化');
    if (!state.names.includes(name)) throw new Error(`世界书不存在：${name}`);
    return enqueueWorldbook(name, async () => {
      const current = clone(await T.getWorldbook(name));
      const returned = await mutator(current);
      const next = Array.isArray(returned) ? returned : current;
      await T.replaceWorldbook(name, next, { render: 'debounced' });
    });
  }

  // ---------------------------------------------------------------------------
  // 通用对话框
  // ---------------------------------------------------------------------------

  function createDialog({ title, body = '', buttons = [], onOpen = null }) {
    const dialogId = uniqueId('wbm_dialog');
    const $mask = $(
      `<div class="wbm-dialog-mask" data-dialog-id="${escapeHtml(dialogId)}">
         <div class="wbm-dialog" role="dialog" aria-modal="true">
           <div class="wbm-dialog-head">
             <h3>${escapeHtml(title)}</h3>
             <button type="button" class="wbm-icon-btn" data-dialog-close title="关闭"><i class="fa-solid fa-xmark"></i></button>
           </div>
           <div class="wbm-dialog-body">${body}</div>
           <div class="wbm-dialog-foot"></div>
         </div>
       </div>`,
    ).appendTo(UI_DOCUMENT.body);

    const $dialog = $mask.find('.wbm-dialog');
    const $foot = $dialog.find('.wbm-dialog-foot');

    const api = {
      id: dialogId,
      $mask,
      $dialog,
      $body: $dialog.find('.wbm-dialog-body'),
      close(reason = 'close') {
        if (!UI_DOCUMENT.body.contains($mask.get(0))) return;
        $mask.remove();
        $(UI_DOCUMENT).off(`keydown.wbm_${dialogId}`);
        if (typeof api.onClose === 'function') api.onClose(reason);
      },
      setBusy(busy) {
        $foot.find('button').prop('disabled', !!busy);
      },
    };

    if (typeof onOpen === 'function') {
      try {
        onOpen(api);
      } catch (error) {
        console.error('[世界书管理器] 对话框初始化失败', error);
      }
    }

    for (const button of buttons) {
      const $button = $('<button type="button"></button>')
        .addClass(button.className || 'wbm-btn')
        .html(button.html || escapeHtml(button.text || '确定'))
        .on('click', async event => {
          event.preventDefault();
          event.stopPropagation();
          if ($button.prop('disabled')) return;
          try {
            const result = await button.onClick?.(api, event);
            if (result !== false && button.close !== false) api.close('button');
          } catch (error) {
            console.error('[世界书管理器] 对话框按钮失败', error);
            notify(formatError(error), 'error');
          }
        });
      $foot.append($button);
    }

    $mask.on('click', event => {
      if (event.target === $mask.get(0)) api.close('mask');
    });
    $mask.find('[data-dialog-close]').on('click', () => api.close('close-button'));

    $(UI_DOCUMENT).on(`keydown.wbm_${dialogId}`, event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        api.close('escape');
      }
    });

    return api;
  }

  function confirmDialog(title, message, options = {}) {
    return new Promise(resolve => {
      let settled = false;
      const done = value => {
        if (settled) return;
        settled = true;
        resolve(value);
      };
      const dialog = createDialog({
        title,
        body: `<div style="line-height:1.65;white-space:pre-wrap;word-break:break-word">${escapeHtml(message)}</div>`,
        buttons: [
          { text: options.cancelText || '取消', className: 'wbm-btn-ghost', onClick: () => done(false) },
          {
            text: options.okText || '确定',
            className: options.danger ? 'wbm-btn is-danger' : 'wbm-btn is-primary',
            onClick: () => done(true),
          },
        ],
      });
      dialog.onClose = () => done(false);
    });
  }

  function inputDialog(title, label, defaultValue = '', options = {}) {
    const id = uniqueId('wbm_input');
    return new Promise(resolve => {
      let settled = false;
      const done = value => {
        if (settled) return;
        settled = true;
        resolve(value);
      };
      const dialog = createDialog({
        title,
        body: `
          <div class="wbm-field">
            ${label ? `<label for="${id}">${escapeHtml(label)}</label>` : ''}
            <input type="text" class="wbm-input" id="${id}" value="${escapeHtml(defaultValue)}" placeholder="${escapeHtml(options.placeholder || '')}" />
          </div>`,
        buttons: [
          { text: '取消', className: 'wbm-btn-ghost', onClick: () => done(null) },
          {
            text: options.okText || '确定',
            className: 'wbm-btn is-primary',
            onClick: () => done(text($(`#${id}`).val()).trim()),
          },
        ],
        onOpen(api) {
          setTimeout(() => {
            const $input = api.$body.find(`#${id}`);
            $input.trigger('focus');
            $input.trigger('select');
          }, 30);
        },
      });
      dialog.$body.find('input').on('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          done(text($(`#${id}`).val()).trim());
          dialog.close('enter');
        }
      });
      dialog.onClose = () => done(null);
    });
  }

  // ---------------------------------------------------------------------------
  // 预设：全局世界书
  // ---------------------------------------------------------------------------

  function describeWorldbookPreset(preset) {
    const globalCount = safeArray(preset.global).length;
    const stateBooks = preset.entryStates && typeof preset.entryStates === 'object' ? Object.keys(preset.entryStates).length : 0;
    return `全局 ${globalCount} 本${preset.recordEntries ? ` · 记录条目状态 ${stateBooks} 本` : ' · 不记录条目'}`;
  }

  async function collectWorldbookEntryStates(names) {
    const result = {};
    const T = getTavernHelper();
    for (const name of safeArray(names)) {
      if (!state.names.includes(name)) continue;
      try {
        const entries = clone(await T.getWorldbook(name));
        const stateMap = {};
        for (const entry of entries) {
          const uid = getEntryUid(entry);
          if (uid === null) continue;
          stateMap[uid] = entryEnabled(entry);
        }
        result[name] = stateMap;
      } catch (error) {
        console.warn('[世界书管理器] 读取条目状态失败', name, error);
      }
    }
    return result;
  }

  async function openWorldbookPresetDialog(existingPreset = null) {
    const isUpdate = !!existingPreset;
    // 窗口是浮动的，用户可能在后面直接改了全局世界书；保存前重新读一次当前状态。
    try {
      await refreshWorldbookNames();
    } catch (error) {
      console.warn('[世界书管理器] 刷新世界书列表失败', error);
    }
    const currentGlobal = Array.from(state.globalNames).filter(name => state.names.includes(name));
    const recordKey = uniqueId('wbp_record');
    const nameKey = uniqueId('wbp_name');
    const defaultName = existingPreset ? existingPreset.name : `世界书组合 ${new Date().toLocaleDateString()}`;
    const defaultRecord = existingPreset ? existingPreset.recordEntries !== false : true;

    return new Promise(resolve => {
      let settled = false;
      const done = value => {
        if (settled) return;
        settled = true;
        resolve(value);
      };

      const dialog = createDialog({
        title: isUpdate ? `更新全局世界书预设：${existingPreset.name}` : '保存全局世界书预设',
        body: `
          <div class="wbm-field">
            <label for="${nameKey}">预设名称</label>
            <input type="text" class="wbm-input" id="${nameKey}" value="${escapeHtml(defaultName)}" placeholder="例如：主线剧情、副本模式、日常设定" />
          </div>
          <div class="wbm-help" style="margin-top:8px">
            将保存当前全局启用的 ${currentGlobal.length} 本世界书${currentGlobal.length ? `：${escapeHtml(currentGlobal.join('、'))}` : '（当前没有全局启用的世界书）'}。
          </div>
          <label class="wbm-check" style="margin-top:11px">
            <input type="checkbox" id="${recordKey}" ${defaultRecord ? 'checked' : ''} />
            记录并恢复每本世界书内条目的启用/禁用状态
          </label>
          <div class="wbm-help" style="margin-left:23px;margin-top:3px">
            适合“同一批世界书，不同条目开关”的预设。不勾选则只快速切换全局世界书列表。
          </div>`,
        buttons: [
          { text: '取消', className: 'wbm-btn-ghost', onClick: () => done(null) },
          {
            text: isUpdate ? '保存更新' : '保存预设',
            className: 'wbm-btn is-primary',
            onClick: async () => {
              const name = text($(`#${nameKey}`).val()).trim() || defaultName;
              const recordEntries = $(`#${recordKey}`).prop('checked');
              const entryStates = recordEntries ? await collectWorldbookEntryStates(currentGlobal) : {};
              const preset = {
                id: existingPreset ? existingPreset.id : uniqueId('wbp'),
                name,
                global: currentGlobal.slice(),
                entryStates,
                recordEntries,
                source: 'global',
                createdAt: existingPreset ? existingPreset.createdAt : Date.now(),
                updatedAt: Date.now(),
              };
              if (isUpdate) {
                const index = state.preferences.worldbookPresets.findIndex(item => item.id === existingPreset.id);
                if (index !== -1) state.preferences.worldbookPresets[index] = preset;
              } else {
                state.preferences.worldbookPresets.push(preset);
              }
              savePreferences();
              renderPresets();
              notify(`${isUpdate ? '已更新' : '已保存'}全局世界书预设：${name}`, 'success');
              done(preset);
            },
          },
        ],
        onOpen(api) {
          api.$body.find(`#${nameKey}`).trigger('focus');
        },
      });
      dialog.onClose = () => done(null);
    });
  }

  async function saveWorldbookPresetFromCurrent() {
    await openWorldbookPresetDialog(null);
  }

  async function updateWorldbookPreset(presetId) {
    const preset = (state.preferences.worldbookPresets || []).find(item => item.id === presetId);
    if (!preset) return;
    await openWorldbookPresetDialog(preset);
  }

  async function applyWorldbookPreset(presetId) {
    const preset = (state.preferences.worldbookPresets || []).find(item => item.id === presetId);
    if (!preset) return;
    const global = safeArray(preset.global).filter(name => state.names.includes(name));
    const missing = safeArray(preset.global).filter(name => !state.names.includes(name));

    state.busy = true;
    updateFooterStatus();
    try {
      await setGlobalBindings(global);
      let changedEntries = 0;
      if (preset.recordEntries && preset.entryStates && typeof preset.entryStates === 'object') {
        for (const [book, stateMap] of Object.entries(preset.entryStates)) {
          if (!state.names.includes(book) || !stateMap || typeof stateMap !== 'object') continue;
          await mutateWorldbook(book, entries => {
            return entries.map(entry => {
              const uid = getEntryUid(entry);
              if (uid === null || !Object.prototype.hasOwnProperty.call(stateMap, uid)) return entry;
              const enabled = !!stateMap[uid];
              if (entryEnabled(entry) !== enabled) changedEntries++;
              return { ...entry, enabled };
            });
          });
        }
      }
      await refreshWorldbookNames();
      renderAll();
      const extra = missing.length ? `；${missing.length} 本已不存在` : '';
      notify(`已应用世界书预设：${preset.name}${preset.recordEntries ? `（更新 ${changedEntries} 条目状态）` : ''}${extra}`, 'success');
    } catch (error) {
      notify(formatError(error), 'error');
    } finally {
      state.busy = false;
      updateFooterStatus();
    }
  }

  async function duplicateWorldbookPreset(presetId) {
    const preset = (state.preferences.worldbookPresets || []).find(item => item.id === presetId);
    if (!preset) return;
    const name = await inputDialog('复制全局世界书预设', '新预设名称', `${preset.name} 副本`, { okText: '复制' });
    if (!name) return;
    state.preferences.worldbookPresets.push({
      ...clone(preset),
      id: uniqueId('wbp'),
      name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    savePreferences();
    renderPresets();
    notify(`已复制预设：${name}`, 'success');
  }

  async function deleteWorldbookPreset(presetId) {
    const preset = (state.preferences.worldbookPresets || []).find(item => item.id === presetId);
    if (!preset) return;
    const ok = await confirmDialog('删除全局世界书预设', `确定删除预设「${preset.name}」吗？`, { okText: '删除', danger: true });
    if (!ok) return;
    state.preferences.worldbookPresets = state.preferences.worldbookPresets.filter(item => item.id !== presetId);
    savePreferences();
    renderPresets();
    notify('预设已删除', 'success');
  }

  // ---------------------------------------------------------------------------
  // 预设：角色 / 聊天绑定
  // ---------------------------------------------------------------------------

  function describeBindingPreset(preset) {
    const globalCount = safeArray(preset.global).length;
    const charCount = (preset.charPrimary ? 1 : 0) + safeArray(preset.charAdditional).length;
    return `全局 ${globalCount} 本 · 角色 ${charCount} 本${preset.chat ? ' · 聊天 1 本' : ''}`;
  }

  async function saveBindingPresetFromCurrent() {
    const name = await inputDialog('保存绑定预设', '预设名称', `绑定组合 ${new Date().toLocaleDateString()}`, {
      okText: '保存',
    });
    if (!name) return;
    try {
      await refreshWorldbookNames();
    } catch (error) {
      console.warn('[世界书管理器] 刷新世界书列表失败', error);
    }
    const preset = {
      id: uniqueId('bind'),
      name,
      global: Array.from(state.globalNames),
      charPrimary: state.charBooks ? state.charBooks.primary : null,
      charAdditional: state.charBooks ? state.charBooks.additional.slice() : [],
      chat: state.chatBook,
      createdAt: Date.now(),
    };
    state.preferences.bindingPresets.push(preset);
    savePreferences();
    renderPresets();
    notify(`已保存绑定预设：${name}`, 'success');
  }

  async function applyBindingPreset(presetId) {
    const preset = (state.preferences.bindingPresets || []).find(item => item.id === presetId);
    if (!preset) return;
    const okNames = name => name && state.names.includes(name);
    const global = safeArray(preset.global).filter(okNames);
    const base = {
      global: global,
      charPrimary: okNames(preset.charPrimary) ? preset.charPrimary : null,
      charAdditional: safeArray(preset.charAdditional).filter(okNames),
      chat: okNames(preset.chat) ? preset.chat : null,
    };
    const ok = await confirmDialog(
      '应用绑定预设',
      `将把当前绑定切换为：\n全局：${base.global.length} 本\n角色主世界书：${base.charPrimary || '无'}\n角色附加：${base.charAdditional.length} 本\n聊天：${base.chat || '无'}\n\n继续吗？`,
      { okText: '应用' },
    );
    if (!ok) return;
    try {
      await setGlobalBindings(base.global);
      if (state.charBooks) {
        await applyCharBooks({ primary: base.charPrimary, additional: base.charAdditional });
      } else {
        notify('未打开角色卡，已跳过角色绑定', 'warn');
      }
      try {
        await setChatBinding(base.chat);
      } catch (error) {
        notify('聊天绑定应用失败，可能未打开聊天', 'warn');
      }
      refreshBindings();
      renderAll();
      notify(`已应用绑定预设：${preset.name}`, 'success');
    } catch (error) {
      notify(formatError(error), 'error');
    }
  }

  async function duplicateBindingPreset(presetId) {
    const preset = (state.preferences.bindingPresets || []).find(item => item.id === presetId);
    if (!preset) return;
    const name = await inputDialog('复制绑定预设', '新预设名称', `${preset.name} 副本`, { okText: '复制' });
    if (!name) return;
    state.preferences.bindingPresets.push({ ...clone(preset), id: uniqueId('bind'), name, createdAt: Date.now() });
    savePreferences();
    renderPresets();
    notify(`已复制预设：${name}`, 'success');
  }

  async function deleteBindingPreset(presetId) {
    const preset = (state.preferences.bindingPresets || []).find(item => item.id === presetId);
    if (!preset) return;
    const ok = await confirmDialog('删除绑定预设', `确定删除绑定预设「${preset.name}」吗？`, { okText: '删除', danger: true });
    if (!ok) return;
    state.preferences.bindingPresets = state.preferences.bindingPresets.filter(item => item.id !== presetId);
    savePreferences();
    renderPresets();
    notify('绑定预设已删除', 'success');
  }

  // ---------------------------------------------------------------------------
  // 预设备份：导出 / 导入
  // ---------------------------------------------------------------------------

  const PRESET_BACKUP_TYPE = 'worldbook-presets-backup';

  function collectPresetBackup() {
    return {
      type: PRESET_BACKUP_TYPE,
      version: 1,
      script: WBM.name,
      exportedAt: new Date().toISOString(),
      worldbookPresets: clone(state.preferences.worldbookPresets || []),
      bindingPresets: clone(state.preferences.bindingPresets || []),
    };
  }

  function exportPresets() {
    try {
      const backup = collectPresetBackup();
      downloadFile(`世界书预设备份-${makeTimestamp()}.json`, JSON.stringify(backup, null, 2));
      notify(`已导出：世界书预设 ${backup.worldbookPresets.length} 个、绑定预设 ${backup.bindingPresets.length} 个`, 'success');
    } catch (error) {
      notify(formatError(error), 'error');
    }
  }

  /** 把导入文件规整成 {worldbookPresets, bindingPresets}，非法时抛错。 */
  function normalisePresetBackup(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      throw new Error('文件内容不是有效的预设备份');
    }
    const ensureId = item => (item && typeof item === 'object' ? { ...item, id: item.id || uniqueId('imported') } : null);
    const worldbookPresets = (Array.isArray(raw.worldbookPresets) ? raw.worldbookPresets : []).map(ensureId).filter(Boolean);
    const bindingPresets = (Array.isArray(raw.bindingPresets) ? raw.bindingPresets : []).map(ensureId).filter(Boolean);
    if (!worldbookPresets.length && !bindingPresets.length) {
      throw new Error('文件里没有可导入的预设');
    }
    return { worldbookPresets, bindingPresets };
  }

  function mergePresets(current, incoming) {
    const map = new Map();
    for (const item of current) {
      if (item && item.id) map.set(item.id, item);
    }
    for (const item of incoming) {
      if (item && item.id) map.set(item.id, item);
    }
    return Array.from(map.values());
  }

  function askImportMode(summary) {
    return new Promise(resolve => {
      let settled = false;
      const done = value => {
        if (settled) return;
        settled = true;
        resolve(value);
      };
      const dialog = createDialog({
        title: '导入预设备份',
        body: `<div style="line-height:1.7;white-space:pre-wrap;word-break:break-word">${escapeHtml(summary)}</div>`,
        buttons: [
          { text: '取消', className: 'wbm-btn-ghost', onClick: () => done('cancel') },
          { text: '合并导入', className: 'wbm-btn', onClick: () => done('merge') },
          { text: '覆盖导入', className: 'wbm-btn is-primary', onClick: () => done('replace') },
        ],
      });
      dialog.onClose = () => done('cancel');
    });
  }

  async function importPresetsFromFile(file) {
    if (!file) return;
    let raw;
    try {
      raw = JSON.parse(await file.text());
    } catch (error) {
      notify('导入失败：文件不是有效的 JSON', 'error');
      return;
    }
    let backup;
    try {
      backup = normalisePresetBackup(raw);
    } catch (error) {
      notify(formatError(error), 'error');
      return;
    }

    const currentWb = state.preferences.worldbookPresets || [];
    const currentBind = state.preferences.bindingPresets || [];
    const wbNew = backup.worldbookPresets.filter(item => !currentWb.some(existing => existing.id === item.id)).length;
    const bindNew = backup.bindingPresets.filter(item => !currentBind.some(existing => existing.id === item.id)).length;
    const summary =
      `文件包含：世界书预设 ${backup.worldbookPresets.length} 个、绑定预设 ${backup.bindingPresets.length} 个。\n\n` +
      `合并导入：保留现有预设，按 id 覆盖同名项（新增 ${wbNew + bindNew} 个）。\n` +
      `覆盖导入：清空当前预设库，只保留文件内容。`;
    const mode = await askImportMode(summary);
    if (mode === 'cancel') return;

    if (mode === 'replace') {
      state.preferences.worldbookPresets = backup.worldbookPresets;
      state.preferences.bindingPresets = backup.bindingPresets;
    } else {
      state.preferences.worldbookPresets = mergePresets(currentWb, backup.worldbookPresets);
      state.preferences.bindingPresets = mergePresets(currentBind, backup.bindingPresets);
    }
    savePreferences();
    renderPresets();
    notify(
      `导入完成：世界书预设 ${state.preferences.worldbookPresets.length} 个、绑定预设 ${state.preferences.bindingPresets.length} 个`,
      'success',
    );
  }

  // ---------------------------------------------------------------------------
  // 绑定操作
  // ---------------------------------------------------------------------------

  async function setGlobalBindings(names) {
    const T = getTavernHelper();
    const valid = safeArray(names).filter(name => state.names.includes(name));
    await T.rebindGlobalWorldbooks(valid);
    refreshBindings();
    scheduleRender();
  }

  async function applyCharBooks(books) {
    const T = getTavernHelper();
    await T.rebindCharWorldbooks('current', {
      primary: books.primary || null,
      additional: safeArray(books.additional).filter(Boolean),
    });
    refreshBindings();
    scheduleRender();
  }

  async function setChatBinding(name) {
    const T = getTavernHelper();
    if (name) await T.rebindChatWorldbook('current', name);
    else await T.rebindChatWorldbook('current', null);
    refreshBindings();
    scheduleRender();
  }

  // ---------------------------------------------------------------------------
  // 浮动窗口：拖动 / 缩放
  // ---------------------------------------------------------------------------

  const WINDOW_GAP = 12;
  const WINDOW_MIN_WIDTH = 320;
  const WINDOW_MIN_HEIGHT = 280;
  const WINDOW_STATE_KEY = 'wbm.window.v1';

  function loadSavedWindowRect() {
    const saved = safeJsonParse(UI_WINDOW.localStorage.getItem(WINDOW_STATE_KEY));
    if (!saved || typeof saved !== 'object') return null;
    const rect = {
      x: Number(saved.x),
      y: Number(saved.y),
      width: Number(saved.width),
      height: Number(saved.height),
    };
    return [rect.x, rect.y, rect.width, rect.height].every(Number.isFinite) ? rect : null;
  }

  function saveWindowRect(rect) {
    try {
      UI_WINDOW.localStorage.setItem(WINDOW_STATE_KEY, JSON.stringify(rect));
    } catch (error) {
      // ignore
    }
  }

  function getViewportSize() {
    return {
      width: UI_WINDOW.innerWidth || 1024,
      height: UI_WINDOW.innerHeight || 768,
    };
  }

  function clampWindowRect(rect) {
    const viewport = getViewportSize();
    const maxWidth = Math.max(1, viewport.width - WINDOW_GAP * 2);
    const maxHeight = Math.max(1, viewport.height - WINDOW_GAP * 2);
    const minWidth = Math.min(WINDOW_MIN_WIDTH, maxWidth);
    const minHeight = Math.min(WINDOW_MIN_HEIGHT, maxHeight);
    const width = Math.min(Math.max(rect.width, minWidth), maxWidth);
    const height = Math.min(Math.max(rect.height, minHeight), maxHeight);
    const maxX = Math.max(WINDOW_GAP, viewport.width - WINDOW_GAP - width);
    const maxY = Math.max(WINDOW_GAP, viewport.height - WINDOW_GAP - height);
    return {
      x: Math.min(Math.max(rect.x, WINDOW_GAP), maxX),
      y: Math.min(Math.max(rect.y, WINDOW_GAP), maxY),
      width,
      height,
    };
  }

  function defaultWindowRect() {
    const viewport = getViewportSize();
    const mobile = viewport.width <= 720;
    const maxWidth = Math.max(1, viewport.width - WINDOW_GAP * 2);
    const maxHeight = Math.max(1, viewport.height - WINDOW_GAP * 2);
    const width = mobile ? maxWidth : Math.min(720, maxWidth);
    const height = mobile ? Math.min(620, maxHeight) : Math.min(maxHeight, Math.max(520, Math.round(viewport.height * 0.82)));
    const x = mobile ? WINDOW_GAP : Math.max(WINDOW_GAP, viewport.width - width - 28);
    const y = mobile ? WINDOW_GAP : Math.max(WINDOW_GAP, Math.round((viewport.height - height) / 2));
    return clampWindowRect({ x, y, width, height });
  }

  function readWindowRect($window) {
    return {
      width: $window.outerWidth() || 420,
      height: $window.outerHeight() || 560,
      x: Number.parseFloat($window.css('left')) || WINDOW_GAP,
      y: Number.parseFloat($window.css('top')) || WINDOW_GAP,
    };
  }

  function applyWindowRect($window, rect) {
    const next = clampWindowRect(rect);
    $window.css({
      left: `${next.x}px`,
      top: `${next.y}px`,
      width: `${next.width}px`,
      height: `${next.height}px`,
    });
  }

  function enableWindowDrag($window) {
    const $titlebar = $window.find('.wbm-header');
    const $resize = $window.find('.wbm-resize');

    const begin = (event, mode) => {
      const native = event.originalEvent || event;
      if (!native.isPrimary || native.button !== 0) return;
      native.preventDefault();
      const pointerId = native.pointerId;
      const handle = mode === 'resize' ? $resize.get(0) : $titlebar.get(0);
      const startRect = readWindowRect($window);
      const startX = native.clientX;
      const startY = native.clientY;

      const onMove = move => {
        if (move.pointerId !== pointerId) return;
        move.preventDefault();
        const dx = move.clientX - startX;
        const dy = move.clientY - startY;
        applyWindowRect(
          $window,
          mode === 'resize'
            ? { ...startRect, width: startRect.width + dx, height: startRect.height + dy }
            : { ...startRect, x: startRect.x + dx, y: startRect.y + dy },
        );
      };
      const onEnd = () => {
        UI_DOCUMENT.removeEventListener('pointermove', onMove);
        UI_DOCUMENT.removeEventListener('pointerup', onEnd);
        UI_DOCUMENT.removeEventListener('pointercancel', onEnd);
        if (handle && handle.hasPointerCapture && handle.hasPointerCapture(pointerId)) {
          handle.releasePointerCapture(pointerId);
        }
        saveWindowRect(readWindowRect($window));
      };
      UI_DOCUMENT.addEventListener('pointermove', onMove);
      UI_DOCUMENT.addEventListener('pointerup', onEnd);
      UI_DOCUMENT.addEventListener('pointercancel', onEnd);
      if (handle && handle.setPointerCapture) handle.setPointerCapture(pointerId);
    };

    $titlebar.on('pointerdown', event => begin(event, 'move'));
    $resize.on('pointerdown', event => begin(event, 'resize'));
  }

  // ---------------------------------------------------------------------------
  // UI：静态 DOM 与全局事件
  // ---------------------------------------------------------------------------

  function buildManagerDom() {
    if (state.domReady) return;

    const html = `
      <header class="wbm-header">
        <div class="wbm-brand">
          <div class="wbm-brand-icon"><i class="fa-solid fa-book-atlas"></i></div>
          <div>
            <h2>世界书管理器</h2>
            <p id="wbm_stats">正在加载酒馆助手……</p>
          </div>
        </div>
        <div class="wbm-header-spacer"></div>
        <div class="wbm-header-actions">
          <button type="button" class="wbm-btn" id="wbm_export_presets" title="把全部预设导出为备份文件"><i class="fa-solid fa-file-export"></i><span class="wbm-btn-label"> 导出</span></button>
          <button type="button" class="wbm-btn" id="wbm_import_presets" title="从备份文件导入预设"><i class="fa-solid fa-file-import"></i><span class="wbm-btn-label"> 导入</span></button>
          <button type="button" class="wbm-btn" id="wbm_refresh" title="重新读取绑定信息"><i class="fa-solid fa-rotate"></i><span class="wbm-btn-label"> 刷新</span></button>
          <button type="button" class="wbm-icon-btn" id="wbm_close" title="关闭"><i class="fa-solid fa-xmark"></i></button>
          <input type="file" id="wbm_import_file" class="wbm-hidden" accept=".json,application/json" />
        </div>
      </header>

        <div class="wbm-right-panels">
          <section id="wbm_panel_presets">
            <div class="wbm-section-title">
              <span>全局世界书预设</span>
              <button type="button" class="wbm-btn is-primary" id="wbm_wbp_save"><i class="fa-solid fa-bolt"></i> 保存当前</button>
            </div>
            <div class="wbm-section-hint">
              快速切换全局启用的世界书组合；可选记录每本世界书内条目的启用/禁用状态，一键恢复。
            </div>
            <div class="wbm-preset-list" id="wbm_worldbook_preset_list"></div>

            <div class="wbm-section-title">
              <span>角色 / 聊天绑定预设</span>
              <button type="button" class="wbm-btn" id="wbm_binding_save"><i class="fa-solid fa-bookmark"></i> 保存当前</button>
            </div>
            <div class="wbm-section-hint">
              保存全局 + 当前角色卡 + 当前聊天的完整绑定组合。
            </div>
            <div class="wbm-preset-list" id="wbm_binding_preset_list"></div>
          </section>
        </div>

        <footer class="wbm-footer">
          <span id="wbm_status">就绪</span>
          <span class="wbm-footer-right">v${WBM.version} · 酒馆助手接口</span>
        </footer>

      <div class="wbm-resize" title="调整大小"></div>`;

    const $overlay = $('<section id="wbm_overlay"></section>').html(html).appendTo(UI_DOCUMENT.body);
    state.$overlay = $overlay;
    state.domReady = true;

    applyWindowRect($overlay, loadSavedWindowRect() || defaultWindowRect());
    enableWindowDrag($overlay);
    $(UI_WINDOW).on(
      'resize.wbm_window',
      debounce(() => {
        if (!state.$overlay || !state.opened) return;
        applyWindowRect(state.$overlay, readWindowRect(state.$overlay));
        saveWindowRect(readWindowRect(state.$overlay));
      }, 150),
    );

    setupPresetListInteractions($overlay.find('#wbm_worldbook_preset_list'), 'worldbookPresets');
    setupPresetListInteractions($overlay.find('#wbm_binding_preset_list'), 'bindingPresets');

    $overlay.find('.wbm-header-actions').on('pointerdown', event => event.stopPropagation());
    $overlay.find('#wbm_close').on('click', closeManager);
    $overlay.find('#wbm_refresh').on('click', async () => {
      try {
        await refreshWorldbookNames();
        renderAll();
        notify('已刷新世界书与绑定信息', 'success');
      } catch (error) {
        notify(formatError(error), 'error');
      }
    });
    $overlay.find('#wbm_wbp_save').on('click', saveWorldbookPresetFromCurrent);
    $overlay.find('#wbm_binding_save').on('click', saveBindingPresetFromCurrent);
    $overlay.find('#wbm_export_presets').on('click', exportPresets);
    $overlay.find('#wbm_import_presets').on('click', () => $overlay.find('#wbm_import_file').trigger('click'));
    $overlay.find('#wbm_import_file').on('change', async function () {
      const file = this.files && this.files[0];
      this.value = '';
      await importPresetsFromFile(file);
    });
  }

  // ---------------------------------------------------------------------------
  // 渲染
  // ---------------------------------------------------------------------------

  function renderAll() {
    if (!state.domReady || !state.opened) return;
    if (!state.$overlay || !UI_DOCUMENT.body.contains(state.$overlay.get(0))) return;
    renderStats();
    renderPresets();
    updateFooterStatus();
  }

  function renderStats() {
    if (!state.$overlay) return;
    const wbCount = state.names.length;
    const globalCount = state.globalNames.size;
    state.$overlay.find('#wbm_stats').text(`${wbCount} 本世界书 · 全局启用 ${globalCount} 本`);
  }

  function renderPresets() {
    if (!state.$overlay) return;
    const worldbookPresets = state.preferences.worldbookPresets || [];
    const bindingPresets = state.preferences.bindingPresets || [];

    const worldbookPresetHtml = worldbookPresets.length
      ? worldbookPresets
          .map(
            preset => `
              <div class="wbm-preset-item" data-worldbook-preset="${escapeHtml(preset.id)}" data-preset-id="${escapeHtml(preset.id)}">
                <span class="wbm-preset-handle" title="按住拖动排序"><i class="fa-solid fa-grip-vertical"></i></span>
                <div class="wbm-preset-main">
                  <div class="wbm-preset-name" data-preset-name title="双击重命名">${escapeHtml(preset.name)}</div>
                  <div class="wbm-preset-meta">${escapeHtml(describeWorldbookPreset(preset))}</div>
                </div>
                <div class="wbm-preset-actions">
                  <button type="button" class="wbm-icon-btn" data-wbp-preset-action="apply" data-preset-id="${escapeHtml(preset.id)}" title="一键应用此世界书预设"><i class="fa-solid fa-bolt"></i></button>
                  <button type="button" class="wbm-icon-btn" data-wbp-preset-action="update" data-preset-id="${escapeHtml(preset.id)}" title="用当前状态更新此预设"><i class="fa-solid fa-rotate"></i></button>
                  <button type="button" class="wbm-icon-btn" data-wbp-preset-action="copy" data-preset-id="${escapeHtml(preset.id)}" title="复制/重命名"><i class="fa-solid fa-copy"></i></button>
                  <button type="button" class="wbm-icon-btn" data-wbp-preset-action="delete" data-preset-id="${escapeHtml(preset.id)}" title="删除预设"><i class="fa-solid fa-trash-can"></i></button>
                </div>
              </div>`,
          )
          .join('')
      : `<div class="wbm-empty">还没有全局世界书预设</div>`;

    const bindingHtml = bindingPresets.length
      ? bindingPresets
          .map(
            preset => `
              <div class="wbm-preset-item" data-binding-preset="${escapeHtml(preset.id)}" data-preset-id="${escapeHtml(preset.id)}">
                <span class="wbm-preset-handle" title="按住拖动排序"><i class="fa-solid fa-grip-vertical"></i></span>
                <div class="wbm-preset-main">
                  <div class="wbm-preset-name" data-preset-name title="双击重命名">${escapeHtml(preset.name)}</div>
                  <div class="wbm-preset-meta">${escapeHtml(describeBindingPreset(preset))}</div>
                </div>
                <div class="wbm-preset-actions">
                  <button type="button" class="wbm-icon-btn" data-binding-preset-action="apply" data-preset-id="${escapeHtml(preset.id)}" title="应用绑定"><i class="fa-solid fa-check"></i></button>
                  <button type="button" class="wbm-icon-btn" data-binding-preset-action="copy" data-preset-id="${escapeHtml(preset.id)}" title="重命名/复制"><i class="fa-solid fa-copy"></i></button>
                  <button type="button" class="wbm-icon-btn" data-binding-preset-action="delete" data-preset-id="${escapeHtml(preset.id)}" title="删除预设"><i class="fa-solid fa-trash-can"></i></button>
                </div>
              </div>`,
          )
          .join('')
      : `<div class="wbm-empty">还没有绑定预设</div>`;

    state.$overlay.find('#wbm_worldbook_preset_list').html(worldbookPresetHtml);
    state.$overlay.find('#wbm_binding_preset_list').html(bindingHtml);

    state.$overlay
      .find('[data-wbp-preset-action]')
      .off('click')
      .on('click', function () {
        const action = $(this).data('wbp-preset-action');
        const id = $(this).data('preset-id');
        if (action === 'apply') applyWorldbookPreset(id);
        else if (action === 'update') updateWorldbookPreset(id);
        else if (action === 'copy') duplicateWorldbookPreset(id);
        else if (action === 'delete') deleteWorldbookPreset(id);
      });

    state.$overlay
      .find('[data-binding-preset-action]')
      .off('click')
      .on('click', function () {
        const action = $(this).data('binding-preset-action');
        const id = $(this).data('preset-id');
        if (action === 'apply') applyBindingPreset(id);
        else if (action === 'copy') duplicateBindingPreset(id);
        else if (action === 'delete') deleteBindingPreset(id);
      });
  }

  function findPreset(collectionKey, presetId) {
    return (state.preferences[collectionKey] || []).find(item => item.id === presetId) || null;
  }

  /** 按列表当前 DOM 顺序重排预设数组并保存。 */
  function persistPresetOrder($list, collectionKey) {
    const ids = $list
      .children('.wbm-preset-item')
      .map(function () {
        return $(this).attr('data-preset-id');
      })
      .get();
    const current = state.preferences[collectionKey] || [];
    const map = new Map(current.map(item => [item.id, item]));
    const ordered = [];
    for (const id of ids) {
      const item = map.get(id);
      if (item) {
        ordered.push(item);
        map.delete(id);
      }
    }
    for (const item of map.values()) ordered.push(item);
    state.preferences[collectionKey] = ordered;
    savePreferences();
  }

  /** 就地重命名：把预设名替换为输入框，回车/失焦保存，Esc 取消。 */
  function startInlineRename($nameEl, collectionKey, presetId) {
    if ($nameEl.data('renaming')) return;
    const preset = findPreset(collectionKey, presetId);
    if (!preset) return;
    const original = text(preset.name);
    const $input = $('<input type="text" class="wbm-input wbm-preset-name-input" />').val(original);
    $nameEl.data('renaming', true).addClass('is-renaming').after($input);
    let settled = false;
    const finish = commit => {
      if (settled) return;
      settled = true;
      const next = text($input.val()).trim();
      $input.remove();
      $nameEl.removeClass('is-renaming').removeData('renaming');
      if (commit && next && next !== original) {
        preset.name = next;
        savePreferences();
        notify(`已重命名为：${next}`, 'success');
        renderPresets();
      }
    };
    $input.on('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        finish(true);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        finish(false);
      }
    });
    $input.on('blur', () => finish(true));
    setTimeout(() => {
      $input.trigger('focus');
      $input.trigger('select');
    }, 20);
  }

  /** 绑定双击重命名与手柄拖动排序；列表容器是静态的，事件用委托即可跨重渲染生效。 */
  function setupPresetListInteractions($list, collectionKey) {
    $list.on('dblclick', '.wbm-preset-name', function () {
      const $item = $(this).closest('.wbm-preset-item');
      startInlineRename($(this), collectionKey, $item.attr('data-preset-id'));
    });

    $list.on('pointerdown', '.wbm-preset-handle', function (event) {
      const native = event.originalEvent || event;
      if (!native.isPrimary || native.button !== 0) return;
      native.preventDefault();
      const pointerId = native.pointerId;
      const $item = $(this).closest('.wbm-preset-item');
      const itemEl = $item.get(0);
      const startY = native.clientY;
      let dragging = false;

      const onMove = move => {
        if (move.pointerId !== pointerId) return;
        if (!dragging) {
          if (Math.abs(move.clientY - startY) < 5) return;
          dragging = true;
          $item.addClass('is-dragging');
        }
        move.preventDefault();
        const siblings = $list.children('.wbm-preset-item').toArray();
        let $before = null;
        for (const el of siblings) {
          if (el === itemEl) continue;
          const rect = el.getBoundingClientRect();
          if (move.clientY < rect.top + rect.height / 2) {
            $before = $(el);
            break;
          }
        }
        if ($before) $item.insertBefore($before);
        else $list.append($item);
      };
      const onEnd = endEvent => {
        if (endEvent && endEvent.pointerId !== undefined && endEvent.pointerId !== pointerId) return;
        UI_DOCUMENT.removeEventListener('pointermove', onMove);
        UI_DOCUMENT.removeEventListener('pointerup', onEnd);
        UI_DOCUMENT.removeEventListener('pointercancel', onEnd);
        if (!dragging) return;
        $item.removeClass('is-dragging');
        persistPresetOrder($list, collectionKey);
      };
      UI_DOCUMENT.addEventListener('pointermove', onMove);
      UI_DOCUMENT.addEventListener('pointerup', onEnd);
      UI_DOCUMENT.addEventListener('pointercancel', onEnd);
    });
  }

  function updateFooterStatus() {
    if (!state.$overlay) return;
    state.$overlay.find('#wbm_status').text(state.busy ? '操作中…' : '就绪');
  }

  // ---------------------------------------------------------------------------
  // 打开 / 关闭
  // ---------------------------------------------------------------------------

  async function showManager() {
    buildManagerDom();
    state.opened = true;
    state.$overlay.addClass('wbm-visible');
    $('body').addClass('wbm-opened');
    try {
      state.T = getTavernHelper();
      await refreshWorldbookNames();
      renderAll();
    } catch (error) {
      console.error('[世界书管理器] 初始化失败', error);
      notify(formatError(error), 'error');
      renderAll();
    }
  }

  function closeManager() {
    if (!state.$overlay) return;
    state.opened = false;
    state.$overlay.removeClass('wbm-visible');
    $('body').removeClass('wbm-opened');
  }

  /** 开关：已打开则关闭，否则打开。 */
  function toggleManager() {
    if (state.opened) closeManager();
    else showManager();
  }

  // ---------------------------------------------------------------------------
  // 扩展入口 / 菜单 / 设置
  // ---------------------------------------------------------------------------

  function createMenuEntry() {
    if ($('#wbm_menu_item').length) return true;
    const $menu = $('#extensionsMenu');
    if (!$menu.length) return false;
    $menu.append(`
      <div id="wbm_menu_item" class="list-group-item flex-container flexGap5 interactable wbm-menu-item" title="世界书管理器">
        <i class="fa-solid fa-book-atlas"></i>
        <span>世界书管理器</span>
      </div>`);
    $('#wbm_menu_item').on('click', () => {
      $('#extensionsMenu').fadeOut(150);
      toggleManager();
    });
    return true;
  }

  function createSettingsPanel() {
    if ($('#wbm_settings').length) return true;
    const $settings = $('#extensions_settings2');
    if (!$settings.length) return false;
    $settings.append(`
      <div id="wbm_settings" class="margin-b-1">
        <div class="inline-drawer">
          <div class="inline-drawer-toggle inline-drawer-header">
            <b>世界书管理器</b>
            <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
          </div>
          <div class="inline-drawer-content">
            <div class="wbm-help" style="margin-bottom:8px">
              全局世界书预设、角色 / 聊天绑定预设。需要先启用酒馆助手 (JS-Slash-Runner)。
            </div>
            <div class="flex-container flexGap5" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
              <div id="wbm_settings_open" class="menu_button">世界书管理设置</div>
            </div>
          </div>
        </div>
      </div>`);

    $('#wbm_settings_open').on('click', toggleManager);
    return true;
  }

  async function ensureExtensionUi() {
    const started = Date.now();
    while (Date.now() - started < 45000) {
      const menuReady = createMenuEntry();
      const settingsReady = createSettingsPanel();
      if (menuReady && settingsReady) return;
      await sleep(300);
    }
    console.warn('[世界书管理器] 未找到扩展菜单或设置容器，可通过脚本按钮打开');
  }

  async function initWorldbookManager() {
    if (IS_SCRIPT_IFRAME) {
      registerScriptButton(() => toggleManager());
    }

    const T = await waitFor(() => UI_WINDOW.TavernHelper || window.TavernHelper, 45000, 200);
    state.T = T || null;

    // 酒馆助手就绪后同步一次偏好：
    // 优先使用共享脚本变量；若共享数据为空但本机有旧数据，则迁移到共享存储。
    try {
      const shared = readSharedPreferences();
      if (shared) {
        state.preferences = loadPreferences();
      } else {
        const local = safeJsonParse(UI_WINDOW.localStorage.getItem(WBM.storageKey));
        if (looksLikePreferences(local)) {
          state.preferences = loadPreferences();
          savePreferences();
        }
      }
    } catch (error) {
      console.warn('[世界书管理器] 同步共享偏好失败', error);
    }

    await ensureExtensionUi();

    if (T) {
      try {
        refreshBindings();
      } catch (error) {
        console.warn('[世界书管理器] 初始化绑定信息失败', error);
      }
    } else {
      console.warn('[世界书管理器] 未检测到 window.TavernHelper；请确认酒馆助手已启用');
    }

  }

  // 暴露一些调试接口
  WBM.open = showManager;
  WBM.close = closeManager;
  WBM.toggle = toggleManager;
  WBM.state = state;

  if (UI_DOCUMENT.readyState === 'loading') {
    UI_DOCUMENT.addEventListener('DOMContentLoaded', () => {
      initWorldbookManager();
    });
  } else {
    initWorldbookManager();
  }
})();
