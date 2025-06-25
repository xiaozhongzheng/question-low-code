import React, { type FC, useEffect, useState } from 'react'
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { useNavigate,useLocation,useSearchParams } from 'react-router-dom';
import { useUrlSearchParams } from '@/hooks/useUrlSearchParams';
type PropsType = {
    total: number
}
const ListPage: FC<PropsType> = (props: PropsType) => {
    const nav = useNavigate()
    const {pathname} = useLocation()
    const [searchParams] = useSearchParams()
    const {total} = props
    const urlSearch = useUrlSearchParams()
    const [current, setCurrent] = useState(urlSearch['page'])
    const [pageSize, setPageSize] = useState(urlSearch['pageSize'])
    // console.log(searchParams,current,pageSize,'**')
    console.log(current,pageSize,total,'total')
    useEffect(() => {
        setCurrent(urlSearch['page'])
        setPageSize(urlSearch['pageSize'])
    },[searchParams])
    const onChange: PaginationProps['onChange'] = (page,pageSize) => {
        console.log(page,pageSize,'page');
        searchParams.set('page',page.toString())
        searchParams.set('pageSize',pageSize.toString())
        setCurrent(page);
        setPageSize(pageSize)
        nav({
            pathname,
            search: searchParams.toString()
        })
    };

    return <Pagination current={current} showSizeChanger pageSize={pageSize} onChange={onChange} total={total} />;
}

export default ListPage