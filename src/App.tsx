import { Card, List } from 'antd';
import './App.css';

const data = [
  {
    title: '笔记doc',
    link: 'https://blog.zhaoyifan.top',
    description: 'vitepress',
  },
  {
    title: '移动端点餐',
    link: './take-out-platform/',
    description: 'vue3+vuex',
  },
  // {
  //   title: 'bunny-ui',
  //   link: './bunny-ui/',
  //   description: 'vue2组件库',
  // },
  {
    title: 'bunny-ui-next',
    link: './bunny-ui-next/',
    description: 'vue3组件库',
  },
  {
    title: 'jira管理',
    link: './jira/',
    description: 'react17',
  },
  {
    title: '学习总结代码',
    link: './study/',
    description: '总结小栗子',
  },
  {
    title: 'netlify serverless',
    link: 'https://determined-benz-6b3316.netlify.app/',
    description: 'netlify serverless react17项目',
  },
];

function App() {
  return (
    <div className="App">
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <a href={item.link} target={'_blank'} rel="noreferrer">
              <Card hoverable title={item.title}>
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
