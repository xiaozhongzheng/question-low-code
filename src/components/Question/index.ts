import type { FC } from "react";
import QuestionInputConfig, { type InputPropsType } from "./QuestionInput";
import QuestionTitleConfig, { type TitlePropsType } from "./QuestionTitle";
import QuestionParagraphConfig,{type ParagraphPropsType} from "./QuestionParagraph";
import QuestionRadioConfig,{type RadioPropsType} from './QuestionRadio'
import QuestionCheckboxConfig,{type CheckboxPropsType} from "./QuestionCheckbox";
export type ComponentsPropsType = 
    InputPropsType & TitlePropsType & ParagraphPropsType & RadioPropsType & CheckboxPropsType

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
    QuestionCheckboxConfig
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
    }
]