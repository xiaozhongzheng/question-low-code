export type PropsType = {
    title?:string,
    placeholder?: string
}

export const defaultProps: PropsType = {
    title: '输入框标题',
    placeholder: '请输入...'
}