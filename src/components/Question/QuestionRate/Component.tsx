import React, { type FC } from 'react'
import type { RatePropsType } from './interface'
import { defaultRateProps } from './interface'
import { Rate, Typography } from 'antd'

const { Title } = Typography

const Component: FC<RatePropsType> = (props) => {
  const { title, value, count, allowHalf, tooltips, disabled } = { ...defaultRateProps, ...props }
  return (
    <div>
      <Title level={4}>{title}</Title>
      <Rate
        value={value}
        count={count}
        allowHalf={allowHalf}
        tooltips={tooltips}
        disabled={disabled}
      />
      {value ? <span style={{ marginLeft: 8 }}>{tooltips?.[Math.ceil(value) - 1]}</span> : ''}
    </div>
  )
}

export default Component 