import type { FC } from 'react'
import React from 'react'
import { Space, Typography, Flex } from 'antd'
const { Title } = Typography
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'
const Logo: FC = () => {
    return (
        <div className={styles.container}>
            <Link to="/">
                <Flex align='center' gap='middle' className={styles.logo} >
                    <FormOutlined />
                    <div>小穆问卷</div>
                </Flex>
            </Link>
        </div>
    )
}

export default Logo