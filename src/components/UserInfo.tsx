import type { FC } from 'react'
// import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { getUserInfoApi } from '@/services/user'
// import { useRequest } from 'ahooks'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '../utils/storage/userToken'
import { useGetUserInfo } from '@/hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducers } from '@/store/userReducer'
import { removeUserInfo } from '@/utils/storage/userInfo'
const UserInfo: FC = () => {
  const nav = useNavigate()
  // const { data } = useRequest(getUserInfoApi)
  // console.log(data,'data')
  // const {nickname,username} = data || {}
  const dispatch = useDispatch()
  const {nickname,username} = useGetUserInfo()
  const logout = () => {
    dispatch(logoutReducers())
    message.success('退出成功')
    removeToken()
    removeUserInfo()
    nav('/login')
  }
  const UserInfo = (
    <>
      <span style={{ color: 'white' }}>
        <UserOutlined /> {nickname || username}
      </span>
      <Button type="link" onClick={logout}>退出登录</Button>
    </>
  )
  const Login = (
    <Link to='/login'>
      登录
    </Link>
  )
  return (
    <div style={{fontSize: '18px'}}>
      {username ? UserInfo : Login}
    </div>
  )
}

export default UserInfo