import { useParams } from 'react-router-dom'
import { getQuestionApi } from "@/services/question";
import { useRequest } from "ahooks";
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