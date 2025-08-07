export type InputPropsType = {
    title?:string,
    placeholder?: string,
    onChange?: (newProps: InputPropsType) => void,
    disabled?: boolean,
    rules?: Array<{[key:string]: any}>
}

export const defaultProps: InputPropsType = {
    title: '输入框标题',
    placeholder: '请输入',
    disabled: false,
    rules: []
}