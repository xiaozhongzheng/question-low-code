import React, { type FC } from 'react'
import { defaultProps, type CheckboxPropsType } from './interface'
import { Checkbox, Space, Typography } from 'antd'
const { Title } = Typography
const Component: FC<CheckboxPropsType> = (props: CheckboxPropsType) => {
    const { title = '', options = [], isVertical = false } = { ...defaultProps, ...props }
    return (
        <>
            <Title level={4}>{title}</Title>
            <Space wrap direction={isVertical ? 'vertical' : 'horizontal'}>
                {
                    options.map((item) => {
                        const { label, value, checked } = item
                        return (
                            <Checkbox checked={checked} key={value}>{label}</Checkbox>
                        )
                    })
                }
            </Space>

        </>
    )
}

export default Component