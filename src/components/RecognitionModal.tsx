import { useEffect, useState } from 'react'
import { Modal, List, Tabs, Form, Button, Input, Space } from 'antd'
import { Seal } from '../types/SealTypes'
import Avatar from 'antd/lib/avatar/avatar'
import styled from '@emotion/styled'
import { CustomButton } from './common/CustomButton'
import { SectionTitle } from './common/SectionTitle'
import dayjs from 'dayjs'
import {
  CheckCircleOutlined,
  DeleteOutlined,
  FormOutlined,
} from '@ant-design/icons'
import { Observation } from '../types/Observation'
import { AWS_S3_HOST } from '../pages/api/axios/axios'
import Dropzone from './Dropzone'
import { deleteSeal } from '../pages/api/Seals/Seals'
import { GetUserById } from '../pages/api/User/User'
import { showError } from '../utils/showError'
import { useUpdateUI } from '../context/UpdateContext'

interface RecognitionModalProps {
  children: React.ReactNode
  seal: Seal
  containerStyle?: React.CSSProperties
}

const dateFormat = 'YYYY-MM-DD'

const CustomModal = styled(Modal)`
  :where(.css-dev-only-do-not-override-1fviqcj).ant-modal .ant-modal-content {
    padding: 0;
    border-radius: 25px 25px 0px 0px;
    background: #d9d9d9;
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

const CustomTabs = styled(Tabs)`
  :where(.css-dev-only-do-not-override-1fviqcj).ant-tabs
    > .ant-tabs-nav
    .ant-tabs-nav-list,
  :where(.css-dev-only-do-not-override-1fviqcj).ant-tabs
    > div
    > .ant-tabs-nav
    .ant-tabs-nav-list {
    width: 100%;
  }

  :where(.css-dev-only-do-not-override-1fviqcj).ant-tabs-top > .ant-tabs-nav {
    margin: 0;
  }

  :where(.css-dev-only-do-not-override-1fviqcj).ant-tabs .ant-tabs-tab {
    display: block;
    width: 100%;
    margin: 0;
    text-align: center;
    background: #d9d9d9;
    color: #ffffff;
    padding: 20px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
    color: #000000;
    border: 1px solid #5b5b5b;
  }

  :where(.css-dev-only-do-not-override-1fviqcj).ant-tabs
    .ant-tabs-tab.ant-tabs-tab-active {
    background: #5b5b5b;
  }

  :where(.css-dev-only-do-not-override-1fviqcj).ant-tabs
    .ant-tabs-tab.ant-tabs-tab-active
    .ant-tabs-tab-btn {
    color: #ffffff;
  }

  .ant-tabs-ink-bar {
    background-color: transparent;
  }

  :where(.css-dev-only-do-not-override-1fviqcj).ant-tabs
    .ant-tabs-content-holder {
    padding: 24px 0;
  }
`

const CustomEditButton = styled(Button)`
  :where(.css-dev-only-do-not-override-1fviqcj).ant-btn {
    position: absolute;
    top: 46px;
    right: 70px;
    height: 35px;
    width: 35px;
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
    height: 35px;
    width: 35px;
    transform: none;
  }

  :where(.css-dev-only-do-not-override-1fviqcj).ant-btn.ant-btn-icon-only
    > span
    > svg {
    height: 35px;
    width: 35px;
  }
`

const getURLEnd = (url: string): string | undefined => {
  return url.split('/').at(-1)
}

const RecognitionModal = ({
  seal,
  containerStyle,
  children,
}: RecognitionModalProps) => {
  const { isUpdate, updateUI } = useUpdateUI()
  const [isEdit, setEdit] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [values, setValues] = useState({
    name: seal?.name || '',
    description: seal?.description || '',
    researcher: '',
  })

  useEffect(() => {
    const fetchResearcher = async () => {
      await GetUserById(seal?.created_by)
        .then((res) => {
          setValues((prev) => {
            return {
              ...prev,
              researcher: res?.username,
            }
          })
        })
        .catch((error) => showError(error))
    }

    setValues((prev) => ({
      ...prev,
      name: seal?.name || '',
      description: seal?.description || '',
      researcher: '',
    }))
    fetchResearcher()
  }, [isEdit, isUpdate])

  const createSealFaces = (data: Seal[] | undefined) => {
    return data ? (
      <List
        style={{
          overflow: 'auto',
          height: '260px',
        }}
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`${AWS_S3_HOST}/${item?.image_url}`}
                  shape="square"
                  style={{
                    background: '#494949',
                    width: '45px',
                    height: '45px',
                    marginRight: '14px',
                  }}
                />
              }
              title={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingRight: '15px',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: '600',
                      fontSize: '20px',
                      lineHeight: '30px',
                      color: '#494949',
                      height: '45px',
                    }}
                  >
                    {item?.name}
                  </span>
                  {isEdit ? (
                    <DeleteOutlined
                      style={{ fontSize: '24px', cursor: 'pointer' }}
                      onClick={() => handleDeleteSeal(item.id)}
                    />
                  ) : (
                    <span
                      style={{
                        border: '1px solid #000000',
                        borderRadius: '15px',
                        padding: '0px 10px',
                        textAlign: 'center',
                      }}
                    >
                      {data[index]?.name}
                    </span>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      />
    ) : (
      <>No data Seals</>
    )
  }

  // const createObservations = (data: [] | undefined) => {
  //   return data ? (
  //     <List
  //       style={{
  //         overflow: 'auto',
  //         height: '260px',
  //       }}
  //       dataSource={data}
  //       renderItem={(item, index) => (
  //         <List.Item>
  //           <List.Item.Meta
  //             avatar={
  //               <Avatar
  //                 src={`${AWS_S3_HOST}/${item?.image_url}`}
  //                 shape="square"
  //                 style={{
  //                   background: '#494949',
  //                   width: '45px',
  //                   height: '45px',
  //                   marginRight: '14px',
  //                 }}
  //               />
  //             }
  //             title={
  //               <div
  //                 style={{
  //                   display: 'flex',
  //                   alignItems: 'center',
  //                   justifyContent: 'space-between',
  //                   paddingRight: '15px',
  //                 }}
  //               >
  //                 <span
  //                   style={{
  //                     display: 'flex',
  //                     alignItems: 'center',
  //                     justifyContent: 'flex-start',
  //                     fontFamily: 'Poppins',
  //                     fontStyle: 'normal',
  //                     fontWeight: '600',
  //                     fontSize: '20px',
  //                     lineHeight: '30px',
  //                     color: '#494949',
  //                     height: '45px',
  //                   }}
  //                 >
  //                   {item?.name}
  //                 </span>
  //                 {isEdit ? (
  //                   <DeleteOutlined
  //                     style={{ fontSize: '24px', cursor: 'pointer' }}
  //                     onClick={() => handleDeleteSeal(item.id)}
  //                   />
  //                 ) : (
  //                   <span
  //                     style={{
  //                       border: '1px solid #000000',
  //                       borderRadius: '15px',
  //                       padding: '0px 10px',
  //                       textAlign: 'center',
  //                     }}
  //                   >
  //                     {data[index]?.name}
  //                   </span>
  //                 )}
  //               </div>
  //             }
  //           />
  //         </List.Item>
  //       )}
  //     />
  //   ) : (
  //     <>No data Seals</>
  //   )
  // }

  const handleDeleteSeal = async (sealId: string) => {
    await deleteSeal(sealId)
  }

  const handleUpdateSeal = () => {}

  const handleEdit = () => setEdit(true)

  const handleChange =
    (prop: string) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEdit(false)
  }

  return (
    <div>
      <div onClick={() => setModalOpen(true)}>{children}</div>
      <CustomModal
        style={{
          height: '90vh',
          overflow: 'hidden',
        }}
        centered
        open={modalOpen}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        width={'980px'}
        closable={false}
        footer={[
          <div
            key="1"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '26px 35px',
            }}
          >
            {isEdit ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  width: '100%',
                }}
              >
                <CustomButton onClick={handleUpdateSeal}>Update</CustomButton>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    color: '#000000',
                    fontSize: '18px',
                    lineHeight: '22px',
                  }}
                >
                  <span
                    style={{
                      fontWeight: '800',
                      fontSize: '20px',
                      lineHeight: '24px',
                    }}
                  >{`Created At:`}</span>
                  <span
                    style={{
                      fontWeight: '400',
                      fontSize: '20px',
                      lineHeight: '24px',
                    }}
                  >{`${dayjs(seal?.created_at)}`}</span>
                  <span
                    style={{
                      fontWeight: '800',
                      fontSize: '20px',
                      lineHeight: '24px',
                    }}
                  >{`Updated At:`}</span>
                  <span
                    style={{
                      fontWeight: '400',
                      fontSize: '20px',
                      lineHeight: '24px',
                    }}
                  >{`${dayjs(seal?.updated_at)}`}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                    marginTop: '15px',
                  }}
                >
                  <span
                    style={{
                      fontWeight: '800',
                      fontSize: '20px',
                      lineHeight: '24px',
                    }}
                  >{`Created by:`}</span>
                  <span
                    style={{
                      fontWeight: '400',
                      fontSize: '20px',
                      lineHeight: '24px',
                      marginLeft: '25px',
                    }}
                  >
                    {values?.researcher}
                  </span>
                </div>
              </>
            )}
          </div>,
        ]}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
            height: '100%',
            background: '#22998B',
            padding: '16px 30px',
            borderRadius: '25px 25px 0 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: '100%',
            }}
          >
            <span
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '800',
                fontSize: '40px',
                lineHeight: '48px',
                color: '#FFFFFF',
              }}
            >{`Seal [${seal?.name}]`}</span>
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            height: '60vh',
            overflow: 'auto',
          }}
        >
          <CustomEditButton
            style={{ display: isEdit ? 'none' : 'block' }}
            onClick={handleEdit}
            icon={<FormOutlined />}
          ></CustomEditButton>
          <div
            style={{
              width: '100%',
              height: '100%',
              padding: '43px 108px 0 108px',
              background: '#D9D9D9',
            }}
          >
            <Form layout="vertical">
              <CustomFormItem label="Name">
                <Input
                  disabled={!isEdit}
                  type="number"
                  value={values.name}
                  placeholder="name"
                  onChange={handleChange('name')}
                />
              </CustomFormItem>
              <CustomFormItem label="Description">
                <Input.TextArea
                  disabled={!isEdit}
                  value={values.description}
                  placeholder="Description on seal"
                  autoSize={{ minRows: 3, maxRows: 3 }}
                  onChange={handleChange('description')}
                />
              </CustomFormItem>
              <CustomFormItem label="Images">
                <CustomTabs
                  centered
                  items={[
                    {
                      key: '1',
                      label: 'Seal Faces',
                      // children: createSealFaces(),
                    },
                    {
                      key: '2',
                      label: 'Observations',
                      // children: createSealFaces(values.seals),
                      // children: createSealFaces(mockSales),
                    },
                  ]}
                />
              </CustomFormItem>
            </Form>
          </div>
        </div>
      </CustomModal>
    </div>
  )
}

export default RecognitionModal
