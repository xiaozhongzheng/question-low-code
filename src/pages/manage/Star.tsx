import React, { useState, type FC } from 'react';
import QuestionCard from '@/components/QuestionCard';
import styles from './Common.module.scss';
import { Input, Empty } from 'antd';
import type { GetProps } from 'antd';
type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const defaultList = [
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
const Star: FC = () => {
  const [questionList, setQuestionList] = useState(defaultList.filter(item => item.isStar))
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  // const addQuestion = () => {
  //     const id = Math.random().toString().slice(-3)
  // }
 
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>我的问卷</h2>
        <Search placeholder="请输入标题..." onSearch={onSearch} style={{ width: 300 }} />
      </div>
      <div className={styles.questionListBox}>
        {
          questionList.length === 0 && (
            <Empty description="暂无数据" />
          )
        }
        {
          questionList.length && questionList.map(item => {
            return (
              <QuestionCard
                key={item.id}
                {...item}
               />
            )
          })
        }
      </div>

      <div >底部区域</div>
    </div>
  )
}

export default Star;
