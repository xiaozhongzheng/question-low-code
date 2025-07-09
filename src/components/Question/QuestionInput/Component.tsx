import React, { type FC } from 'react'
import type { InputPropsType } from './interface'
import { defaultProps } from './interface'
import { Typography,Input } from 'antd';
const { Title } = Typography;
const Component: FC<InputPropsType> = (props: InputPropsType) => {
    const { placeholder, title } = { ...defaultProps, ...props }
    return (
        <div>
            <Title level={4}>{title}</Title>
            <div style={{marginTop: '12px'}}>
                <Input style={{fontSize: '16px'}} placeholder={placeholder}></Input>
            </div>
        </div>
    )
}

export default Component;
