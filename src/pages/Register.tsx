import React, { type FC } from 'react'
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined, UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import type { Rule } from 'antd/es/form'
import { useRequest } from 'ahooks'
import { registerApi } from '@/api/user'
interface RegisterForm {
  username: string
  password: string
  confirmPassword: string
  nickname: string
}

const Register: FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = async (values: RegisterForm) => {
    try {
      // TODO: 实现注册逻辑
      console.log('注册信息:', values)
      const { username, password, nickname } = values
      register(username, password, nickname)
    } catch (error) {
      message.error('注册失败，请重试')
    }
  }
  const { run: register } = useRequest(async (username, password, nickname) => {
    await registerApi(username, password, nickname)
  }, {
    manual: true,
    onSuccess: () => {
      message.success('注册成功！')
      navigate('/login')
    }
  })
  const validateConfirmPassword: Rule = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('两次输入的密码不一致'))
    },
  })

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
            用户注册
          </div>
        }
        style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      >
        <Form
          form={form}
          name="register"
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
            name="nickname"
            rules={[
              { required: true, message: '请输入昵称' },
              { min: 2, message: '昵称至少2个字符' }
            ]}
          >
            <Input
              prefix={<UserAddOutlined />}
              placeholder="昵称"
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

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              validateConfirmPassword
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="确认密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              注册
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            已有账号？
            <Link to="/login" style={{ marginLeft: 8 }}>
              立即登录
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Register