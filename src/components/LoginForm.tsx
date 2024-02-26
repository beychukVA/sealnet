import { Form, Input } from 'antd'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Login } from '../pages/api/User/User'
import { IOnboardingMenu } from '../pages/onboarding'
import { getToken } from '../utils/LocalStorage'
import { CustomButton } from './common/CustomButton'

interface IProps {
  menu: IOnboardingMenu
  handleChangeMenu: (itemMenu: string) => void
}

export const LoginForm: React.FC<IProps> = ({ menu, handleChangeMenu }) => {
  const router = useRouter()
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleLogin = async () => {
    await Login(values.email, values.password)
    const token = getToken()
    if (token) router.push('/')
  }

  const handleChange =
    (prop: string) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setValues({ ...values, [prop]: event.target.value })
    }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: '100%', maxWidth: 350 }}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input value={values.email} onChange={handleChange('email')} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            value={values.password}
            onChange={handleChange('password')}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <CustomButton type="submit" onClick={handleLogin}>
            Login
          </CustomButton>
        </Form.Item>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <span>Don&apos;t have an account?</span>
          <span
            style={{
              marginLeft: '20px',
              cursor: 'pointer',
              color: '#22998b',
              fontSize: '16px',
            }}
            onClick={() => handleChangeMenu(menu.MENU_REGISTRATION)}
          >
            Sign up
          </span>
        </div>
      </Form>
    </div>
  )
}
