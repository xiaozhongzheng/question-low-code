import React, { type FC } from 'react'
import type { RadioPropsType } from './interface'
import { defaultRadioProps } from './interface'
import { Radio, Typography, Space } from 'antd'
const { Title } = Typography
const Component: FC<RadioPropsType> = (props: RadioPropsType) => {
    const { title, options = [], value, isVertical } = { ...defaultRadioProps, ...props }
    return (
        <div>
            <Title level={3}>{title}</Title>
            <Space direction={isVertical ? 'vertical' : 'horizontal'}>
                <Radio.Group
                    value={value}
                    options={options}
                />
            </Space>

        </div>
    )
}

export default Component