export type ParagraphPropsType = {
    text?: string,
    isCenter?: boolean,
    onChange?: (newProps: ParagraphPropsType) => void,
    disabled?: boolean
}



export const defaultParagraphProps: ParagraphPropsType = {
    text: '一行段落',
    isCenter: false,
}