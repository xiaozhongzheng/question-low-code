import Component from './Component';
import { defaultProps } from './interface';
import PropsComponent from './PropsComponent';
export * from './interface'

export default {
    title:'标题',
    type:'questionTitle',
    Component, // 画布组件
    PropsComponent, // 属性组件
    defaultProps
}