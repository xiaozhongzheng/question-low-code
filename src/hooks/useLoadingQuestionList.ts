import { useRequest } from "ahooks";
import { getQuestionListApi } from '@/services/question';
import { useUrlSearchParams } from "./useUrlSearchParams";
import { useSearchParams } from 'react-router-dom';

type OptType = {
    isStar?: boolean,
    isDeleted?: boolean
}
/**
 * 分页查询问卷列表
 * @param opt （isStar 是否查询标星的问卷，isDeleted 是否查询回收站的问卷）
 * @returns data 分页数据、refresh 再次发起网络请求、error 错误信息、loading 网络请求时的加载状态
 */
export const useLoadingQuestionList = (opt?: OptType) => {
    const [searchParams] = useSearchParams()
    const {keyword,page,pageSize} = useUrlSearchParams()
    const getList = async () => {
        const res = await getQuestionListApi({
            page,
            pageSize,
            keyword,
            ...opt
        })
        return res;
    }
    const { data, error, loading,refresh } = useRequest(getList,{
        refreshDeps: [searchParams] // 刷新的依赖项
    });
    return {
        data,
        loading,
        error,
        refresh
    }
}