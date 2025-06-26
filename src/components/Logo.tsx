import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { Space, Typography, Flex } from 'antd'
const { Title } = Typography
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'
import { useGetUserInfo } from '@/hooks/useGetUserInfo'
const Logo: FC = () => {
    const {username = ''} = useGetUserInfo()
    const [name,setName] = useState('/login')
    console.log(username,'username')
    useEffect(() => {
        if(username){
            setName('/manage/list')
        }
    },[username])
    return (
        <div className={styles.container}>
            <Link to={name}>
                <Flex align='center' gap='middle' className={styles.logo} >
                    <FormOutlined />
                    <div>小穆问卷</div>
                </Flex>
            </Link>
        </div>
    )
}

export default Logo