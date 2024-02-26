import styled from '@emotion/styled'
import { Button } from 'antd'
import React from 'react'

interface IProps {
  children: string
  disabled?: boolean
  onClick: () => void
  type?: 'submit' | 'button'
}

const Btn = styled(Button)`
  :where(.css-dev-only-do-not-override-1fviqcj).ant-btn-primary {
    background: #22998b !important;
    border-radius: 10px;
    padding: 12px 40px;
    height: auto;
    min-width: 221px;

    & span {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 30px;
      color: #ffffff;
    }
  }

  :where(.css-dev-only-do-not-override-1fviqcj).ant-btn-primary:disabled {
    cursor: not-allowed;
    background: #828282 !important;
    border-radius: 10px;
    padding: 12px 40px;
    height: auto;
    min-width: 221px;
  }
`

export const CustomButton: React.FC<IProps> = ({
  children,
  disabled = false,
  onClick,
  type = 'button',
}) => {
  return (
    <Btn htmlType={type} disabled={disabled} type="primary" onClick={onClick}>
      {children}
    </Btn>
  )
}
