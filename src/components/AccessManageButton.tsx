import { FormOutlined, PlusOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import { Button } from 'antd'
import React from 'react'
import { UserAccess } from '../pages/api/Access/Access'
import { Observation } from '../types/Observation'
import { AccessManageModal } from './AccessManageModal'

interface IProps {
  observation: Observation | undefined
  variant: 'add' | 'edit'
  user?: UserAccess
}

const CustomControlButton = styled(Button)`
  :where(.css-dev-only-do-not-override-1fviqcj).ant-btn {
    height: 20px;
    width: 20px;
    padding: 0;
    border: none;
  }

  :where(.css-dev-only-do-not-override-1fviqcj).ant-btn-default:not(
      :disabled
    ):hover {
    color: #22998b;
  }

  :where(.css-dev-only-do-not-override-1fviqcj).ant-btn-default {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  :where(.css-dev-only-do-not-override-1fviqcj).ant-btn.ant-btn-icon-only
    > span {
    height: 20px;
    width: 20px;
    transform: none;
  }

  :where(.css-dev-only-do-not-override-1fviqcj).ant-btn.ant-btn-icon-only
    > span
    > svg {
    height: 20px;
    width: 20px;
  }
`

export const AccessManageButton: React.FC<IProps> = ({
  observation,
  variant,
  user,
}) => {
  return (
    <AccessManageModal observation={observation} variant={variant} user={user}>
      <CustomControlButton
        icon={variant === 'add' ? <PlusOutlined /> : <FormOutlined />}
      />
    </AccessManageModal>
  )
}
