import { useRequest } from "ahooks";
import { useSearchParams } from 'react-router-dom';
import { getQuestionListApi } from '@/services/question';
type OptType = {
    isStar?: boolean,
    isDeleted?: boolean
}
export const useLoadingQuestionList = (opt?: OptType) => {
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('keyword') as string
    const page = +(searchParams.get('page') || '') || 1
    const pageSize = +(searchParams.get('pageSize') || '') || 10
    //  console.log(searchParams,typeof searchParams,'searchParams')
    
    const getList = async () => {
        const res = await getQuestionListApi({
            page,
            pageSize,
            keyword,
            ...opt
        })
        return res;
    }
    const { data, error, loading } = useRequest(getList,{
        refreshDeps: [searchParams] // 刷新的依赖项
    });
    return {
        data,
        loading,
        error
    }
}