import { Card, List } from 'antd';
import './App.css';

// 注意：Ant Design 5.x 主题配置需要在安装依赖后通过 ConfigProvider 设置
// 当前先使用默认主题，安装依赖后可添加主题配置

// 项目数据类型定义
interface ProjectItem {
  title: string;
  link: string;
  description: string;
}

const data: ProjectItem[] = [
  {
    title: '笔记doc',
    link: 'https://blog.zhaoyifan.top',
    description: 'vitepress',
  },
  // {
  //   title: '移动端点餐',
  //   link: './take-out-platform/',
  //   description: 'vue3+vuex',
  // },
  // {
  //   title: 'bunny-ui',
  //   link: './bunny-ui/',
  //   description: 'vue2组件库',
  // },
  // {
  //   title: 'bunny-ui-next',
  //   link: './bunny-ui-next/',
  //   description: 'vue3组件库',
  // },
  // {
  //   title: 'jira管理',
  //   link: './jira/',
  //   description: 'react17',
  // },
  {
    title: '学习总结代码',
    link: './study/',
    description: '总结小栗子',
  },
  {
    title: '泡漫平台',
    link: 'http://8.152.208.234:8081/',
    description: '自己做的泡漫平台，React',
  },
  // {
  //   title: 'netlify serverless',
  //   link: 'https://determined-benz-6b3316.netlify.app/',
  //   description: 'netlify serverless react17项目',
  // },
];

function App() {
  return (
    <div className="App">
      <List
        grid={{
          gutter: 16,
          xs: 1, // 超小屏幕：1列
          sm: 2, // 小屏幕：2列
          md: 3, // 中等屏幕：3列
          lg: 4, // 大屏幕：4列
          xl: 4, // 超大屏幕：4列
          xxl: 4, // 超超大屏幕：4列
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <a href={item.link} target="_blank" rel="noreferrer">
              <Card hoverable>
                <Card.Meta title={item.title} description={item.description} />
              </Card>
            </a>
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
