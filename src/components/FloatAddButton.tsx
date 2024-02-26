import React from 'react'
import { FloatButton } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import { AddObservationModal } from './AddObservationModal'

interface IProps {}

const CustomFloatButton = styled(FloatButton)`
  .ant-float-btn-body {
    background-color: #22998b;
  }

  .ant-float-btn-icon {
    width: 40px !important;
    height: 40px !important;
    color: #ffffff !important;
  }

  .ant-float-btn-icon > .anticon.anticon-plus,
  .ant-float-btn-icon > .anticon.anticon-plus > svg {
    width: 40px !important;
    height: 40px !important;
  }
`

export const FloatAddButton: React.FC<IProps> = ({}) => {
  return (
    <AddObservationModal>
      <CustomFloatButton
        style={{
          width: '75px',
          height: '75px',
          backgroundColor: '#22998B',
        }}
        onClick={() => console.log('click')}
        icon={<PlusOutlined />}
      />
    </AddObservationModal>
  )
}
