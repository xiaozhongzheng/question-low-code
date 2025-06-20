import React, { type FC, useState } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Divider, Flex, message } from 'antd';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveQuestionApi } from '@/services/question';
import { useRequest } from 'ahooks';
const ManageLayout: FC = () => {

  const nav = useNavigate()
  const { pathname } = useLocation()
  console.log(pathname, 'useLocation')
  // const handleSave = async () => {
  //   const { id = '' } = await saveQuestionApi()
  //   if (id) {
  //     message.success('新建成功~')
  //     nav({
  //       pathname: `/question/edit/${id}`
  //     })
  //   }
  // }
  const { loading, run:handleSave } = useRequest(saveQuestionApi, {
    manual: true,
    onSuccess: (res) => {
      message.success('新建成功~')
      nav({
        pathname: `/question/edit/${res.id || 10}`
      })
    },
  });
  return (
    <div className={styles.container1}>
      <div className={styles.left}>
        <Flex vertical gap="middle">
          <Button disabled={loading} type="primary" icon={<PlusOutlined />} size={'large'} onClick={handleSave}>
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