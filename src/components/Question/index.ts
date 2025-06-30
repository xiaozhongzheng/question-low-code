import type { FC } from "react";
import QuestionInputConfig, { type InputPropsType } from "./QuestionInput";
import QuestionTitleConfig, { type TitlePropsType } from "./QuestionTitle";



export type ComponentsPropsType = InputPropsType | TitlePropsType

// 统一，组件的配置

export type ComponentConfigType = {
    title: string,
    type: string,
    Component: FC<ComponentsPropsType>, // 使用联合类型
    PropsComponent: FC<ComponentsPropsType>,
    defaultProps: ComponentsPropsType
};
// 存放所有组件配置
export const componentConfigList: ComponentConfigType[] = [
    QuestionInputConfig,
    QuestionTitleConfig
];

export const getComponentConfigByType = (type: string) => {
    return componentConfigList.find(item => item.type === type)
}

export const componentConfigGroup = [
    {
        groupName: '文本显示',
        components: [
            QuestionTitleConfig
        ]
    },
    {
        groupName: '用户输入',
        components: [
            QuestionInputConfig
        ]
    }
]