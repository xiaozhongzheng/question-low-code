import React, { type FC } from 'react'
import type { TitlePropsType } from './interface';
import { defaultProps } from './interface';
import { Typography } from 'antd';
const { Title } = Typography;
const fontSizes = [14, 26, 22, 20, 18, 16]
const QuestionTitle: FC<TitlePropsType> = (props: TitlePropsType) => {
    const { text = '', level = 1, isCenter = false } = { ...defaultProps, ...props };
    return (
        <Title
            level={level}
            style={
                {
                    textAlign: isCenter ? 'center' : 'start',
                    fontSize: fontSizes[level] + 'px'
                }
            }>{text}</Title>
    )
}

export default QuestionTitle;