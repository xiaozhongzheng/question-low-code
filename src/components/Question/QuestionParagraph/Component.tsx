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
                text.includes('\n') ? text.split('\n').map((text,index) => {
                    return (
                        <span key={index}>
                            {
                                index > 0 && <br />
                            }
                            {text}
                        </span>
                    )
                }) : text
            }
        </Paragraph>
    )
}

export default Component