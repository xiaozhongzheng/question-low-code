import React, { useEffect, useState, type FC } from 'react';
import { Tabs } from 'antd';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import ComponentProps from './ComponentProps';
import PageSetting from './PageSetting';
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
enum KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting'
}
const RightPanel: FC = () => {
  const { selectedId } = useGetComponentInfo()
  const [key, setKey] = useState(KEYS.PROP_KEY)
  useEffect(() => {
    if (selectedId) {
      setKey(KEYS.PROP_KEY)
    } else {
      setKey(KEYS.SETTING_KEY)
    }
  }, [selectedId])
  const tabsItems = [
    {
      key: KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProps />
    },
    {
      key: KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ];

  return <Tabs activeKey={key} items={tabsItems}></Tabs>;
};

export default RightPanel;