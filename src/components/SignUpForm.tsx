import { Form, Input } from 'antd'
import React, { useState } from 'react'
import { Register } from '../pages/api/User/User'
import { IOnboardingMenu } from '../pages/onboarding'
import { showError } from '../utils/showError'
import { CustomButton } from './common/CustomButton'

interface IProps {
  menu: IOnboardingMenu
  handleChangeMenu: (itemMenu: string) => void
}

export const SignUpForm: React.FC<IProps> = ({ menu, handleChangeMenu }) => {
  const [values, setValues] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange =
    (prop: string) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleSignIn = async () => {
    await Register(values?.email, values?.username, values?.password)
      .then((res) => {
        console.log('EVT: registration', res)
      })
      .catch((error) => showError(error))
  }

  const onFinish = () => handleSignIn()

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
        style={{ width: '100%', maxWidth: 400 }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input value={values.email} onChange={handleChange('email')} />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input value={values.username} onChange={handleChange('username')} />
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

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                )
              },
            }),
          ]}
        >
          <Input.Password
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <CustomButton type="submit" onClick={() => {}}>
            Registration
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
          <span>Do you have an account?</span>
          <span
            style={{
              marginLeft: '20px',
              cursor: 'pointer',
              color: '#22998b',
              fontSize: '16px',
            }}
            onClick={() => handleChangeMenu(menu.MENU_LOGIN)}
          >
            Sign in
          </span>
        </div>
      </Form>
    </div>
  )
}
