import React, { useEffect, type FC } from 'react'
import { type InputPropsType } from './interface'
import { Form, Input } from 'antd'
const PropsComponent: FC<InputPropsType> = (props: InputPropsType) => {
    const { title, placeholder,onChange,disabled } = props
    console.log(props,'props')
    const [form] = Form.useForm()
    useEffect(()=>{
        form.setFieldsValue({...props})
    },[title,placeholder])
    const onValuesChange = (values: InputPropsType) => {
        // console.log(values,'values')
        onChange?.(values)
    }
    return (
        <Form
            initialValues={{ title, placeholder}}
            layout="vertical"
            form={form}
            onValuesChange={onValuesChange}
            disabled={disabled}
        >
            <Form.Item
                label="标题"
                name="title"
                rules={[{ required: true, message: '请输入标题' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Placeholder"
                name="placeholder"
            >
                <Input />
            </Form.Item>
            
        </Form>
    )
}

export default PropsComponent