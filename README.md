# HawkPP · 作品与探索

HawkPP 的个人作品网站，收录公开项目与正在进行的探索。React、Vite、TypeScript，静态输出，无登录、数据库、服务端或统计服务。采用系统字体，页面加载时不请求第三方资源。

## 本地使用

需要 Node.js 22.12 以上版本。首次使用运行：

```sh
npm ci
npm run dev
```

打开终端显示的本机地址，默认 `http://127.0.0.1:5173`。只监听本机回环地址，不开放局域网或公共预览。

```sh
npm run build          # TypeScript 检查和生产构建
npm run check:privacy  # 构建后检查公开内容和常见凭证模式
npm test               # 本机 Chrome：桌面、平板、手机、窄屏测试
npm run preview        # 生产版本，本机 4173 端口
```

测试使用已安装的 Google Chrome；如运行环境没有 Chrome，需先安装浏览器，或调整 `playwright.config.ts` 的浏览器配置。测试截图位于 `artifacts/`，不会进入 Git 或构建产物。

## 修改内容

- `src/content.ts`：公开网名、首屏文案、项目用途、公开链接、在研状态、关于文案、公开记录。
- `src/App.tsx`：页面结构与原创 SVG 图形。
- `src/components/ProjectArt.tsx`：项目概念插画与在研图形。
- `src/components/Navigation.tsx`：随阅读位置更新的导航，包含滚动事件清理。
- `src/styles.css`：颜色、字号、布局、响应式与减少动态效果设置。
- `index.html`：网页标题、描述、分享摘要。
- `public/favicon.svg`：原创图标。

只写可以确认且适合公开的信息。公开称呼统一使用 HawkPP，不使用真名，也不收录个人背景、账号、邮箱或联系方式。成长记录 `notes` 初始为空，整个板块与导航会自动隐藏。只有确认可公开的真实更新才加入；每条包含 `id`、`date`（ISO 日期）、`title`、`summary`。不要添加示例经历或未公开研究细节。

主图、图标与项目概念图均为本站原创 SVG/CSS，不是项目截图。首屏强调路径在 2.8 秒内完成一次绘制；可以主动重绘，系统设置减少动态效果时自动静止。无持续动画循环，无 WebGL 或动画库。

项目的功能摘要由 `features` 管理，展开说明使用原生 `details` / `summary`，支持键盘操作。导航固定在顶部，锚点预留导航栏高度；手机上直接展示全部导航，不增加菜单操作。页面没有本地存储、Cookie 或外部字体请求。

## 构建与发布

`vite.config.ts` 使用 `base: './'`，构建后的脚本、样式和图标采用相对路径，可用于仓库子目录或域名根目录。页面只使用锚点导航，不依赖服务器路由。`public/.nojekyll` 会复制到构建目录。

发布目标为 GitHub Pages，自定义域名为 `hawkpp2025.com`。`.github/workflows/pages.yml` 在推送到 `main` 时执行依赖安装、类型检查、构建、隐私扫描、浏览器测试，然后发布 `dist/`。也可以在 Actions 页面手动运行工作流。测试截图、依赖目录和本地文件不会上传到网站。

首次启用时，在仓库 Settings → Pages 中选择 **GitHub Actions** 作为发布源，并在 Custom domain 中设置域名。使用自定义 Actions 工作流时，域名由 Pages 设置管理，不依赖 CNAME 文件。账号认证、域名所有权验证及 DNS 设置由站点所有者完成；已有项目子域名的 DNS 记录应保持不变。

`index.html` 的 canonical 与分享地址、`public/robots.txt` 和 `public/sitemap.xml` 使用上述主域名。如果未来更换主域名，应同步修改这些文件与 Pages 设置。

## 参考与许可

查看了 [React Bits Strands](https://www.reactbits.dev/animations/strands) 的视觉与说明，核对了仓库的 [MIT + Commons Clause 条款](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md)。本站没有复制该组件的源码或素材；采用独立编写的 SVG 路径，不引入该组件的运行时依赖。

直接使用的运行时依赖为 React、React DOM（MIT）；开发依赖的许可保留在各 npm 包中，精确版本由 `package-lock.json` 锁定。

隐私扫描只检查常见模式，无法判断所有文字是否适合公开。每次添加内容仍需人工审阅，截图只截取本站，不截取其他项目中的用户数据。

## 本地验证

- 生产构建、TypeScript 检查及源码/产物隐私扫描通过。
- 本机 Chrome 在 1440、768、390、320px 视口检查布局、无横向溢出、键盘跳过链接、固定导航及当前栏目、原生项目说明展开/收起、锚点导航、刷新、动效结束与重绘、减少动态效果设置。
- axe 的 WCAG 2 A/AA、2.1 AA 自动规则没有报告违规；自动检测不能替代完整人工无障碍评估。
- 页面首次加载没有外部网络请求。使用临时本机静态服务器验证 `/portfolio/` 子目录下的脚本、样式、图标和刷新。
- 两个公开项目链接均返回 HTTP 200。功能介绍仅参考未登录公开页的说明和控件；未登录、未读写账户内容、未测试外部项目的完整业务流程。
- 已查看桌面、平板与手机截图。移动端为 Chrome 触屏模拟，未使用实体手机，也未在 Safari/Firefox 上测试。
