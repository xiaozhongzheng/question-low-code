
export type OptionType = {
    label: string;
    value: string;
    checked: boolean
}

export type CheckboxPropsType = {
    title?: string,
    checkedList?: boolean[];
    isVertical?: boolean;
    list?: OptionType[];
    disabled?: boolean;
    onChange?: (newProps: CheckboxPropsType) => void
}

export const defaultProps: CheckboxPropsType = {
    title: '多选标题',
    isVertical: false,
    list: [
        {
            label: '选项1',
            value: 'item1',
            checked: false,
        },
        {
            label: '选项2',
            value: 'item2',
            checked: false,
        },
        {
            label: '选项3',
            value: 'item3',
            checked: false,
        },
    ]
}