import { Layout } from 'antd'
import React from 'react'

interface IProps {
  children?: React.ReactNode
}

export const OnboardingLayout: React.FC<IProps> = ({ children }) => {
  return (
    <Layout
      style={{ minHeight: '100vh', width: '100%', backgroundColor: 'white' }}
    >
      {children}
    </Layout>
  )
}
