import type { ComponentInfoType, QuestionAnswerSchema } from '@/components/Question'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { Table } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
const StatPage = () => {
    const { id = '' } = useParams<{ id: string }>();
    const answerList = JSON.parse(localStorage.getItem('answerList') || '[]') as QuestionAnswerSchema[]
    const { componentList } = useGetComponentInfo()
    if (answerList.length === 0) {
        return '暂无数据'
    }
    const dataSource = answerList.filter(item => item.questionId === id).map((item, index) => {
        const { answers, submitTime } = item
        return {
            key: index,
            ...answers,
            submitTime,

        }
    })
    console.log(dataSource, 'dataSource')

    const components = componentList.map(item => ({ fe_id: item.fe_id, title: item.props.title, options: item.props.options }))
    console.log(answerList, componentList, 'answerList')
    components.push({ fe_id: 'submitTime', title: '提交时间', options: [] })
    const columns = Object.keys(dataSource[0]).map(key => {
        const item = components.find(item => item.fe_id === key)
        const { title = '', options = [] } = item || {}
        return {
            key,
            dataIndex: key,
            title: title,
            render: (val: any) => {
                if (options.length === 0) {
                    return val
                }
                return [val].flat(2).map(v => {
                    return options.find(item => item.value === v)?.label
                }).join(',')

            }
        }
    })
    // columns.push({key: 'submitTime',dataIndex: 'submitTime',title: '提交时间'})
    return (
        <div className={styles.main}>
            <div className={styles.title}>答卷统计</div>
            <Table dataSource={dataSource} columns={columns} />
        </div>

    )
}

export default StatPage
