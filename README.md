# 在线简历

前端开发工程师的滚动叙事式简历单页，用 React + TypeScript + GSAP 构建，部署到 `zhaoyifan.top`。

页面内容全部硬编码在前端，不发起任何接口请求。

## 在线访问

- 主域名：https://zhaoyifan.top
- GitHub Pages：https://zhao-yi-fan.github.io

## 技术栈

- React 19 + TypeScript 5
- GSAP 3（ScrollTrigger / SplitText / DrawSVG）+ `@gsap/react`
- CRACO + `react-scripts`
- pnpm

## 本地开发

```bash
pnpm install
pnpm start
```

默认开发地址：`http://localhost:5173`

## 构建

```bash
pnpm build
```

## 改内容只需要动一个文件

所有文案、经历、技能、项目都集中在 [`src/data/resume.ts`](src/data/resume.ts)，带完整类型定义。
公开页刻意不放手机号、出生年月和公司全称；没有外链的项目卡片不可点。

## 章节与动画

| 章节 | 文件 | 主要动画 |
| --- | --- | --- |
| 首屏 | `src/components/Hero` | SplitText 逐字遮罩揭示、鼠标视差光晕、滚动淡出 |
| 关于我 | `src/components/About` | 数字滚动计数 |
| 技能 | `src/components/Skills` | 能力条进入视口后播放一次增长 |
| 工作经历 | `src/components/Timeline` | 侧栏 pin 钉住、DrawSVG 线绘、节点逐个激活 |
| 项目 | `src/components/Projects` | 任职案例列表逐条进场 |
| 作品 | `src/components/Personal` | 个人项目卡片进场、桌面端轻微倾斜 |
| 联系 | `src/components/Contact` | 磁吸按钮 |

GSAP 插件在 [`src/lib/gsap.ts`](src/lib/gsap.ts) 统一注册，断点常量也定义在这里。
动画全部通过 `useGSAP` 创建，由 `gsap.context()` 自动清理，兼容 `StrictMode` 的双调用。

## 响应式与无障碍

- 断点分流用 `gsap.matchMedia()`，不手写 `window.innerWidth` 判断，断点切换时 GSAP 自动清理重建。
- 命中 `prefers-reduced-motion: reduce` 时走静态分支：不切分文字、不位移、不 pin，内容直接可见。
- 字体加载完成后调用 `ScrollTrigger.refresh()`，避免 pin 的起止位置算错。

## 项目说明

- `craco.config.js` 把打包产物的 `publicPath` 设为相对路径，便于 GitHub Pages 和静态目录部署。
- 项目区是只读案例列表。可点开的个人项目在「作品」章节。
- 仓库统一使用 `pnpm-lock.yaml`，不再维护 `package-lock.json` 和 `yarn.lock`。
- 当前未维护自动化测试，保留 `pnpm test` 脚本仅用于后续补充测试时复用。
