import React, { type FC } from 'react'
import type { RadioPropsType } from './interface'
import { defaultRadioProps } from './interface'
import { Radio, Typography, Space } from 'antd'
const { Title } = Typography
const Component: FC<RadioPropsType> = (props: RadioPropsType) => {
    const { title, options = [], value, isVertical } = { ...defaultRadioProps, ...props }
    return (
        <div>
            <Title level={4}>{title}</Title>
            <Radio.Group
                value={value}
                style={{marginTop: '8px'}}
            >
                <Space wrap direction={isVertical ? 'vertical' : 'horizontal'}>
                    {options.filter(item => item.label).map(({ label, value }) => {
                        return <Radio key={value} value={value}>{label}</Radio>
                    })}
                </Space>
            </Radio.Group>
        </div >
    )
}

export default Component