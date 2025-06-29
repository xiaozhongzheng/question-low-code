import type { FC } from "react";
import QuestionInputConfig, { type InputPropsType } from "./QuestionInput";
import QuestionTitleConfig, { type TitlePropsType } from "./QuestionTitle";



export type ComponentsPropsType = InputPropsType | TitlePropsType

// 统一，组件的配置

export type ComponentConfigType = {
    title: string;
    type: string;
    Component: FC<ComponentsPropsType>; // 使用联合类型
    defaultProps: ComponentsPropsType;
};

// 现在可以混合存放
export const componentConfigList: ComponentConfigType[] = [
    QuestionInputConfig, 
    QuestionTitleConfig  
];

export const getComponentConfigByType = (type: string) => {
    return componentConfigList.find(item => item.type === type)
}