import React, { useEffect, useState, type FC } from 'react'
import type { RadioPropsType } from './interface'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

const PropsComponent: FC<RadioPropsType> = (props: RadioPropsType) => {
    const { title, options = [], value, isVertical, onChange, disabled } = props
    const [form] = Form.useForm()
    const [labels, setLabels] = useState<string[]>([])
    const [validList,setValidList] = useState<boolean[]>([])
    useEffect(() => {
        form.setFieldsValue({ title, options, value, isVertical })
    }, [title, options, value, isVertical])
    useEffect(() => {
        setValidList(options.map(_ => true))
    },[])
    const handleChange = () => {
        const newProps = form.getFieldsValue() as RadioPropsType
        const { options = [] } = newProps || {}
        options.forEach((item) => {
            // 在使用Form.List中添加并输入数据后，value属性值为空，需要重新赋值
            if (!item.value) {
                item.value = nanoid()
                setValidList([...validList,true])
            }
        })
        setLabels(options.map(item => item.label))
        onChange?.(newProps)
    }

    return (
        <Form
            initialValues={{ title, options, value, isVertical }}
            layout='vertical'
            disabled={disabled}
            form={form}
            onValuesChange={handleChange}
        >
            <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="选项">
                <Form.List name="options">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((item, index) => {
                                const { key, name } = item
                                // console.log(item,'item')
                                return (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            name={[name, 'label']}
                                            rules={[
                                                { required: true, message: '请输入选项文字' },
                                                {
                                                    validator: ((_, value) => {
                                                        const aIndex = labels.findIndex(label => label === value)
                                                        if (aIndex > 0 && aIndex !== index) {
                                                            validList[index] = false
                                                            setValidList([...validList])
                                                            return Promise.reject('选项文字不能重复')
                                                        }
                                                        validList[index] = true
                                                        setValidList([...validList])
                                                        return Promise.resolve()
                                                    })
                                                }
                                            ]}
                                        >
                                            <Input placeholder="请输入选项文字" />
                                        </Form.Item>
                                        {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
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

            <Form.Item label="默认选中" name="value">
                {/* 只展示合法的选项 */}
                <Select placeholder='请选择' options={options?.filter((item,index) => item.label && validList[index])}></Select>
            </Form.Item>
            <Form.Item name="isVertical" valuePropName='checked'>
                <Checkbox>竖向排列</Checkbox>
            </Form.Item>
        </Form >
    )
}

export default PropsComponent