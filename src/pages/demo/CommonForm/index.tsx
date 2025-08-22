import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Col, DatePicker, Flex, Form, Input, Row, Select } from 'antd';
import type { Rule } from 'antd/es/form';
import zhCN from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import styles from './index.module.scss'
type FormItemType = 'input' | 'select' | 'date' | 'custom'
type OptionType = {
    label: string,
    value: string
}
export type FormFileld = {
    type: FormItemType, // 表单类型
    name: string, // 字段名
    placeholder?: string,
    label?: string,
    format?: string,
    isUseRule?: boolean,
    rules?: Rule[],
    style?: { [key: string]: any },
    className?: any,
    options?: OptionType[],
    customComponent?: React.ReactNode // 自定义组件
};
type PropsType = {
    fieldList: FormFileld[],
    initialValues?: any,
    defaultStyle?: any,
    onSubmit?: (values: any) => void,
    children?: React.ReactNode
}

const CommonForm: React.FC<PropsType> = (props: PropsType) => {
    const {
        fieldList = [],
        onSubmit,
        initialValues,
        children = null,
        defaultStyle = []
    } = props
    const [form] = Form.useForm()
    const onFinish: FormProps['onFinish'] = (values) => {
        console.log('Success:', values);
        Object.keys(values).forEach(key => {
            const value = values[key]
            if (dayjs.isDayjs(value)) {
                values[key] = value.format('YYYY-MM-DD')
            }
        })
        onSubmit?.(values)
    };
    const itemComponent = (item: FormFileld) => {
        const { type = '', options = [], placeholder = '', customComponent, style = {}, format = '',className = {} } = item
        const newStyle = { ...defaultStyle?.[1], ...style }
        if (type === 'input') {
            return <Input className={className} placeholder={placeholder} />
        }
        if (type === 'select') {
            return <Select style={{ ...newStyle }} options={options} placeholder={placeholder} />
        }
        if (type === 'date') {
            return <DatePicker format={format} style={{ ...newStyle }} locale={zhCN} />
        }

        return customComponent;
    }
    return (
        <Form
            form={form}
            name="commonForm"
            initialValues={initialValues}
            onFinish={onFinish}
            layout='vertical'
            className={styles.main}
        >
            <div className={styles.formItems}>
                {
                    fieldList.map((item, index) => {
                        const { name, label, rules = [], isUseRule = true, placeholder } = item
                        const newRules = [] as Rule[]
                        if (isUseRule) {
                            newRules.push({ required: true, message: placeholder || '请输入' })
                            newRules.push(...rules)
                        }
                        return (
                            <div className={styles.item}>
                                <div className={styles.label} style={{ ...defaultStyle?.[0] }}>{label}</div>
                                <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name={name}
                                    rules={newRules}
                                    colon={false} // 取消默认的冒号，因为我们自己在label中处理
                                >
                                    {itemComponent(item)}
                                </Form.Item>
                            </div>

                        )
                    })
                }
            </div>


            <Form.Item label={null} >
                <Flex justify='center' gap={30}>
                    {
                        children ? children : (
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        )
                    }
                    <Button type="default" onClick={() => {
                        form.resetFields()
                    }}>
                        重置
                    </Button>
                </Flex>

            </Form.Item>
        </Form>
    )
}

export default CommonForm;