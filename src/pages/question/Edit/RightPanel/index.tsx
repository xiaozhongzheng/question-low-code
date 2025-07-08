import React, { useEffect, useMemo, useState, type FC } from 'react';
import { Tabs } from 'antd';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import ComponentProps from './ComponentProps';
import PageSetting from './PageSetting';
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
import { useGetPageInfo } from '@/hooks/useGetPageInfo';
enum KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting'
}
const RightPanel: FC = () => {
  const { selectedId } = useGetComponentInfo()
  const {pageInfo} = useGetPageInfo()
  const [key, setKey] = useState(KEYS.PROP_KEY)
  useEffect(() => {
    if (selectedId) {
      setKey(KEYS.PROP_KEY)
    } else {
      setKey(KEYS.SETTING_KEY)
    }
  }, [selectedId])
  const cachedSettingOutlined = useMemo(() => {
    // 使用缓存，优化：每次selectedId变化时，重复渲染PageSetting组件
    return (<PageSetting />)
  },[pageInfo])
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
      children: cachedSettingOutlined,
    },
  ];

  return <Tabs activeKey={key} items={tabsItems}></Tabs>;
};

export default RightPanel;