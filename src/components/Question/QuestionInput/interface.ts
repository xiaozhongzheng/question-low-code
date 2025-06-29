export type InputPropsType = {
    title?:string,
    placeholder?: string
}

export const defaultProps: InputPropsType = {
    title: '输入框标题',
    placeholder: '请输入...'
}