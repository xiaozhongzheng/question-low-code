import { useParams } from 'react-router-dom'
import { getQuestionApi } from "@/services/question";
import { useRequest } from "ahooks";
/**
 * 根据id查询单个问卷数据
 * @returns data 问卷对象、error 错误信息、loading 网络请求时的加载状态
 */

export const useLoadingQuestion = () => {
    const { id = '' } = useParams()
    const getQuestionById = async () => {
        const res = await getQuestionApi(id)
        return res;
    }
    const { data: question, error, loading } = useRequest(getQuestionById);
    return {
        question,
        loading,
        error
    }
}