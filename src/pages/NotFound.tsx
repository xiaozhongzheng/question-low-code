import React, { type FC } from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const NotFound: FC = () => {
  const nav = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你请求的资源不存在"
      extra={<Button type="primary" onClick={() => nav('/manage/list')}>返回首页</Button>}
    />
  )
}

export default NotFound