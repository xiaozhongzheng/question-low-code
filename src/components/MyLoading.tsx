import React, { type FC } from 'react'
import { Spin } from 'antd'
type PropsType = {
    title?: string,
    style?: React.CSSProperties
}
const MyLoading: FC<PropsType> = (props: PropsType) => {
    const { title = '数据加载中...', style = {} } = props
    const defaultStyle:React.CSSProperties = {
        textAlign: 'center',
        margin: '20px 0 20px 0'
    }
    return (
        <div style={{...defaultStyle,...style}}>
            <Spin size="large">
            </Spin>
            <div style={{ marginTop: '20px', color: 'blue' }}>{title}</div>
        </div>
    )
}

export default MyLoading