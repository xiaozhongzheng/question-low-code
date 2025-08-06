import Component from './Component'
import { defaultRateProps } from './interface'
import PropsComponent from './PropsComponent'
export * from './interface'

export default {
  title: '评分',
  type: 'questionRate',
  Component,
  defaultProps: defaultRateProps,
  PropsComponent,
} 