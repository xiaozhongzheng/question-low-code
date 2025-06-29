import React, { type FC } from 'react'
import type { InputPropsType } from './interface'
import { defaultProps } from './interface'
import { Typography,Input } from 'antd';
const { Paragraph } = Typography;
const Component: FC<InputPropsType> = (props: InputPropsType) => {
    const { placeholder, title } = { ...defaultProps, ...props }
    return (
        <div>
            <Paragraph strong>{title}</Paragraph>
            <div>
                <Input placeholder={placeholder}></Input>
            </div>
        </div>
    )
}

export default Component;
