import React, { type FC } from 'react'
import { Spin } from 'antd'
const MyLoading: FC = () => {
    return (
        <div style={{ textAlign: 'center', margin: '20px 0 20px 0' }}>
            <Spin size="large">
            </Spin>
            <div style={{marginTop: '20px',color: 'blue'}}>数据加载中...</div>
        </div>
    )
}

export default MyLoading