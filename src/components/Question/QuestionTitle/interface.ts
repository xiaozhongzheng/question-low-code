
export type TitlePropsType = {
    text?: string,
    color?: string,
    level?: 1 | 2 | 3 | 4 | 5,
    isCenter?: boolean,
    onChange?: (newProps: TitlePropsType) => void
    disabled?: boolean
}

export const defaultProps: TitlePropsType = {
    text: '一行标题',
    color: 'black',
    level: 1,
    isCenter: false,
    disabled: false
}