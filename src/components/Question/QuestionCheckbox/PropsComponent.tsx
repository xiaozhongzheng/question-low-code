import React, { type FC } from 'react'
import type { CheckboxPropsType } from './interface'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const PropsComponent: FC<CheckboxPropsType> = (props: CheckboxPropsType) => {
    const { title, isVertical = false, list = [], disabled = false, onChange, checkedList } = props
    const [form] = Form.useForm()
    const handleChange = () => {
        const props = form.getFieldsValue()
        console.log(props, '===props')
        onChange?.(props)
    }
    return (
        <Form
            initialValues={{ title, list, checkedList, isVertical }}
            layout='vertical'
            disabled={disabled}
            form={form}
            onValuesChange={handleChange}
        >
            <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="选项">
                <Form.List name="list">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((item, index) => {
                                const { key, name } = item
                                // console.log(item,'item')
                                return (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item name={[name, 'checked']} valuePropName='checked'>
                                            <Checkbox></Checkbox>
                                        </Form.Item>
                                        <Form.Item
                                            name={[name, 'label']}
                                            rules={[
                                                { required: true, message: '请输入选项文字' },
                                                {
                                                    validator: ((_, value) => {
                                                        const aIndex = list.findIndex(item => item.label === value)
                                                        if (aIndex > 0 && aIndex !== index) {
                                                            return Promise.reject('选项文字不能重复')
                                                        }
                                                        return Promise.resolve()
                                                    })
                                                }
                                            ]}
                                        >
                                            <Input placeholder="请输入选项文字" />
                                        </Form.Item>
                                        {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                                    </Space>
                                )
                            })}
                            <Form.Item>
                                <Button type="link" onClick={() => add({
                                    label: '',
                                    value: ''
                                })} block icon={<PlusOutlined />}>添加选项
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>


            <Form.Item name="isVertical" valuePropName='checked'>
                <Checkbox>竖向排列</Checkbox>
            </Form.Item>
        </Form >
    )
}

export default PropsComponent