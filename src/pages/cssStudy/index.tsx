import { Tabs } from 'antd';
import Box from './box';

const { TabPane } = Tabs;
export const CssSTudy = () => {
  const tabs = [
    {
      name: 'css盒模型',
      key: 'box',
      component: <Box />
    }
  ];
  return (
    <Tabs defaultActiveKey="box" centered>
      {tabs.map((v) => (
        <TabPane tab={v.name} key={v.key}>
          {v.component}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default CssSTudy;
