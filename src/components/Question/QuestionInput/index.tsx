import React, { type FC } from 'react'
import type { PropsType } from './interface'
import { defaultProps } from './interface'
import { Typography,Input } from 'antd';
const { Paragraph } = Typography;
const QuestionInput: FC<PropsType> = (props: PropsType) => {
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

export default QuestionInput;
