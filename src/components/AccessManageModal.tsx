import styled from '@emotion/styled'
import { Form, Input, message, Modal, Select, Space } from 'antd'
import React, { useState, useEffect } from 'react'
import { CustomButton } from './common/CustomButton'
import { SectionTitle } from './common/SectionTitle'
import type { SelectProps } from 'antd'
import { Observation } from '../types/Observation'
import {
  addObservationAccess,
  updateObservationAccess,
} from '../pages/api/Observations/Observation'
import { showError } from '../utils/showError'
import { GetUserByEmail } from '../pages/api/User/User'
import { UserAccess } from '../pages/api/Access/Access'
import { useUpdateUI } from '../context/UpdateContext'

interface IAccessManageModalProps {
  observation: Observation | undefined
  children: React.ReactNode
  variant: 'add' | 'edit'
  user?: UserAccess
}

const CustomModal = styled(Modal)`
  :where(.css-dev-only-do-not-override-1fviqcj).ant-modal .ant-modal-content {
    padding: 0;
    border-radius: 25px 25px 0px 0px;
    max-width: 881px;
    max-height: 841px;
    margin: 0;
    background: rgba(50, 50, 50, 0.94);
  }

  .ant-modal-footer {
    margin-top: 0;
  }
`

const CustomFormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
  }

  .ant-col.ant-form-item-label {
    padding-bottom: 10px;
  }

  .ant-input,
  .ant-picker-input > input {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #222222;
  }

  .anticon.anticon-close-circle svg,
  .anticon.anticon-calendar svg {
    width: 20px !important;
    height: 20px !important;
  }
`

const roles: SelectProps['options'] = [
  { value: 'admin', label: 'Admin' },
  { value: 'verifier', label: 'Verifier' },
]

export const AccessManageModal: React.FC<IAccessManageModalProps> = ({
  observation,
  children,
  variant,
  user,
}) => {
  const { isUpdate, updateUI } = useUpdateUI()
  const [modalOpen, setModalOpen] = useState(false)
  const role = roles.find((item) => item.value === user?.role)
  const [values, setValues] = useState({
    email: variant === 'add' ? '' : user?.email,
    role: variant === 'add' ? roles[0].value : role?.value,
  })

  useEffect(
    () =>
      setValues({
        email: variant === 'add' ? '' : user?.email,
        role: roles[0].value,
      }),
    []
  )

  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement> | string) => {
      setValues({
        ...values,
        [prop]: typeof event === 'string' ? event : event?.target?.value,
      })
    }

  const handleCloseModal = () => {
    setValues({
      email: '',
      role: roles[0].value,
    })
    setModalOpen(false)
  }

  const handleChangeAccess = async () => {
    await GetUserByEmail(values?.email)
      .then(async (res) => {
        console.log('EVT: user by email', res)
        if (!res?.id) return message.error('User with this email was not found')
        if (variant === 'add') {
          await addObservationAccess(
            observation?.id,
            values?.role?.toString(),
            res?.id
          )
            .then((res) => {
              if (!res) return
              message.success('Access added successfully')
              updateUI()
              handleCloseModal()
            })
            .catch((error) => {
              console.log('EVT: add error', error)
              showError(error)
            })
        } else if (variant === 'edit') {
          await updateObservationAccess(
            user?.accessId,
            values?.role?.toString()
          )
            .then((res) => {
              if (!res) return
              message.success('Access updated successfully')
              updateUI()
              handleCloseModal()
            })
            .catch((error) => showError(error))
        }
      })
      .catch((error) => showError(error))
  }

  return (
    <div>
      <div onClick={() => setModalOpen(true)}>{children}</div>
      <CustomModal
        destroyOnClose={true}
        centered
        open={modalOpen}
        onOk={() => handleCloseModal()}
        onCancel={() => handleCloseModal()}
        closable={false}
        width={'600px'}
        footer={[
          <div
            key="1"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '26px 35px',
              background: '#D9D9D9',
            }}
          >
            <CustomButton onClick={handleCloseModal}>Cancel</CustomButton>
            <CustomButton onClick={handleChangeAccess}>Confirm</CustomButton>
          </div>,
        ]}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            background: '#22998B',
            padding: '16px 50px',
            borderRadius: '25px 25px 0 0',
          }}
        >
          <SectionTitle>{`Access Management`}</SectionTitle>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
              padding: '43px 108px 0 108px',
              background: '#D9D9D9',
            }}
          >
            <Form layout="vertical">
              <CustomFormItem label="Access">
                <Space direction="vertical" style={{ width: '100%' }}>
                  {variant === 'edit' && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '20px',
                        width: '100%',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'Inter',
                          fontStyle: 'normal',
                          fontWeight: '800',
                          fontSize: '16px',
                          lineHeight: '20px',
                          color: '#000000',
                          marginRight: '15px',
                          width: '100%',
                          maxWidth: '85px',
                        }}
                      >
                        Username
                      </span>
                      <Input
                        disabled={true}
                        type="email"
                        value={user?.userName}
                        placeholder="email"
                      />
                    </div>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '20px',
                      width: '100%',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '800',
                        fontSize: '16px',
                        lineHeight: '20px',
                        color: '#000000',
                        marginRight: '15px',
                        width: '100%',
                        maxWidth: '85px',
                      }}
                    >
                      Email
                    </span>
                    <Input
                      disabled={variant === 'edit'}
                      type="email"
                      value={values.email}
                      placeholder="email"
                      onChange={handleChange('email')}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '800',
                        fontSize: '16px',
                        lineHeight: '20px',
                        color: '#000000',
                        marginRight: '15px',
                        width: '100%',
                        maxWidth: '85px',
                      }}
                    >
                      Role
                    </span>
                    <Select
                      defaultValue={
                        variant === 'add'
                          ? roles[0].value?.toString()
                          : role?.value?.toString()
                      }
                      style={{ width: '100%' }}
                      onChange={handleChange('role')}
                      options={roles}
                    />
                  </div>
                </Space>
              </CustomFormItem>
            </Form>
          </div>
        </div>
      </CustomModal>
    </div>
  )
}
