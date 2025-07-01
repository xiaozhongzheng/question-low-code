import React, { type FC } from 'react'
import styles from './index.module.scss'
import { Space, Button, Typography, Flex } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const { Title } = Typography
const EditHeader: FC = () => {
    const nav = useNavigate()
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Flex align="center">
                        <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>返回</Button>
                        <Title level={3}>问卷标题</Title>
                    </Flex>
                </div>
                <div className={styles.middle}>
                    中间
                </div>
                <div className={styles.right}>
                    <Space>
                        <Button>保存</Button>
                        <Button type="primary">发布</Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default EditHeader