import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { type FC } from 'react'
import ComponentLib from './ComponentLib'
import Layers from './Layers'

const LeftPanel: FC = () => {
    const tabs = [
        {
            key: 'componentLib',
            label: (
                <span>
                    <AppstoreOutlined />
                    组件库
                </span>
            ),
            children: <ComponentLib />
        },
        {
            key: 'layers',
            label: (
                <span>
                    <BarsOutlined />
                    图层
                </span>
            ),
            children: <Layers />
        },
    ]
    return (
        <Tabs
            defaultActiveKey="1"
            items={tabs}
        />
    )
}

export default LeftPanel