import React from 'react'
import styles from './index.module.scss'
import CommonForm from './CommonForm'
import type { FormFileld } from './CommonForm'
import { Button, Input, Rate } from 'antd'
import dayjs from 'dayjs'
const validatorPassword = (_, value) => {
    if (!value) {
        return Promise.reject('请输入密码');
    }
    if (value.length < 8) {
        return Promise.reject('密码至少8位');
    }
    if (!/[A-Z]/.test(value)) {
        return Promise.reject('需包含大写字母');
    }
    return Promise.resolve();
}

const fieldList = [
    {
        type: 'input',
        name: 'name',
        label: '姓名',
        placeholder: '请输入姓名',
        style: {
            width: 500
        },
        className: styles.input
    },
    {
        type: 'select',
        name: 'like',
        label: '爱好',
        placeholder: '请选择爱好',
        options: [
            {
                label: '运动',
                value: 0
            },
            {
                label: '喝酒',
                value: 1
            },
        ],
        isUseRule: false,
    },
    {
        type: 'date',
        name: 'date',
        label: '日期',
        isUseRule: false,
        format: 'YYYY-MM-DD'
    },
    {
        type: 'custom',
        name: 'rate',
        label: '评分',
        placeholder: '请选择评分',
        customComponent: <Rate />
    },
    {
        type: 'custom',
        name: 'password',
        label: '密码',
        rules: [
            // {
            //     required: true,
            //     message: '请输入密码'
            // },
            {
                validator: validatorPassword
            }
        ],
        customComponent: <Input.Password />
    },
] as FormFileld[]



// const defaultValue = {
//     name: 'xxx',
//     like: 0,
//     date: dayjs('2023-02-01'),
//     // date: '2023-02-01',
//     rate: 3
// }
const defaultValue = {

}
// const defaultStyle = [
//     {
//         width: 80,
//         color: 'white',
//         fontWeight: 500,
//         fontSize: 16
//     },{
//         width: 300,
//         height: 60
//     }
// ]
const Demo = () => {
    console.log(dayjs('2020-02-03'))
    const onSubmit = (values: any) => {
        console.log(values, 'values')
    }
    return (
        <div className={styles.main}>
            <h1>封装通用表单</h1>
            <CommonForm fieldList={fieldList} defaultStyle={[]} initialValues={defaultValue} onSubmit={onSubmit} >
                <Button type="primary" htmlType="submit">
                    确定
                </Button>
            </CommonForm>
        </div>
    )
}

export default Demo