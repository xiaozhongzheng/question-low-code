import React, { useState, type FC } from 'react';
import QuestionCard from '@/components/QuestionCard';
import styles from './Common.module.scss';
import { Input, Empty } from 'antd';
import ListSeatch from '@/components/ListSeatch';
import { Spin } from 'antd';
import { useLoadingQuestionList } from '@/hooks/useLoadingQuestionList';
import ListPage from '@/components/ListPage';
const Star: FC = () => {
    const { data, loading } = useLoadingQuestionList({ isStar: true })
    const { list: questionList = [], total = 100 } = data || {}
    // const addQuestion = () => {
    //     const id = Math.random().toString().slice(-3)
    // }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>标星问卷</h2>
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
            {
                !loading && (
                    <>
                        <div className={styles.questionListBox}>
                            {
                                questionList.length === 0 && (
                                    <Empty description="暂无数据" />
                                )
                            }
                            {
                                questionList.length && questionList.map((item: any) => {
                                    return (
                                        <QuestionCard
                                            key={item.id}
                                            {...item}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className={styles.footer}>
                            <ListPage total={total} />
                        </div>
                    </>

                )
            }
        </div>
    )
}

export default Star;
