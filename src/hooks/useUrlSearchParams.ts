import React, { type FC } from 'react'
import { useSearchParams } from 'react-router-dom';
/**
 * 自定义获取url查询参数的hooks
 * @returns keyword 搜索的关键字、page 第几页、pageSize 页数
 */
export const useUrlSearchParams = () => {
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('keyword') || ''
    const page = +(searchParams.get('page') || '') || 1
    const pageSize = +(searchParams.get('pageSize') || '') || 5
    return {
        keyword,
        page,
        pageSize
    }
}

