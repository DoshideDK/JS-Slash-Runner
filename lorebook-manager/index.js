;(function () {
  var doc = window.parent.document;
  if (doc.getElementById('wbm_script_style')) return;
  var style = doc.createElement('style');
  style.id = 'wbm_script_style';
  style.textContent = [
      '/* ===== 世界书管理器 · 典雅书卷暗金主题 ===== */',
      ':root {',
      '  --wbm-bg: #151311;',
      '  --wbm-bg-elevated: #1c1916;',
      '  --wbm-bg-card: #211d19;',
      '  --wbm-bg-card-hover: #28231e;',
      '  --wbm-line: rgba(214, 188, 148, 0.10);',
      '  --wbm-line-strong: rgba(214, 188, 148, 0.20);',
      '  --wbm-text: #ebe4d8;',
      '  --wbm-muted: #a69b8a;',
      '  --wbm-faint: #6e6559;',
      '  --wbm-gold: #c9a25e;',
      '  --wbm-gold-bright: #dfc082;',
      '  --wbm-gold-dim: rgba(201, 162, 94, 0.14);',
      '  --wbm-danger: #d46a6a;',
      '  --wbm-shadow: 0 28px 80px rgba(0, 0, 0, 0.72), 0 4px 18px rgba(0, 0, 0, 0.45);',
      '}',
      '/* 浮动窗口，不锁定背景滚动 */',
      '#wbm_overlay, #wbm_overlay * { box-sizing: border-box; }',
      '@keyframes wbm-pop-in {',
      '  from { opacity: 0; transform: translateY(6px) scale(0.985); }',
      '  to { opacity: 1; transform: translateY(0) scale(1); }',
      '}',
      '#wbm_overlay {',
      '  position: fixed; z-index: 2147482000; display: none;',
      '  grid-template-rows: auto minmax(0, 1fr) auto;',
      '  color: var(--wbm-text); font-size: 13.5px; line-height: 1.5;',
      '  font-family: var(--mainFontFamily, "Noto Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, -apple-system, sans-serif);',
      '  background: radial-gradient(120% 90% at 50% 0%, rgba(201, 162, 94, 0.06) 0%, transparent 65%), var(--wbm-bg);',
      '  border: 1px solid var(--wbm-line-strong); border-radius: 10px;',
      '  box-shadow: var(--wbm-shadow), inset 0 1px 0 rgba(255, 244, 224, 0.06);',
      '  overflow: hidden;',
      '  transition: box-shadow 0.22s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.22s ease;',
      '}',
      '#wbm_overlay.wbm-visible { display: grid; animation: wbm-pop-in 0.2s cubic-bezier(0.22, 1, 0.36, 1); }',
      '#wbm_overlay.is-window-dragging {',
      '  border-color: rgba(201, 162, 94, 0.38);',
      '  box-shadow: 0 36px 96px rgba(0, 0, 0, 0.82), 0 8px 28px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 244, 224, 0.09);',
      '}',
      '#wbm_overlay::before {',
      '  content: ""; position: absolute; inset: 0 0 auto 0; height: 1px; pointer-events: none;',
      '  background: linear-gradient(90deg, transparent 5%, rgba(201, 162, 94, 0.55) 50%, transparent 95%);',
      '}',
      '.wbm-header {',
      '  display: flex; align-items: center; gap: 14px; padding: 14px 16px 13px;',
      '  border-bottom: 1px solid var(--wbm-line); background: rgba(255, 248, 235, 0.015); flex: 0 0 auto;',
      '  cursor: grab; touch-action: none; -webkit-user-select: none; user-select: none;',
      '}',
      '.wbm-header:active { cursor: grabbing; }',
      '.wbm-header-actions { cursor: default; }',
      '.wbm-resize {',
      '  position: absolute; z-index: 50; right: 0; bottom: 0; width: 20px; height: 20px;',
      '  cursor: nwse-resize; touch-action: none; -webkit-user-select: none; user-select: none;',
      '  -webkit-tap-highlight-color: transparent;',
      '}',
      '.wbm-resize::after {',
      '  content: ""; position: absolute; right: 5px; bottom: 5px; width: 7px; height: 7px;',
      '  border-right: 1.5px solid var(--wbm-faint); border-bottom: 1.5px solid var(--wbm-faint); opacity: 0.7;',
      '  transition: border-color 0.15s ease, opacity 0.15s ease;',
      '}',
      '.wbm-resize:hover::after { border-color: var(--wbm-gold); opacity: 1; }',
      '.wbm-brand { display: flex; align-items: center; gap: 11px; min-width: 0; }',
      '.wbm-brand-icon {',
      '  display: flex; align-items: center; justify-content: center; width: 34px; height: 34px;',
      '  border-radius: 8px; color: var(--wbm-gold-bright); font-size: 15px;',
      '  background: linear-gradient(180deg, rgba(201, 162, 94, 0.16), rgba(201, 162, 94, 0.06));',
      '  border: 1px solid rgba(201, 162, 94, 0.32);',
      '  box-shadow: inset 0 1px 0 rgba(255, 244, 224, 0.12);',
      '}',
      '.wbm-brand h2 {',
      '  margin: 0; font-size: 15.5px; font-weight: 600; line-height: 1.25; letter-spacing: 0.03em;',
      '  color: var(--wbm-text); font-family: "Noto Serif SC", "Songti SC", "STSong", Georgia, serif;',
      '}',
      '.wbm-brand p { margin: 2px 0 0; color: var(--wbm-muted); font-size: 11.5px; letter-spacing: 0.01em; }',
      '.wbm-header-spacer { flex: 1; }',
      '.wbm-header-actions { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }',
      '.wbm-btn, .wbm-btn-ghost, .wbm-icon-btn {',
      '  appearance: none; border: 1px solid var(--wbm-line-strong); border-radius: 6px;',
      '  background: rgba(255, 248, 235, 0.03); color: var(--wbm-muted);',
      '  font: inherit; font-size: 12.5px; line-height: 1; padding: 7px 11px; cursor: pointer;',
      '  display: inline-flex; align-items: center; justify-content: center; gap: 5px;',
      '  transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.1s ease, box-shadow 0.16s ease;',
      '  white-space: nowrap;',
      '}',
      '.wbm-btn:hover, .wbm-btn-ghost:hover, .wbm-icon-btn:hover {',
      '  background: rgba(255, 248, 235, 0.07); border-color: rgba(214, 188, 148, 0.32); color: var(--wbm-text);',
      '}',
      '.wbm-btn:active, .wbm-icon-btn:active { transform: translateY(1px); }',
      '.wbm-btn.is-primary {',
      '  background: linear-gradient(180deg, #cfb072 0%, #b8914d 100%);',
      '  border-color: #d9bc82; color: #17130e; font-weight: 600;',
      '  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28), 0 2px 6px rgba(0, 0, 0, 0.3);',
      '}',
      '.wbm-btn.is-primary:hover {',
      '  background: linear-gradient(180deg, #d8ba7e 0%, #c39c57 100%);',
      '  border-color: #e4ca94; color: #120f0a;',
      '}',
      '.wbm-btn.is-danger {',
      '  color: var(--wbm-danger); border-color: rgba(212, 106, 106, 0.38); background: rgba(212, 106, 106, 0.08);',
      '}',
      '.wbm-btn.is-danger:hover {',
      '  background: rgba(212, 106, 106, 0.15); border-color: rgba(212, 106, 106, 0.55); color: #e68585;',
      '}',
      '.wbm-btn[disabled], .wbm-icon-btn[disabled] { opacity: 0.4; cursor: not-allowed; }',
      '.wbm-icon-btn { width: 30px; height: 30px; padding: 0; font-size: 13px; }',
      '.wbm-input, .wbm-textarea {',
      '  width: 100%; min-width: 0; border: 1px solid var(--wbm-line-strong); border-radius: 6px;',
      '  background: #100e0c; color: var(--wbm-text); font: inherit; font-size: 13px;',
      '  padding: 8px 10px; outline: none; transition: border-color 0.16s ease, box-shadow 0.16s ease;',
      '}',
      '.wbm-input:focus, .wbm-textarea:focus {',
      '  border-color: var(--wbm-gold); box-shadow: 0 0 0 3px rgba(201, 162, 94, 0.14);',
      '}',
      '.wbm-textarea { resize: vertical; min-height: 84px; line-height: 1.55; }',
      '.wbm-check { display: inline-flex; align-items: center; gap: 8px; color: var(--wbm-text); cursor: pointer; user-select: none; font-size: 13px; }',
      '.wbm-check input[type="checkbox"] { width: 15px; height: 15px; accent-color: var(--wbm-gold); cursor: pointer; }',
      '.wbm-field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }',
      '.wbm-field > label { color: var(--wbm-muted); font-size: 12px; font-weight: 500; }',
      '.wbm-help { color: var(--wbm-faint); font-size: 11.5px; line-height: 1.5; }',
      '.wbm-hidden { display: none !important; }',
      '.wbm-right-panels { flex: 1 1 auto; min-height: 0; overflow: auto; padding: 16px 16px 20px; }',
      '.wbm-right-panels::-webkit-scrollbar { width: 6px; }',
      '.wbm-right-panels::-webkit-scrollbar-thumb { background: rgba(214, 188, 148, 0.16); border-radius: 999px; }',
      '.wbm-right-panels::-webkit-scrollbar-thumb:hover { background: rgba(214, 188, 148, 0.28); }',
      '.wbm-section-head {',
      '  display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;',
      '  padding-bottom: 12px; margin-bottom: 12px; border-bottom: 1px solid var(--wbm-line);',
      '}',
      '.wbm-section-title { margin: 0; font-size: 13.5px; font-weight: 600; color: var(--wbm-text); letter-spacing: 0.02em; }',
      '.wbm-section-hint { margin-top: 3px; color: var(--wbm-faint); font-size: 11.5px; line-height: 1.45; }',
      '.wbm-preset-list { display: flex; flex-direction: column; gap: 7px; position: relative; }',
      '.wbm-preset-item {',
      '  position: relative; display: flex; align-items: center; gap: 9px; padding: 10px 11px 10px 9px;',
      '  border: 1px solid var(--wbm-line); border-radius: 8px; background: var(--wbm-bg-card);',
      '  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);',
      '  transition: background 0.16s ease, border-color 0.16s ease, box-shadow 0.2s ease;',
      '  will-change: transform;',
      '}',
      '.wbm-preset-item::before {',
      '  content: ""; position: absolute; left: 0; top: 8px; bottom: 8px; width: 2.5px;',
      '  border-radius: 0 2px 2px 0; background: rgba(201, 162, 94, 0.35);',
      '  transition: background 0.16s ease, top 0.16s ease, bottom 0.16s ease;',
      '}',
      '.wbm-preset-item:hover {',
      '  background: var(--wbm-bg-card-hover); border-color: var(--wbm-line-strong);',
      '}',
      '.wbm-preset-item:hover::before { background: var(--wbm-gold); top: 6px; bottom: 6px; }',
      '.wbm-preset-main { flex: 1; min-width: 0; }',
      '.wbm-preset-name {',
      '  font-size: 13.5px; font-weight: 600; color: var(--wbm-text); letter-spacing: 0.01em;',
      '  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: text;',
      '}',
      '.wbm-preset-meta {',
      '  display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin-top: 4px;',
      '  color: var(--wbm-muted); font-size: 11px;',
      '}',
      '.wbm-badge {',
      '  display: inline-flex; align-items: center; gap: 4px; padding: 1px 7px;',
      '  border-radius: 4px; font-size: 11px; line-height: 1.45;',
      '  background: rgba(255, 248, 235, 0.04); border: 1px solid var(--wbm-line); color: var(--wbm-muted);',
      '}',
      '.wbm-badge.is-gold {',
      '  background: rgba(201, 162, 94, 0.10); border-color: rgba(201, 162, 94, 0.24); color: var(--wbm-gold-bright);',
      '}',
      '.wbm-preset-actions { display: flex; align-items: center; gap: 4px; }',
      '.wbm-preset-actions .wbm-icon-btn {',
      '  width: 28px; height: 28px; font-size: 11.5px; border-color: transparent; background: transparent; color: var(--wbm-faint);',
      '}',
      '.wbm-preset-item:hover .wbm-preset-actions .wbm-icon-btn { color: var(--wbm-muted); }',
      '.wbm-preset-actions .wbm-icon-btn:hover {',
      '  background: rgba(255, 248, 235, 0.07); border-color: var(--wbm-line-strong); color: var(--wbm-text);',
      '}',
      '.wbm-preset-actions .wbm-icon-btn[data-wbp-preset-action="apply"] {',
      '  color: var(--wbm-gold-bright); background: var(--wbm-gold-dim); border-color: rgba(201, 162, 94, 0.28);',
      '}',
      '.wbm-preset-actions .wbm-icon-btn[data-wbp-preset-action="apply"]:hover {',
      '  background: rgba(201, 162, 94, 0.24); border-color: var(--wbm-gold); color: #fff4df;',
      '}',
      '.wbm-preset-actions .wbm-icon-btn[data-wbp-preset-action="delete"]:hover {',
      '  color: var(--wbm-danger); border-color: rgba(212, 106, 106, 0.38); background: rgba(212, 106, 106, 0.1);',
      '}',
      '.wbm-preset-handle {',
      '  display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 28px;',
      '  flex: 0 0 auto; color: var(--wbm-faint); opacity: 0.65; cursor: grab;',
      '  touch-action: none; -webkit-user-select: none; user-select: none;',
      '  transition: color 0.15s ease, opacity 0.15s ease;',
      '}',
      '.wbm-preset-item:hover .wbm-preset-handle { opacity: 1; }',
      '.wbm-preset-handle:hover { color: var(--wbm-gold-bright); }',
      '.wbm-preset-handle:active { cursor: grabbing; }',
      '.wbm-preset-item.is-dragging {',
      '  z-index: 20; cursor: grabbing;',
      '  background: #2b251f; border-color: var(--wbm-gold);',
      '  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(201, 162, 94, 0.25);',
      '  transition: background 0.12s ease, border-color 0.12s ease, box-shadow 0.18s ease !important;',
      '}',
      '.wbm-preset-item.is-dragging::before { background: var(--wbm-gold-bright); top: 4px; bottom: 4px; }',
      '.wbm-preset-item.is-settling {',
      '  z-index: 15;',
      '  transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), background 0.16s ease, border-color 0.16s ease, box-shadow 0.2s ease !important;',
      '}',
      '.wbm-preset-name.is-renaming { display: none; }',
      '.wbm-preset-name-input { font-size: 13px; font-weight: 600; padding: 4px 8px; }',
      '.wbm-empty {',
      '  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;',
      '  min-height: 96px; padding: 20px; color: var(--wbm-faint); font-size: 12px;',
      '  border: 1px dashed var(--wbm-line-strong); border-radius: 8px; background: rgba(255, 248, 235, 0.012);',
      '}',
      '.wbm-empty i { font-size: 18px; color: var(--wbm-gold); opacity: 0.55; }',
      '.wbm-footer {',
      '  display: flex; align-items: center; gap: 10px; padding: 8px 16px;',
      '  border-top: 1px solid var(--wbm-line); background: rgba(0, 0, 0, 0.18);',
      '  color: var(--wbm-faint); font-size: 11px; flex: 0 0 auto;',
      '}',
      '.wbm-status-dot {',
      '  display: inline-block; width: 6px; height: 6px; border-radius: 50%;',
      '  background: var(--wbm-gold); margin-right: 6px; vertical-align: middle; opacity: 0.8;',
      '}',
      '.wbm-footer .wbm-footer-right { margin-left: auto; font-variant-numeric: tabular-nums; }',
      '.wbm-dialog-mask {',
      '  position: fixed; inset: 0; z-index: 2147482100; display: flex; align-items: center; justify-content: center;',
      '  padding: 20px; background: rgba(8, 7, 6, 0.72); backdrop-filter: blur(4px);',
      '}',
      '.wbm-dialog {',
      '  display: flex; flex-direction: column; width: min(520px, calc(100vw - 30px)); max-height: min(86vh, 800px);',
      '  color: var(--wbm-text); font-size: 13.5px; background: var(--wbm-bg-elevated);',
      '  border: 1px solid var(--wbm-line-strong); border-radius: 10px;',
      '  box-shadow: var(--wbm-shadow), inset 0 1px 0 rgba(255, 244, 224, 0.06); overflow: hidden;',
      '  animation: wbm-pop-in 0.18s cubic-bezier(0.22, 1, 0.36, 1);',
      '}',
      '.wbm-dialog-head {',
      '  display: flex; align-items: center; gap: 9px; padding: 13px 16px;',
      '  border-bottom: 1px solid var(--wbm-line); background: rgba(255, 248, 235, 0.015);',
      '}',
      '.wbm-dialog-head h3 {',
      '  flex: 1; margin: 0; font-size: 14.5px; font-weight: 600;',
      '  font-family: "Noto Serif SC", "Songti SC", "STSong", Georgia, serif; color: var(--wbm-text);',
      '}',
      '.wbm-dialog-body { flex: 1 1 auto; min-height: 0; overflow: auto; padding: 16px; }',
      '.wbm-dialog-foot {',
      '  display: flex; align-items: center; justify-content: flex-end; gap: 8px; padding: 11px 16px;',
      '  border-top: 1px solid var(--wbm-line); background: rgba(0, 0, 0, 0.15);',
      '}',
      '.wbm-menu-item { cursor: pointer; }',
      '@media (max-width: 680px) {',
      '  .wbm-header { padding: 11px 12px; }',
      '  .wbm-brand p { display: none; }',
      '  .wbm-input, .wbm-textarea { font-size: 16px; }',
      '  .wbm-dialog-mask { padding: 0; align-items: flex-end; }',
      '  .wbm-dialog { width: 100vw; max-height: 100dvh; border-radius: 14px 14px 0 0; border-bottom: 0; }',
      '  .wbm-dialog-foot .wbm-btn { flex: 1 1 auto; min-height: 40px; }',
      '}',
    ].join('\n');
  doc.head.appendChild(style);
})();

/* 世界书管理器 for SillyTavern + 酒馆助手 (JS-Slash-Runner)
 * 功能：全局世界书预设。
 */
(async function () {
  'use strict';

  const UI_WINDOW = window.parent;
  const UI_DOCUMENT = UI_WINDOW.document;

  /**
   * 在酒馆助手脚本中注册脚本按钮。
   */
  function registerScriptButton(openFn) {
    const buttonName = '世界书管理设置';
    appendInexistentScriptButtons([{ name: buttonName, visible: true }]);
    eventOn(getButtonEvent(buttonName), openFn);
    replaceScriptInfo(
      [
        '版本: 1.6.1',
        '类型: 酒馆助手脚本',
        '入口: 点击“' + buttonName + '”。',
        '功能: 全局世界书预设。',
      ].join('\n'),
    );
  }

  const WBM = {
    version: '1.6.1',
    name: '世界书管理器',
    /** 旧版本地存储键，仅作迁移与本机回退使用 */
    storageKey: 'wbm.settings.v1',
  };

  window.WorldbookManager = WBM;
  UI_WINDOW.WorldbookManager = WBM;

  // ---------------------------------------------------------------------------
  // 基础工具
  // ---------------------------------------------------------------------------

  const clone = _.cloneDeep;
  const debounce = _.debounce;

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
    toastr[type](message, title);
  }

  function formatError(error) {
    if (!error) return '未知错误';
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    return String(error);
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
    };
  }

  // ---------------------------------------------------------------------------
  // 偏好存储
  // 主存储使用酒馆助手的「脚本变量」（type: 'script'），它随脚本/世界书一起保存，
  // 因此同一个 URL 打开的不同设备/客户端可以共享同一套预设。
  // localStorage 仅作为旧版本迁移与本机回退。
  // ---------------------------------------------------------------------------

  /** 用于区分「从未写入」与「被清空」的偏好字段。 */
  const PREF_STORAGE_KEYS = ['worldbookPresets'];

  function looksLikePreferences(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
    return PREF_STORAGE_KEYS.some(key => Object.prototype.hasOwnProperty.call(value, key));
  }

  /** 读取共享的脚本变量；没有偏好数据时返回 null。 */
  function readSharedPreferences() {
    try {
      const raw = getVariables({ type: 'script' });
      return looksLikePreferences(raw) ? raw : null;
    } catch (error) {
      console.warn('[世界书管理器] 读取脚本变量失败', error);
      return null;
    }
  }

  /** 把偏好写入共享的脚本变量；成功返回 true。 */
  function writeSharedPreferences(preferences) {
    try {
      replaceVariables(clone(preferences), { type: 'script' });
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
      worldbookPresets: Array.isArray(stored.worldbookPresets) ? stored.worldbookPresets : defaults.worldbookPresets,
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
    /** 管理器是否已经打开 */
    opened: false,
    /** 已经初始化的 UI 是否已创建 */
    domReady: false,
    /** 世界书名称列表 */
    names: [],
    /** 全局开启的世界书 */
    globalNames: new Set(),
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

  function refreshBindings() {
    try {
      state.globalNames = new Set(getGlobalWorldbookNames());
    } catch (error) {
      state.globalNames = new Set();
    }
  }

  async function refreshWorldbookNames() {
    state.names = safeArray(getWorldbookNames()).slice().sort((a, b) => text(a).localeCompare(text(b), 'zh-Hans-CN'));
    refreshBindings();
    return state.names;
  }

  /**
   * 用 mutator 原子地更新某个世界书。
   */
  async function mutateWorldbook(name, mutator) {
    if (!state.names.includes(name)) throw new Error(`世界书不存在：${name}`);
    return enqueueWorldbook(name, async () => {
      await updateWorldbookWith(name, mutator, { render: 'debounced' });
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

  function describeWorldbookPresetBadges(preset) {
    const globalCount = safeArray(preset.global).length;
    const stateBooks = preset.entryStates && typeof preset.entryStates === 'object' ? Object.keys(preset.entryStates).length : 0;
    const globalBadge = `<span class="wbm-badge is-gold">全局 ${globalCount} 本</span>`;
    const entryBadge = preset.recordEntries
      ? `<span class="wbm-badge">含条目状态 · ${stateBooks} 本</span>`
      : `<span class="wbm-badge">仅切换世界书</span>`;
    return `${globalBadge}${entryBadge}`;
  }

  async function collectWorldbookEntryStates(names) {
    const result = {};
    for (const name of safeArray(names)) {
      if (!state.names.includes(name)) continue;
      try {
        const entries = await getWorldbook(name);
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
    };
  }

  function exportPresets() {
    try {
      const backup = collectPresetBackup();
      downloadFile(`世界书预设备份-${makeTimestamp()}.json`, JSON.stringify(backup, null, 2));
      notify(`已导出：世界书预设 ${backup.worldbookPresets.length} 个`, 'success');
    } catch (error) {
      notify(formatError(error), 'error');
    }
  }

  /** 把导入文件规整成 {worldbookPresets}，非法时抛错。 */
  function normalisePresetBackup(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      throw new Error('文件内容不是有效的预设备份');
    }
    const ensureId = item => (item && typeof item === 'object' ? { ...item, id: item.id || uniqueId('imported') } : null);
    const worldbookPresets = (Array.isArray(raw.worldbookPresets) ? raw.worldbookPresets : []).map(ensureId).filter(Boolean);
    if (!worldbookPresets.length) {
      throw new Error('文件里没有可导入的预设');
    }
    return { worldbookPresets };
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
    const wbNew = backup.worldbookPresets.filter(item => !currentWb.some(existing => existing.id === item.id)).length;
    const summary =
      `文件包含：世界书预设 ${backup.worldbookPresets.length} 个。\n\n` +
      `合并导入：保留现有预设，按 id 覆盖同名项（新增 ${wbNew} 个）。\n` +
      `覆盖导入：清空当前预设库，只保留文件内容。`;
    const mode = await askImportMode(summary);
    if (mode === 'cancel') return;

    if (mode === 'replace') {
      state.preferences.worldbookPresets = backup.worldbookPresets;
    } else {
      state.preferences.worldbookPresets = mergePresets(currentWb, backup.worldbookPresets);
    }
    savePreferences();
    renderPresets();
    notify(`导入完成：世界书预设 ${state.preferences.worldbookPresets.length} 个`, 'success');
  }

  // ---------------------------------------------------------------------------
  // 绑定操作
  // ---------------------------------------------------------------------------

  async function setGlobalBindings(names) {
    const valid = safeArray(names).filter(name => state.names.includes(name));
    await rebindGlobalWorldbooks(valid);
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
      $window.addClass('is-window-dragging');

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
        $window.removeClass('is-window-dragging');
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
            <div class="wbm-section-head">
              <div>
                <h3 class="wbm-section-title">全局世界书预设</h3>
                <div class="wbm-section-hint">
                  快速切换全局启用的世界书组合；可选记录每本世界书内条目的启用/禁用状态。
                </div>
              </div>
              <button type="button" class="wbm-btn is-primary" id="wbm_wbp_save"><i class="fa-solid fa-plus"></i> 保存当前</button>
            </div>
            <div class="wbm-preset-list" id="wbm_worldbook_preset_list"></div>
          </section>
        </div>

        <footer class="wbm-footer">
          <span><span class="wbm-status-dot"></span><span id="wbm_status">就绪</span></span>
          <span class="wbm-footer-right">v${WBM.version} · 酒馆助手</span>
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

    const worldbookPresetHtml = worldbookPresets.length
      ? worldbookPresets
          .map(
            preset => `
              <div class="wbm-preset-item" data-worldbook-preset="${escapeHtml(preset.id)}" data-preset-id="${escapeHtml(preset.id)}">
                <span class="wbm-preset-handle" title="按住拖动排序"><i class="fa-solid fa-grip-vertical"></i></span>
                <div class="wbm-preset-main">
                  <div class="wbm-preset-name" data-preset-name title="双击重命名">${escapeHtml(preset.name)}</div>
                  <div class="wbm-preset-meta">${describeWorldbookPresetBadges(preset)}</div>
                </div>
                <div class="wbm-preset-actions">
                  <button type="button" class="wbm-icon-btn" data-wbp-preset-action="apply" data-preset-id="${escapeHtml(preset.id)}" title="一键应用此世界书预设"><i class="fa-solid fa-play"></i></button>
                  <button type="button" class="wbm-icon-btn" data-wbp-preset-action="update" data-preset-id="${escapeHtml(preset.id)}" title="用当前状态更新此预设"><i class="fa-solid fa-rotate"></i></button>
                  <button type="button" class="wbm-icon-btn" data-wbp-preset-action="copy" data-preset-id="${escapeHtml(preset.id)}" title="复制预设"><i class="fa-solid fa-clone"></i></button>
                  <button type="button" class="wbm-icon-btn" data-wbp-preset-action="delete" data-preset-id="${escapeHtml(preset.id)}" title="删除预设"><i class="fa-solid fa-trash-can"></i></button>
                </div>
              </div>`,
          )
          .join('')
      : `<div class="wbm-empty"><i class="fa-solid fa-book-bookmark"></i><span>暂无全局世界书预设，点击右上角「保存当前」创建</span></div>`;

    state.$overlay.find('#wbm_worldbook_preset_list').html(worldbookPresetHtml);

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
      const handleEl = this;
      const $item = $(this).closest('.wbm-preset-item');
      const itemEl = $item.get(0);
      const startY = native.clientY;
      let anchorTop = 0;
      let lastClientY = startY;
      let dragging = false;

      const updateDraggedTransform = () => {
        const dy = lastClientY - startY;
        const currentTop = itemEl.offsetTop;
        const shiftY = dy - (currentTop - anchorTop);
        itemEl.style.transform = `translate3d(0, ${shiftY}px, 0) scale(1.015)`;
      };

      const animateSiblings = (beforeTops, excludeEl) => {
        const children = $list.children('.wbm-preset-item').toArray();
        for (const el of children) {
          if (el === excludeEl) continue;
          const prevTop = beforeTops.get(el);
          if (prevTop === undefined) continue;
          const newTop = el.offsetTop;
          const deltaY = prevTop - newTop;
          if (Math.abs(deltaY) < 1) continue;
          el.style.transition = 'none';
          el.style.transform = `translate3d(0, ${deltaY}px, 0)`;
          void el.offsetHeight;
          el.style.transition = 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)';
          el.style.transform = '';
        }
      };

      const onMove = move => {
        if (move.pointerId !== pointerId) return;
        lastClientY = move.clientY;
        if (!dragging) {
          if (Math.abs(move.clientY - startY) < 4) return;
          dragging = true;
          anchorTop = itemEl.offsetTop;
          $item.removeClass('is-settling').addClass('is-dragging');
        }
        move.preventDefault();

        const siblings = $list.children('.wbm-preset-item').toArray();
        const draggedRect = itemEl.getBoundingClientRect();
        const draggedCenterY = draggedRect.top + draggedRect.height / 2;

        let targetEl = null;
        let insertBefore = true;
        for (const el of siblings) {
          if (el === itemEl) continue;
          const rect = el.getBoundingClientRect();
          const centerY = rect.top + rect.height / 2;
          if (draggedCenterY < centerY) {
            targetEl = el;
            insertBefore = true;
            break;
          }
          targetEl = el;
          insertBefore = false;
        }

        const shouldMove =
          targetEl &&
          ((insertBefore && itemEl.nextElementSibling !== targetEl) ||
            (!insertBefore && itemEl.previousElementSibling !== targetEl));

        if (shouldMove) {
          const beforeTops = new Map();
          for (const el of siblings) {
            if (el !== itemEl) beforeTops.set(el, el.offsetTop);
          }
          if (insertBefore) $item.insertBefore(targetEl);
          else $item.insertAfter(targetEl);
          animateSiblings(beforeTops, itemEl);
        }

        updateDraggedTransform();
      };

      const onEnd = endEvent => {
        if (endEvent && endEvent.pointerId !== undefined && endEvent.pointerId !== pointerId) return;
        UI_DOCUMENT.removeEventListener('pointermove', onMove);
        UI_DOCUMENT.removeEventListener('pointerup', onEnd);
        UI_DOCUMENT.removeEventListener('pointercancel', onEnd);
        if (handleEl && handleEl.hasPointerCapture && handleEl.hasPointerCapture(pointerId)) {
          handleEl.releasePointerCapture(pointerId);
        }
        if (!dragging) return;
        $item.removeClass('is-dragging').addClass('is-settling');
        itemEl.style.transform = '';
        setTimeout(() => {
          $item.removeClass('is-settling');
          $list.children('.wbm-preset-item').each(function () {
            this.style.transition = '';
            this.style.transform = '';
          });
        }, 230);
        persistPresetOrder($list, collectionKey);
      };

      UI_DOCUMENT.addEventListener('pointermove', onMove);
      UI_DOCUMENT.addEventListener('pointerup', onEnd);
      UI_DOCUMENT.addEventListener('pointercancel', onEnd);
      if (handleEl && handleEl.setPointerCapture) handleEl.setPointerCapture(pointerId);
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
    if ($('#wbm_menu_item').length) return;
    $('#extensionsMenu').append(`
      <div id="wbm_menu_item" class="list-group-item flex-container flexGap5 interactable wbm-menu-item" title="世界书管理器">
        <i class="fa-solid fa-book-atlas"></i>
        <span>世界书管理器</span>
      </div>`);
    $('#wbm_menu_item').on('click', () => {
      $('#extensionsMenu').fadeOut(150);
      toggleManager();
    });
  }

  function createSettingsPanel() {
    if ($('#wbm_settings').length) return;
    $('#extensions_settings2').append(`
      <div id="wbm_settings" class="margin-b-1">
        <div class="inline-drawer">
          <div class="inline-drawer-toggle inline-drawer-header">
            <b>世界书管理器</b>
            <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
          </div>
          <div class="inline-drawer-content">
            <div class="wbm-help" style="margin-bottom:8px">
              全局世界书预设管理。
            </div>
            <div class="flex-container flexGap5" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
              <div id="wbm_settings_open" class="menu_button">世界书管理设置</div>
            </div>
          </div>
        </div>
      </div>`);

    $('#wbm_settings_open').on('click', toggleManager);
  }

  function initWorldbookManager() {
    registerScriptButton(() => toggleManager());

    // 同步一次偏好：优先使用共享脚本变量；若共享数据为空但本机有旧数据，则迁移到共享存储。
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

    createMenuEntry();
    createSettingsPanel();
    refreshBindings();
  }

  function destroyWorldbookManager() {
    $(UI_WINDOW).off('.wbm_window');
    $(UI_DOCUMENT).find('.wbm-dialog-mask').remove();
    if (state.$overlay) {
      state.$overlay.remove();
      state.$overlay = null;
      state.domReady = false;
    }
    $('#wbm_menu_item').remove();
    $('#wbm_settings').remove();
    $('#wbm_script_style').remove();
    $('body').removeClass('wbm-opened');
  }

  // 暴露一些调试接口
  WBM.open = showManager;
  WBM.close = closeManager;
  WBM.toggle = toggleManager;
  WBM.state = state;

  $(initWorldbookManager);
  $(window).on('pagehide', destroyWorldbookManager);
})();
