import type { FC } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
const UserInfo:FC = () => {
  return (
    <>
        <Link to='/login'>
            登录
        </Link>
    </>
  )
}

export default UserInfo