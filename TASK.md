# WorkBuddy 派发任务简报

> 项目目录：`E:/AgentCPM/07_一人公司出海项目/12_Micro_SaaS出海/sqlfix`
> 本文件由 WorkBuddy（一人公司专家团·总指挥）自动派发。
> **执行方式**：用对应 IDE（Cursor / Trae / CodeBuddy）打开本项目，启动其内置 AI Agent / Composer，将下方任务交给它执行；完成后回到 WorkBuddy 做构建与验收。


---
### 📋 任务简报 @ 2026-07-09 21:26
**generate_code**

- 目标工具/语言：Next.js (Pages Router) + TypeScript
- 任务描述：
为产品 sqlfix（自然语言转 SQL 工具）新增'历史记录 + 分享'功能：
1. 用 localStorage 保存每次生成的 SQL 与对应的自然语言问题，结果页下方展示历史列表，点击可恢复。
2. 新增 'Share' 按钮：把当前 SQL + 问题 base64 编码进 URL（/share?q=...），新增 pages/share.js 读取并只读展示。
3. 纯前端实现，无后端依赖；`npm run build` 必须通过；不引入任务以外的依赖。

- 验收标准：
  1. 代码可运行、通过类型检查与 `npm run build`
  2. 不引入任务以外的依赖（必要新增须说明）
  3. 核心逻辑不留占位 TODO；仅在需外部密钥/DB 处标注 TODO 并附 `.env.example`
  4. 改动保持与现有 Next.js Pages Router 结构一致


---
### 📋 任务简报 @ 2026-07-09 22:48
**generate_code**

- 目标工具/语言：Next.js (Pages Router) + TypeScript
- 任务描述：
为 sqlfix 增加测试与发布质量加固（在现有历史记录+分享功能之上，不要改动已实现的 localStorage 历史与 /share 页）：
1. 在 submit 中增加空输入保护：question 为空时返回友好错误，不调用 /api/tool。
2. 新增 scripts/smoke.mjs：启动 `next start -p 3125`，curl POST /api/tool (body {inputs:{question:'total revenue per user',dialect:'PostgreSQL'},useMock:true}) 断言 200 且 result 含 'SELECT'；完成后 kill。package.json 加 "test:smoke"。
3. 新增 public/terms.html 与 public/privacy.html（静态页，简短占位），让页脚 Terms/Privacy 链接不再 404。
4. `npm run build` 必须通过；不引入任务以外的依赖。

- 验收标准：
  1. 代码可运行、通过类型检查与 `npm run build`
  2. 不引入任务以外的依赖（必要新增须说明）
  3. 核心逻辑不留占位 TODO；仅在需外部密钥/DB 处标注 TODO 并附 `.env.example`
  4. 改动保持与现有 Next.js Pages Router 结构一致
