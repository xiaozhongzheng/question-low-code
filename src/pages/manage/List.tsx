import React, { useState, type FC } from 'react';
import QuestionCard from '@/components/QuestionCard';
import styles from './Common.module.scss';
import ListSeatch from '@/components/ListSeatch';
import {  Spin } from 'antd';
import { useLoadingQuestionList } from '@/hooks/useLoadingQuestionList';
// const defaultList = [
//     {
//         id: 'q1',
//         title: '问卷1',
//         isPublished: false,
//         isStar: false,
//         answerCount: 5,
//         createdAt: '3月10日 13:23'
//     },
//     {
//         id: 'q2',
//         title: '问卷2',
//         isPublished: true,
//         isStar: true,
//         answerCount: 15,
//         createdAt: '3月10日 13:23'
//     },
//     {
//         id: 'q3',
//         title: '问卷3',
//         isPublished: false,
//         isStar: false,
//         answerCount: 25,
//         createdAt: '3月10日 13:23'
//     },
// ]
const List: FC = () => {
    // const [questionList, setQuestionList] = useState(defaultList)
    // const { data = {}, loading } = useRequest(getQuestionListApi)
    const {data,loading} = useLoadingQuestionList()
    console.log(data, 'data')
    const { list: questionList = [], total = 100 } = data || {}
    // const addQuestion = () => {
    //     const id = Math.random().toString().slice(-3)
    // }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>我的问卷</h2>
                <ListSeatch />
            </div>
            {
                loading && (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Spin size="large" tip="Loading" >
                        </Spin>
                    </div>
                )
            }
            <div className={styles.questionListBox}>
                {
                    !loading && questionList?.map((item: any) => {
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

export default List;
