import React, { useEffect, type FC } from 'react'
import { type ParagraphPropsType } from './interface'
import { Checkbox, Form,Input } from 'antd'
const {TextArea} = Input
const PropsComponent: FC<ParagraphPropsType> = (props: ParagraphPropsType) => {
    const {text,isCenter,onChange,disabled} = props
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({text,isCenter})
    },[text,isCenter])
    const handleChange = (values: ParagraphPropsType) => {
        onChange?.(values)
    }
    return (
        <Form
            name="paragraph"
            layout='vertical'
            initialValues={props}
            onValuesChange={handleChange}
            disabled={disabled}
            form={form}
        >
            <Form.Item
                label="段落内容"
                name="text"
                rules={[{ required: true, message: '请输入段落内容' }]}
            >
                <TextArea />
            </Form.Item>

 

            <Form.Item name="isCenter" valuePropName="checked">
                <Checkbox>居中显示</Checkbox>
            </Form.Item>

        </Form>
    )
}

export default PropsComponent