import Component from "./Component";
import { defaultParagraphProps } from "./interface";
export * from './interface'
import PropsComponent from "./PropsComponent";

export default {
    title: '段落文本',
    type: 'questionParagraph',
    Component,
    PropsComponent,
    defaultProps: defaultParagraphProps
}
