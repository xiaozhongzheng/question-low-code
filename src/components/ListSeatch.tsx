import React, { type FC, useState, useEffect } from 'react';
import { Input } from 'antd';
import type { GetProps } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useUrlSearchParams } from '@/hooks/useUrlSearchParams';
type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const ListSeatch: FC = () => {
    const [value, setValue] = useState('')
    const nav = useNavigate()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()
    // console.log(searchParams,'searchParams')
    const {keyword} = useUrlSearchParams()
    useEffect(() => {
        setValue(keyword)
    }, [])
    const onSearch: SearchProps['onSearch'] = (value: string) => {
        searchParams.set('page', '1')
        searchParams.set('pageSize', '5')
        if(value){
            searchParams.set('keyword',value)
        }
        nav({
            pathname,
            search: searchParams.toString()
        })

    }
    return (
        <Search
            allowClear
            placeholder="请输入关键词"
            onSearch={onSearch}
            style={{ width: 300 }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

export default ListSeatch