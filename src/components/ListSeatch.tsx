import React, { type FC, useState, useEffect } from 'react';
import { Input } from 'antd';
import type { GetProps } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const ListSeatch: FC = () => {
    const [value, setValue] = useState('')
    const nav = useNavigate()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()
    // console.log(searchParams,'searchParams')
    useEffect(() => {
        setValue(searchParams.get('keyword') || '')
    }, [])
    const onSearch: SearchProps['onSearch'] = (value: string) => {
        searchParams.set('page', '1')
        searchParams.set('pageSize', '10')
        nav({
            pathname,
            search: value ? `keyword=${value}` : ''
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