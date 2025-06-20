import React, { type FC } from 'react'
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

interface LoginForm {
  username: string
  password: string
}

const Login: FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = async (values: LoginForm) => {
    try {
      // TODO: 实现登录逻辑
      console.log('登录信息:', values)
      message.success('登录成功！')
      navigate('/manage/list')
    } catch (error) {
      message.error('登录失败，请重试')
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card
        title={
          <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
            用户登录
          </div>
        }
        style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      >
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 3, message: '密码至少3个字符' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            还没有账号？
            <Link to="/register" style={{ marginLeft: 8 }}>
              立即注册
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Login