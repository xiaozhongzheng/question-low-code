import React, { useEffect, type FC } from 'react'
import { type TitlePropsType } from './interface'
import { Checkbox, ColorPicker, Form, Input, Radio } from 'antd'
const PropsComponent: FC<TitlePropsType> = (props: TitlePropsType) => {
    const { text, level, isCenter, color,onChange, disabled } = props
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({ text, level, isCenter,color })
    }, [text, level, isCenter])
    const onValuesChange = () => {
        const values = form.getFieldsValue()
        console.log(values,'values')
        onChange?.(values)
    }
    return (
        <Form
            initialValues={{ text, level, isCenter,color }}
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
                label="标题颜色"
                name="color"
                getValueFromEvent={(color) => color.toHexString()} // 将颜色的返回值转换成16进制的形式
            >
                <ColorPicker showText format='hex' />
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
                        { value: 4, label: '4' },
                        { value: 5, label: '5' },
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