import React, { useState, type FC } from 'react'
import styles from './Common.module.scss';
import { Input, Empty, Table, Tag } from 'antd';
import type { GetProps } from 'antd';
type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
import QuestionCard from '@/components/QuestionCard';
const dataSource = [
  {
    id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '3月10日 13:23'
  },
  {
    id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 15,
    createdAt: '3月10日 13:23'
  },
  {
    id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 25,
    createdAt: '3月10日 13:23'
  },
]
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    key: 'isPublished',
    render: (isPublished: boolean) => isPublished ? (
      <Tag bordered={false} color="processing">
        已发布
      </Tag>
    ) : (
      <Tag bordered={false} color="error">
        未发布
      </Tag>
    )
  },
  {
    title: '答卷数',
    dataIndex: 'answerCount',
    key: 'answerCount',
  },
  {
    title: '答卷时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
]
const Trash: FC = () => {
  const [questionList, setQuestionList] = useState(dataSource)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>我的问卷</h2>
        <Search placeholder="请输入标题..." style={{ width: 300 }} />
      </div>
      <Table dataSource={dataSource} columns={columns} />

      <div >底部区域</div>
    </div>
  )
}
export default Trash