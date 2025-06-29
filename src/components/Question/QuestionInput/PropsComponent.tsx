import React, { useEffect, type FC } from 'react'
import { type InputPropsType } from './interface'
import { Form, Input } from 'antd'
const PropsComponent: FC<InputPropsType> = (Props: InputPropsType) => {
    const { title, placeholder } = Props
    const [form] = Form.useForm()
    useEffect(()=>{
        form.setFieldsValue({title,placeholder})
    },[title,placeholder])
    return (
        <Form
            initialValues={{ title, placeholder}}
            layout="vertical"
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
                <Input.Password />
            </Form.Item>
            
        </Form>
    )
}

export default PropsComponent