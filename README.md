# 项目中心

个人项目导航页，使用 React、TypeScript 和 Ant Design 构建，部署到 `zhaoyifan.top`。

## 在线访问

- 主域名：https://zhaoyifan.top
- GitHub Pages：https://zhao-yi-fan.github.io

## 当前展示项目

- `笔记doc`：VitePress 博客
- `学习总结代码`：学习示例集合
- `泡漫平台`：React 项目入口

## 技术栈

- React 19
- TypeScript 5
- Ant Design 5
- CRACO + `react-scripts`
- pnpm

## 本地开发

```bash
pnpm install
pnpm start
```

默认开发地址：`http://localhost:3000`

## 构建

```bash
pnpm build
```

## 项目说明

- 首页项目卡片定义在 `src/App.tsx`
- 样式位于 `src/App.css`
- `craco.config.js` 将打包产物的 `publicPath` 设置为相对路径，便于 GitHub Pages 和静态目录部署
- 仓库统一使用 `pnpm-lock.yaml`，不再维护 `package-lock.json` 和 `yarn.lock`
- 当前未维护自动化测试，保留 `pnpm test` 脚本仅用于后续补充测试时复用
