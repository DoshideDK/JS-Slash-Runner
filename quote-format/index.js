/*
 * 引号格式 (Quote Format) for SillyTavern + 酒馆助手 (JS-Slash-Runner)
 *
 * 1. 不再把 « » 与 『 』 包裹的内容渲染为 <q> 引号高亮。
 * 2. 把魔棒菜单中的「重新生成」固定在菜单最后。
 *
 * 原理：通过 SillyTavern.getContext().messageFormatter 注册格式化钩子：
 *   - afterRegex：把 « » 『 』 替换为私用区占位符，使内置引号正则匹配不到；
 *   - afterMarkdown：把占位符还原。
 * messageFormatter 不支持移除钩子，故在主页面只注册一次转发器，卸载时置空实现。
 */
;(function () {
  'use strict';

  const LOG = '[引号格式]';
  const UI_WINDOW = window.parent;
  const REGISTRY_KEY = '__quoteFormatHooks';

  const PAIRS = [
    ['\u00AB', '\uE000'], // «
    ['\u00BB', '\uE001'], // »
    ['\u300E', '\uE002'], // 『
    ['\u300F', '\uE003'], // 』
  ];
  const ENCODE_RE = /[\u00AB\u00BB\u300E\u300F]/g;
  const DECODE_RE = /[\uE000-\uE003]/g;
  const ENCODE_MAP = Object.fromEntries(PAIRS);
  const DECODE_MAP = Object.fromEntries(PAIRS.map(([a, b]) => [b, a]));

  const encode = mes => mes.replace(ENCODE_RE, ch => ENCODE_MAP[ch]);
  const decode = mes => mes.replace(DECODE_RE, ch => DECODE_MAP[ch]);

  function installHooks() {
    let registry = UI_WINDOW[REGISTRY_KEY];
    if (!registry) {
      registry = { encode: null, decode: null };
      UI_WINDOW[REGISTRY_KEY] = registry;
      const { messageFormatter } = SillyTavern.getContext();
      messageFormatter.addHook(mes => (registry.encode ? registry.encode(mes) : mes), {
        stage: messageFormatter.stage.AFTER_REGEX,
        order: messageFormatter.order.LATEST,
      });
      messageFormatter.addHook(mes => (registry.decode ? registry.decode(mes) : mes), {
        stage: messageFormatter.stage.AFTER_MARKDOWN,
        order: messageFormatter.order.EARLIEST,
      });
    }
    registry.encode = encode;
    registry.decode = decode;
  }

  function uninstallHooks() {
    const registry = UI_WINDOW[REGISTRY_KEY];
    if (registry) {
      registry.encode = null;
      registry.decode = null;
    }
  }

  // 「重新生成」始终保持在菜单末尾（其他插件后插入的按钮也不会排到它后面）；记录原位置，卸载时还原
  let $regenAnchor = null;
  let menuObserver = null;
  function keepRegenerateLast() {
    const regen = $('#option_regenerate')[0];
    const parent = regen?.parentElement;
    if (parent && parent.lastElementChild !== regen) parent.appendChild(regen);
  }
  function moveRegenerate() {
    const $regen = $('#option_regenerate');
    if (!$regen.length) return;
    $regenAnchor = $('<span id="quote_format_regen_anchor" hidden></span>').insertBefore($regen);
    keepRegenerateLast();
    menuObserver = new UI_WINDOW.MutationObserver(keepRegenerateLast);
    menuObserver.observe($regen.parent()[0], { childList: true });
  }
  function restoreRegenerate() {
    menuObserver?.disconnect();
    menuObserver = null;
    if (!$regenAnchor) return;
    $('#option_regenerate').insertAfter($regenAnchor);
    $regenAnchor.remove();
    $regenAnchor = null;
  }

  async function refreshDisplayed() {
    const ids = $('#chat > .mes')
      .map((_, el) => Number($(el).attr('mesid')))
      .get()
      .filter(Number.isFinite);
    for (const id of ids) {
      await refreshOneMessage(id);
    }
  }

  function init() {
    installHooks();
    moveRegenerate();
    refreshDisplayed().catch(error => console.warn(LOG, '刷新楼层失败', error));
    console.log(LOG, '已加载');
  }

  function destroy() {
    uninstallHooks();
    restoreRegenerate();
  }

  $(init);
  $(window).on('pagehide', destroy);
})();
