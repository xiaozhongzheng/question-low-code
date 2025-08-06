import { getQuestionApi } from "@/api/question";
import { useRequest } from "ahooks";
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { initData, setComponents, setSelectedId } from '@/store/componentsReducer';
import { setPageInfo } from '@/store/pageInfoReducer';
import type { QuestionSchema } from "@/components/Question";
import { useParams } from "react-router-dom";
/**
 * 根据id查询单个问卷数据
 * @returns data 问卷对象、error 错误信息、loading 网络请求时的加载状态
 */


export const useLoadingQuestion = () => {
    const { id = '' } = useParams()
    const dispatch = useDispatch()
    // const getQuestionById = async (id: string) => {
    //     const res = await getQuestionApi(id)
    //     return res;
    // }
    // const { data: question, error, loading, run } = useRequest((id) => getQuestionById(id), {
    //     manual: true
    // });
    const [question, setQuestion] = useState<QuestionSchema>()
    const [loading, setLoading] = useState(false)
    const questionList = JSON.parse(localStorage.getItem('questionList') || '[]') as QuestionSchema[]

    const getData = (id: string) => {
        const item = questionList.find(item => item.id === id)
        setLoading(true)

        setTimeout(() => {
            setQuestion(item)
            setLoading(false)
        }, 1000)
    }
    useEffect(() => {
        if (!question) return
        const { componentList = [], pageInfo = {} } = question
        let selectedId = ''
        if (componentList.length) {
            selectedId = componentList[0].fe_id
        }
        dispatch(initData({ componentList, selectedId }))
        dispatch(setPageInfo(pageInfo))
        // dispatch(recordSnapshot())
    }, [question])
    useEffect(() => {
        if (!id) {
            // 新建
            dispatch(setPageInfo({ title: '问卷标题' }))
            return
        }

        getData(id)
    }, [id])
    return {
        question,
        loading,
        // error
    }
}