import React, { useEffect, type FC } from 'react'
import { type TitlePropsType } from './interface'
import { Checkbox, Form, Input, Radio } from 'antd'
const PropsComponent: FC<TitlePropsType> = (props: TitlePropsType) => {
    const { text, level, isCenter,onChange,disabled } = props
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({ ...props })
    }, [text, level, isCenter])
    const onValuesChange = (values: TitlePropsType) => {
        // console.log(values,'values')
        onChange?.(values)
    }
    return (
        <Form
            initialValues={{ text, level, isCenter }}
            layout="vertical"
            form={form}
            onValuesChange={onValuesChange}
            disabled={disabled}
        >
            <Form.Item
                label="标题内容"
                name="text"
                rules={[{ required: true, message: '请输入标题内容' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="层级"
                name="level"
            >
                <Radio.Group
                    options={[
                        { value: 1, label: '1' },
                        { value: 2, label: '2' },
                        { value: 3, label: '3' },
                    ]}
                />
            </Form.Item>
            <Form.Item
                name="isCenter"
                valuePropName='checked'
            >
                <Checkbox>居中显示</Checkbox>
            </Form.Item>
        </Form>
    )
}

export default PropsComponent