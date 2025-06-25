import React, { useState, useEffect, useRef, type FC } from 'react';
import QuestionCard from '@/components/QuestionCard';
import styles from './Common.module.scss';
import ListSeatch from '@/components/ListSeatch';
import { Empty, Spin } from 'antd';
// import { useLoadingQuestionList } from '@/hooks/useLoadingQuestionList';
import { useSearchParams } from 'react-router-dom';
import { useDebounceFn, useRequest } from 'ahooks';
import { getQuestionListApi } from '@/services/question';
import MyLoading from '@/components/MyLoading';
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
    const bottomRef = useRef<HTMLDivElement>(null)
    const [questionList, setQuestionList] = useState<any[]>([])
    const [searchParams] = useSearchParams()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [isBottom,setIsBottom] = useState(false) // 是否触底

    const getData = async () => {
        return await getQuestionListApi({
            page,
            pageSize: 5,
            keyword: searchParams.get('keyword') || ''
        })
    }
    // const { loading = true, run: loadData } = useRequest(getData, {
    //     manual: true,
    //     onSuccess: (res) => {
    //         const { list = [], total } = res
    //         setQuestionList([...questionList, ...list])
    //         setPage(page + 1)
    //         setTotal(total)
    //     },
    // });
    const loadData = async () => {
        setLoading(true)
        const { list = [], total } = await getData()
        setQuestionList([...questionList, ...list])
        setPage(page + 1)
        setTotal(total)
        setLoading(false)
    }
    const { run: loadMoreData } = useDebounceFn(
        // 使用防抖来处理滚动事件，即在滚动条停止后0.5s执行里面的代码
        () => {
            if (questionList.length < total || questionList.length === 0) {
                const ele = bottomRef.current // 底部dom元素
                if (ele == null) return
                const domRect = ele.getBoundingClientRect()
                if (domRect == null) return
                const { bottom } = domRect // 获取该元素到页面顶部的距离
                console.log(bottom, document.documentElement.clientHeight, 'height')
                const docHeight = document.documentElement.clientHeight // 获取html的高度，固定不变
                if (bottom <= docHeight) {
                    loadData()
                    setIsBottom(true)
                    console.log('加载更多数据...')
                }
            }
        },
        {
            wait: 500,
        },
    );
    const handleLoadStatus = () => {
        if (loading && questionList.length === 0) return <MyLoading />
        if (questionList.length === 0) return <Empty description="暂无数据" />
        if(!isBottom) return <div style={{color: 'green'}}>下划加载更多数据吧~</div>

        if (questionList.length >= total) return <div style={{color: 'green'}}>没有更多数据了~~~</div>
        return <div style={{color: 'blue'}}>正在加载更多数据...</div>
    }
    useEffect(() => {
        loadData() // 初始化数据
    }, [searchParams])
    useEffect(() => {
        window.addEventListener('scroll', loadMoreData)
        return () => {
            window.removeEventListener('scroll', loadMoreData)
        }
    }, [searchParams])
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>我的问卷</h2>
                <ListSeatch />
            </div>

            <div className={styles.questionListBox}>
                {
                    !!questionList.length && questionList?.map((item: any) => {
                        return (
                            <QuestionCard
                                key={item.id}
                                {...item}
                            />
                        )
                    })
                }
            </div>

            <div ref={bottomRef} className={styles.footer}>
                {handleLoadStatus()}
            </div>
        </div>
    )
}

export default List;
