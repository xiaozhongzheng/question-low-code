import React, { type FC } from 'react'
import type { TitlePropsType } from './interface';
import { defaultProps } from './interface';
import { Typography } from 'antd';
const { Title } = Typography;
const fontSizes = [14, 26, 22, 20, 18, 16]
const Component: FC<TitlePropsType> = (props: TitlePropsType) => {
    const { text = '', level = 1, isCenter = false,color } = { ...defaultProps, ...props };
    return (
        <Title
            level={level}
            style={
                {
                    textAlign: isCenter ? 'center' : 'start',
                    fontSize: fontSizes[level] + 'px',
                    color
                }
            }>{text}</Title>
    )
}

export default Component;