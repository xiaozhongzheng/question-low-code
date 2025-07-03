export type InputPropsType = {
    title?:string,
    placeholder?: string,
    onChange?: (newProps: InputPropsType) => void,
    disabled?: boolean
}

export const defaultProps: InputPropsType = {
    title: '输入框标题',
    placeholder: '请输入',
    disabled: false
}