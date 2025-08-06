export type RatePropsType = {
  title?: string
  value?: number
  count?: number
  allowHalf?: boolean
  tooltips?: string[]
  onChange?: (newProps: RatePropsType) => void
  disabled?: boolean
}

export const defaultRateProps: RatePropsType = {
  title: '评分',
  value: 0,
  count: 5,
  allowHalf: false,
  tooltips: ['很差', '较差', '一般', '满意', '非常满意'],
  disabled: false,
} 