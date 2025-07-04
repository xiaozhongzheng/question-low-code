type OptionType = {
    label: string,
    value: string,
}
export type RadioPropsType = {
    title?: string,
    options?: OptionType[],
    value?: string,
    isVertical?: boolean,
    onChange?: (newProps: RadioPropsType) => void,
    disabled?: boolean 
}

export const defaultRadioProps: RadioPropsType = {
    title: '单选标题',
    options: [
        {label: '选项1',value: 'item1'},
        {label: '选项2',value: 'item2'},
        {label: '选项3',value: 'item3'},
    ],
    value: '',
    isVertical: false
}

