# 酒馆助手 (Tavern Helper) 脚本仓库指引

## 一、本仓库工作流

本仓库采用**「零构建、原生 JS 单文件直出 + Git Push 驱动更新」**的极简工作流：

1. **项目结构与新建插件**：
   - 每个脚本对应根目录下的一个独立文件夹（如 `lorebook-manager/`）。
   - `index.js`：脚本完整源码（原生 JavaScript，直接在浏览器运行，无编译打包步骤）。
   - `index.json`：导入酒馆助手的包装器，通过 GitHub API 获取最新 commit SHA 并由 jsDelivr 动态 `import()` 加载 `index.js`。
   - **新建插件**：直接复制仓库内现存插件的 `index.json` 作为模板，仅修改其中的 `id`（生成新 UUID）、`name`、`info`、`button` 以及 `content` 中的脚本路径（`path`）。默认不要在页面下方（聊天框周边或 `#extensionsMenu`）注入快捷按钮，只在插件本身的下拉框中提供按钮。
2. **禁止引入构建工具链**：
   - **不要**使用 TypeScript、Vue (`.vue`)、Webpack、Tailwind 等需要编译的语法或 npm 依赖。
   - **不要**套用参考仓库中的打包构建（`pnpm build/watch`）、本地静态服务或 `tavern_sync` 流程。
3. **验证与交付**：
   - 修改后用 `node --check <path>/index.js` 校验语法。
   - 当用户说**「提交」**时，默认执行 **`git commit` 并 `git push`** 到 `main` 分支。

---

## 二、API 与写法参考

- **参考仓库**：`https://github.com/StageDog/tavern_helper_template`
- **本地默认路径**：`/app/tavern_helper_template`（下述路径均相对于该仓库根目录）

编写或修改脚本时，**严禁盲猜酒馆助手接口或编写防御性探测代码**（如 `typeof window.xxx === 'function'`、轮询 `window.TavernHelper` 等）。涉及酒馆助手 API、内置库、事件、STScript 命令或脚本生命周期机制时，先去参考仓库查阅：

1. **总索引与说明**：先读 `AGENTS.md`（仅参考其「与酒馆交互的方式 / 酒馆助手接口 / 酒馆变量」章节，忽略其 Webpack/Vue/TS 工程要求）。
2. **接口签名与示例**：按需在 `@types/` 下查找并读取对应的 `.d.ts` 文件。
3. **脚本运行机制**：参考 `.agents/skills/tavern-helper-script/SKILL.md`（了解脚本无沙盒 iframe 环境、全局 `$` / `_` / `toastr`、样式挂载到主页面及 `pagehide` 卸载清理机制）。
4. **斜杠命令**：仅当无对应 JS 接口时，查阅 `slash_command.txt`。
