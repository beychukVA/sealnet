import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography

interface IProps {
  children: string
}

export const SectionTitle: React.FC<IProps> = ({ children }) => {
  return (
    <Title
      style={{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '40px',
        lineHeight: '60px',
        color: '#FFFFFF',
        margin: 0,
      }}
    >
      {children}
    </Title>
  )
}
