import { useParams } from 'react-router-dom'
import { getQuestionApi } from "@/services/question";
import { useRequest } from "ahooks";
import { useEffect } from 'react';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { setComponents,setSelectedId } from '@/store/componentsReducer';
import { setPageInfo } from '@/store/pageInfoReducer';
/**
 * 根据id查询单个问卷数据
 * @returns data 问卷对象、error 错误信息、loading 网络请求时的加载状态
 */


export const useLoadingQuestion = () => {
    const { id = '' } = useParams()
    const dispatch = useDispatch()
    const getQuestionById = async (id: string) => {
        const res = await getQuestionApi(id)
        return res;
    }
    const { data: question, error, loading, run } = useRequest((id) => getQuestionById(id),{
        manual: true
    });
    useEffect(() => {
        if(!question) return
        const {title = '',componentList = [],pageInfo = {}} = question 
        let selectedId = ''
        if(componentList.length){
            selectedId = componentList[0].fe_id
        }
        dispatch(setComponents(componentList))
        dispatch(setSelectedId(selectedId))
        dispatch(setPageInfo(pageInfo))
    },[question])
    useEffect(() => {
        if(!id) return message.error('没有问卷 id')
        run(id)
    },[id])
    return {
        question,
        loading,
        error
    }
}