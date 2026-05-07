import { Card, List } from 'antd';
import './App.css';

interface ProjectItem {
  title: string;
  link: string;
  description: string;
}

const projects: ProjectItem[] = [
  {
    title: '笔记doc',
    link: 'https://blog.zhaoyifan.top',
    description: 'vitepress',
  },
  {
    title: 'bunny-ui',
    link: './bunny-ui/',
    description: 'vue2组件库',
  },
  {
    title: 'bunny-ui-next',
    link: './bunny-ui-next/',
    description: 'vue3组件库',
  },
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
        dataSource={projects}
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
