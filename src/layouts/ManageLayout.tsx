import React, { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Divider, Flex } from 'antd';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  console.log(pathname, 'useLocation')
  return (
    <div className={styles.container1}>
      <div className={styles.left}>
        <Flex vertical gap="middle">
          <Button type="primary" icon={<PlusOutlined />} size={'large'}>
            新建问卷
          </Button>
          <Divider style={{ borderTop: 'none' }} />
          <Button
            onClick={() => nav('/manage/list')}
            type={`${pathname.startsWith('/manage/list') ? 'default' : 'text'}`}
            icon={<BarsOutlined />}
            size={'large'}>
            我的问卷
          </Button>
          <Button
            onClick={() => nav('/manage/star')}
            type={`${pathname.startsWith('/manage/star') ? 'default' : 'text'}`}
            icon={<StarOutlined />}
            size={'large'}>
            星标问卷
          </Button>
          <Button
            onClick={() => nav('/manage/trash')}
            type={`${pathname.startsWith('/manage/trash') ? 'default' : 'text'}`}
            icon={<DeleteOutlined />}
            size={'large'}>
            回收站
          </Button>
        </Flex>

      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout;