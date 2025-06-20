import React, { type FC, useState } from 'react'
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { useNavigate,useLocation,useSearchParams } from 'react-router-dom';
type PropsType = {
    total: number
}
const ListPage: FC<PropsType> = (props: PropsType) => {
    const nav = useNavigate()
    const {pathname} = useLocation()
    const [searchParams] = useSearchParams()
    const {total} = props

    const [current, setCurrent] = useState(+(searchParams.get('page') || '') || 1)
    const [pageSize, setPageSize] = useState(+(searchParams.get('pageSize') || '') || 10)
    console.log(searchParams,current,pageSize,'**')
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

    return <Pagination current={current} pageSize={pageSize} onChange={onChange} total={total} />;
}

export default ListPage