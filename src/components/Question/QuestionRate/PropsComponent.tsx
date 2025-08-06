import React, { type FC } from 'react'
import type { RatePropsType } from './interface'
import { Form, Input, InputNumber, Checkbox } from 'antd'

const PropsComponent: FC<RatePropsType> = (props) => {
    const { title, value, count, allowHalf, tooltips = [], onChange, disabled } = props
    const [form] = Form.useForm()
   
    console.log(tooltips,'tooltips')

    // 监听表单变化
    const handleChange = () => {
        const newProps = form.getFieldsValue() as RatePropsType
        onChange?.(newProps)
    }

    return (
        <Form
            layout="vertical"
            initialValues={{ title, value, count, allowHalf, tooltips }}
            form={form}
            onValuesChange={handleChange}
            disabled={disabled}
        >
            <Form.Item label="标题" name="title">
                <Input />
            </Form.Item>
            <Form.Item label="星星数量" name="count">
                <InputNumber min={1} max={10} />
            </Form.Item>
            <Form.Item label="默认评分" name="value">
                <InputNumber min={0} max={count || 5} step={allowHalf ? 0.5 : 1} />
            </Form.Item>
            <Form.Item label="允许半星" name="allowHalf" valuePropName="checked">
                <Checkbox>允许半星评分</Checkbox>
            </Form.Item>
            <Form.Item label="提示文字（用英文逗号分隔）" name="tooltips">
                <Input
                    placeholder="如：很差,较差,一般,满意,非常满意"
                    onBlur={e => {
                        const val = e.target.value
                        form.setFieldsValue({ tooltips: val })
                        handleChange()
                    }}
                />
            </Form.Item>
        </Form>
    )
}

export default PropsComponent 