import React, { type FC } from 'react'
import { type ParagraphPropsType } from './interface'
import { defaultParagraphProps } from './interface'
import { Typography } from 'antd'
const { Paragraph } = Typography
const Component: FC<ParagraphPropsType> = (props: ParagraphPropsType) => {
    const { text = '', isCenter } = { ...defaultParagraphProps, ...props }
    return (
        <Paragraph style={{ textAlign: isCenter ? 'center' : 'left' }}>
            {
                text.includes('\n') ? text.split('\n').map(item => {
                    return <span>{item}<br /></span>
                }) : text
            }
        </Paragraph>
    )
}

export default Component