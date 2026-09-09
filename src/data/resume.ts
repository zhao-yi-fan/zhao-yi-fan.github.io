/**
 * 简历的唯一数据源。整站不调用任何接口，改这个文件即可替换全部内容。
 *
 * 公开页只放职业信息：不写手机号、出生年月、公司全称、内部产品名和精确流量数字。
 */

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  intro: string[];
  location: string;
  github: string;
  githubHandle: string;
  email: string;
  site: string;
  blog: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface Skill {
  name: string;
  /** 0-100，用于滚动增长的能力条 */
  level: number;
}

export interface SkillGroup {
  title: string;
  caption: string;
  items: Skill[];
}

export interface Experience {
  period: string;
  company: string;
  role: string;
  points: string[];
  tags: string[];
}

export interface Project {
  title: string;
  description: string;
  detail: string;
  /** 没有公开地址就留空，卡片不可点 */
  link?: string;
  /** true 表示站外地址，false 表示部署在同域子目录下 */
  external?: boolean;
  tags: string[];
}

export const profile: Profile = {
  name: '赵一凡',
  title: '前端开发工程师',
  tagline: '把复杂交互做成理所当然的样子',
  intro: [
    '软件工程本科，2019 年毕业后一直做前端。熟悉 Vue 与 React 双生态，近几年也在 Flutter 上落地 AI 智能体业务。',
    '习惯从工程化角度收口重复劳动：构建迁移、monorepo 组件库、Hybrid 性能和监控，都亲手做过完整闭环。',
  ],
  location: '天津 / 北京',
  github: 'https://github.com/zhao-yi-fan',
  githubHandle: 'zhao-yi-fan',
  email: 'zhao-yi-fan@qq.com',
  site: 'https://zhaoyifan.top',
  blog: 'https://blog.zhaoyifan.top',
};

export const stats: Stat[] = [
  { label: '前端开发年限', value: 7, suffix: '年' },
  { label: '面向用户规模', value: 100, suffix: '万+' },
  { label: '智能体业务', value: 3, suffix: '个' },
  { label: '首屏 FCP 提升', value: 37, suffix: '%' },
];

export const skillGroups: SkillGroup[] = [
  {
    title: '框架与视图层',
    caption: 'Web 主力，客户端也能上手',
    items: [
      { name: 'Vue 2 / Vue 3', level: 90 },
      { name: 'React', level: 86 },
      { name: 'TypeScript', level: 82 },
      { name: 'Flutter / Dart', level: 78 },
    ],
  },
  {
    title: '工程化与构建',
    caption: '把重复劳动收成工具链',
    items: [
      { name: 'Vite / Webpack / Rollup', level: 88 },
      { name: 'pnpm / Lerna Monorepo', level: 80 },
      { name: 'Jenkins CI / YAML', level: 76 },
      { name: 'qiankun 微前端', level: 72 },
    ],
  },
  {
    title: '终端 · 协议 · AI',
    caption: 'Hybrid 和流式是近两年的主场',
    items: [
      { name: 'Hybrid / JSBridge', level: 86 },
      { name: 'SSE 流式渲染', level: 80 },
      { name: 'WebSocket / 监控埋点', level: 78 },
      { name: 'Cursor / AI 辅助研发', level: 84 },
    ],
  },
];

export const experiences: Experience[] = [
  {
    period: '2025.12 — 至今',
    company: '万联智链',
    role: '前端开发工程师',
    points: [
      '负责业务 App 内报告创作、海报生图、知识库等智能体的 Flutter 端开发，把 AI 能力接到真实业务链路。',
      '打通深度思考、大纲、正文到 PPT 的报告创作流程，并接入 SSE 流式输出与增量渲染。',
      '基于 model 标识封装统一 AI 请求链路，知识库侧覆盖文件管理、问答筛选、测验与文档生成。',
    ],
    tags: ['Flutter', 'Dart', 'SSE', '埋点'],
  },
  {
    period: '2024.08 — 2025.11',
    company: '掌阅科技',
    role: '前端开发工程师',
    points: [
      '负责小说 / 短剧系 App 的 H5 业务，覆盖会员、激励、唤端与端协议，日活规模在百万级。',
      '主导多马甲包前端工程合并：统一构建链路、沉淀公共能力，团队只需关注业务差异。',
      'Hybrid 性能与容灾：WebView 预渲染、骨架屏、离线数据；FCP 从 4.3s 降到 2.7s。配套 HTTPDNS、多域名切换和 APM 监控。',
    ],
    tags: ['Vue 2', 'Vite', 'Hybrid', 'APM'],
  },
  {
    period: '2021.04 — 2024.07',
    company: '宏信建发',
    role: '前端开发工程师',
    points: [
      '参与订单、调度、运输一体的 SaaS 中台，覆盖下单、出入库、账单签署、证件入驻和路径规划展示。',
      '用 WebSocket 做数据监控：状态轮询、断线重连、操作队列，保证长连接场景下的数据可靠。',
      '推动 Webpack 迁 Vite、内部 Element UI 组件库（Lerna monorepo）以及版本检测工具库的落地。',
    ],
    tags: ['React', 'WebSocket', 'Vite', 'Monorepo'],
  },
];

export const projects: Project[] = [
  {
    title: '智能体业务',
    description: 'Flutter · 万联智链',
    detail:
      '报告创作、海报生图与知识库三个智能体。SSE 流式展示、统一 model 请求链路，以及正文到 PPT 的业务打通。',
    tags: ['Flutter', 'SSE', 'AI'],
  },
  {
    title: '阅读系 Hybrid H5',
    description: 'Vue 2 · 掌阅科技',
    detail:
      '百万级 UV 的小说 / 短剧 H5：激励与会员闭环、马甲包工程化、WebView 预渲染。FCP 优化 37%，并接入灰度与 APM。',
    tags: ['Vue 2', 'Hybrid', '性能'],
  },
  {
    title: '物流 SaaS 中台',
    description: 'React · 宏信建发',
    detail:
      'OMS / TMS / DMS 流程：下单调度、账单与证件识别、车辆路径展示。WebSocket 监控台负责长连接与操作队列。',
    tags: ['React', 'WebSocket', 'SaaS'],
  },
  {
    title: '前端基建',
    description: '组件库 · 构建 · 检测',
    detail:
      'Lerna 维护内部 Element UI 组件库；Rollup 打包版本更新检测工具并配文档站；主导 Vue 项目 Webpack → Vite 迁移。',
    tags: ['Rollup', 'Lerna', 'Vite'],
  },
  {
    title: '技术笔记',
    description: '个人博客',
    detail: '公开的技术笔记站，记录框架、工程化与 Hybrid 实践，不涉及任职公司的内部细节。',
    link: 'https://blog.zhaoyifan.top',
    external: true,
    tags: ['VitePress', '笔记'],
  },
];

export const sections = [
  { id: 'about', label: '关于' },
  { id: 'skills', label: '技能' },
  { id: 'experience', label: '经历' },
  { id: 'projects', label: '项目' },
  { id: 'contact', label: '联系' },
] as const;
