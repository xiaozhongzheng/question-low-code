import type { FC } from "react";
import QuestionInputConfig, { type InputPropsType } from "./QuestionInput";
import QuestionTitleConfig, { type TitlePropsType } from "./QuestionTitle";
import QuestionParagraphConfig,{type ParagraphPropsType} from "./QuestionParagraph";
import QuestionRadioConfig,{type RadioPropsType} from './QuestionRadio'
import QuestionCheckboxConfig,{type CheckboxPropsType} from "./QuestionCheckbox";
import QuestionRateConfig,{type RatePropsType} from "./QuestionRate";
export type ComponentsPropsType = 
    InputPropsType & TitlePropsType & ParagraphPropsType & RadioPropsType & CheckboxPropsType & RatePropsType

// 统一，组件的配置
export type ComponentConfigType = {
    title: string,
    type: string,
    Component: FC<ComponentsPropsType>, // 使用联合类型
    PropsComponent?: FC<ComponentsPropsType>,
    defaultProps: ComponentsPropsType
};

// 存放所有组件配置
export const componentConfigList: ComponentConfigType[] = [
    QuestionInputConfig,
    QuestionTitleConfig,
    QuestionParagraphConfig,
    QuestionRadioConfig,
    QuestionCheckboxConfig,
    QuestionRateConfig
];

// 根据类型获取组件的配置
export const getComponentConfigByType = (type: string) => {
    return componentConfigList.find(item => item.type === type)
}

// 组件分组配置
export const componentConfigGroup = [
    {
        groupName: '文本显示组',
        components: [
            QuestionTitleConfig,
            QuestionParagraphConfig
        ]
    },
    {
        groupName: '用户输入组',
        components: [
            QuestionInputConfig
        ]
    },
    {
        groupName: '用户选择组',
        components: [
            QuestionRadioConfig,
            QuestionCheckboxConfig
        ]
    },
    {
        groupName: '用户评分组',
        components: [
            QuestionRateConfig
        ]
    }
]
// 组件基本信息
export type ComponentInfoType = {
    fe_id: string,
    type: string,
    title: string,
    isHidden: boolean,
    isLock: boolean,
    props: ComponentsPropsType
}
// 问卷元数据
export interface QuestionMetadata  {
    title: string,
    isPublished?: boolean,
    isStar?: boolean,
    answerCount?: number,
    createdAt: Date,
    isDeleted?: boolean
 }

 // 问卷页面信息
 export interface QuestionPageInfo {
    title: string,
    desc?: string,
    js?: string,
    css?: string
 }

// 问卷 Schema
export interface QuestionSchema {
    id: string,
    metadata: QuestionMetadata, // 问卷基本信息
    componentList: ComponentInfoType[], // 问卷题目列表
    pageInfo: QuestionPageInfo // 问卷页面信息
 }

 interface Answer {
    [key: string]: any
 }

 // 答卷 Schema
 export interface QuestionAnswerSchema {
    questionId: string,
    answers: Answer[],
    submitTime: Date,
    userInfo?: {
        name?: string,
        email?: string,
        phone?: string
    }
 }