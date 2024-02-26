import { useContext, useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  List,
  Modal,
  Space,
  Tabs,
  UploadFile,
  message,
} from 'antd'
import {
  DeleteOutlined,
  FormOutlined,
  LockOutlined,
  PlusOutlined,
} from '@ant-design/icons'

import { Image, ImageFile, Observation } from '../types/Observation'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import { CustomButton } from './common/CustomButton'
import Dropzone from './Dropzone'
import { Seal } from '../types/SealTypes'
import {
  addObservationAccess,
  deleteObservationAccess,
  getObservationAccess,
  getObservationRawimages,
  getObservationSeals,
  getSingleObservations,
  updateObservations,
} from '../pages/api/Observations/Observation'
import { AWS_S3_HOST } from '../pages/api/axios/axios'
import { uploadImage } from '../pages/api/Rawimages/Rawimages'
import { deleteSeal } from '../pages/api/Seals/Seals'
import { showError } from '../utils/showError'
import { Access } from '../pages/api/Access/Access'
import { GetUserById } from '../pages/api/User/User'
import { AccessManageButton } from './AccessManageButton'
import { CurrentUserCntxt } from '../context/UserContext'
import { useUpdateUI } from '../context/UpdateContext'
import Link from 'next/link'

interface DatasetModalProps {
  modalTitle?: string
  footerText?: string
  buttonText?: string
  children?: React.ReactNode
  imageURL?: string
  observation?: Observation
  imgCount: string | undefined
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
    right: 81px;
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
const CustomAccessButton = styled(Button)`
  :where(.css-dev-only-do-not-override-1fviqcj).ant-btn {
    position: absolute;
    top: 46px;
    right: 40px;
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

const getURLEnd = (url: string): string | undefined => {
  return url.split('/').at(-1)
}

const mockSales = [
  {
    name: 'string',
    description: 'string',
    created_by: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    created_at: '2023-05-22T08:21:15.636Z',
    updated_at: '2023-05-22T08:21:15.636Z',
    image_url: '',
  },
  {
    name: 'string',
    description: 'string',
    created_by: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    created_at: '2023-05-22T08:21:15.636Z',
    updated_at: '2023-05-22T08:21:15.636Z',
    image_url: '',
  },
]

const DatasetModal = ({
  imgCount,
  buttonText,
  children,
  footerText,
  imageURL,
  modalTitle,
  observation,
}: DatasetModalProps) => {
  const { isUpdate, updateUI } = useUpdateUI()
  const currentUser = useContext(CurrentUserCntxt)
  const [isEdit, setEdit] = useState(false)
  const [isEditAccess, setEditAccess] = useState(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [values, setValues] = useState({
    latitude: observation?.latitude || 0,
    longitude: observation?.longitude || 0,
    dateCaptured: observation?.captured_at || '',
    description: observation?.description || '',
    images: [] as UploadFile[],
    imageList: [] as Image[],
    seals: [] as Seal[],
    accessList: [] as Access[],
    researcher: '',
  })

  /**
   * Check for editing onservation and access control
   */
  const checkAccess = () =>
    observation?.created_by === currentUser?.id || currentUser?.sys_admin

  useEffect(() => {
    const fetchSingleObservation = async () => {
      await getSingleObservations(observation?.id)
        .then((res) => {
          return res
        })
        .then(async (obs) => {
          await getObservationRawimages(obs?.id)
            .then((res) => {
              res?.raw_images.map(async (image: Image) => {
                await fetch(`${AWS_S3_HOST}/${image.image_url}`)
                  .then((r) => r.blob())
                  .then((blobFile) => {
                    return new File([blobFile], image.image_name, {
                      type: 'image/jpg',
                      lastModified: dayjs(image.created_at)
                        .toDate()
                        .getMilliseconds(),
                    })
                  })
                  .then((file) => {
                    if (file) {
                      setValues((prev) => ({
                        ...prev,
                        images: [...prev.images, file] as UploadFile[],
                        imageList: [...prev.imageList, image],
                      }))
                    }
                  })
                  .catch((error) => message.error('File download error'))
              })
            })
            .catch((error) => showError(error))
          setValues((prev) => ({
            ...prev,
            latitude: obs?.latitude || 0,
            longitude: obs?.longitude || 0,
            dateCaptured: obs?.captured_at || '',
            description: obs?.description || '',
          }))
        })
        .catch((error) => showError(error))
    }
    const fetchObservationSeals = async () => {
      await getObservationSeals(observation?.id)
        .then((res) => setValues((prev) => ({ ...prev, seals: res })))
        .catch((error) => message.error(error))
    }
    const fetchResearcher = async () => {
      await GetUserById(observation?.created_by)
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
      latitude: observation?.latitude || 0,
      longitude: observation?.longitude || 0,
      dateCaptured: observation?.captured_at || '',
      description: observation?.description || '',
      images: [] as UploadFile[],
      imageList: [] as Image[],
      seals: [] as Seal[],
      researcher: '',
    }))
    fetchSingleObservation()
    fetchObservationSeals()
    fetchResearcher()
  }, [isEdit, isUpdate])

  useEffect(() => {
    const fetchObservationAccess = async () => {
      await getObservationAccess(observation?.id)
        .then((res) => {
          res?.map(async (item: any) => {
            await GetUserById(item?.user_id)
              .then((user: any) => {
                setValues((prev) => ({
                  ...prev,
                  accessList: [
                    ...prev.accessList,
                    { ...item, user_name: user?.username },
                  ],
                }))
              })
              .catch((error: any) => showError(error))
          })
        })
        .catch((error) => message.error(error))
    }
    setValues((prev) => ({
      ...prev,
      accessList: [] as Access[],
    }))
    fetchObservationAccess()
  }, [isEditAccess, isUpdate])

  const isNextBtnDisabled =
    !values.latitude ||
    !values.longitude ||
    !values.dateCaptured ||
    !values.description ||
    !values.images.length

  const handleEdit = () => {
    if (!checkAccess())
      return message.error('You do not have permission to perform this action!')
    setEdit(true)
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

  const handleDataChange = (
    value: DatePickerProps['value'],
    dateString: [string, string] | string
  ) => {
    setValues({
      ...values,
      ['dateCaptured']: dayjs(dateString?.toString() || '').toJSON(),
    })
  }

  const handleDeleteSeal = async (sealId: string) => {
    await deleteSeal(sealId)
      .then((res) => updateUI())
      .catch((error) => showError(error))
  }

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

  const createObservation = (data: Observation | undefined) => {
    return !isEdit ? (
      data ? (
        <List
          style={{
            overflow: 'auto',
            height: '260px',
          }}
          dataSource={values.imageList}
          renderItem={(item) => (
            <Link href={`datasets/detect-faces?id=${item?.id}`}>
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
                        {item?.image_name}
                      </span>
                      <span
                        style={{
                          border: '1px solid #000000',
                          borderRadius: '15px',
                          padding: '0px 10px',
                          textAlign: 'center',
                        }}
                      >
                        {data?.status}
                      </span>
                    </div>
                  }
                />
              </List.Item>
            </Link>
          )}
        />
      ) : (
        <></>
      )
    ) : (
      <Dropzone
        imageList={values.imageList}
        images={values.images}
        bodyHeaderText="Drag or Click to Upload Observation Images"
        updateImageList={updateImageList}
      />
    )
  }

  const updateImageList = (images: UploadFile[]) => {
    setValues((prev) => {
      return {
        ...prev,
        images,
      }
    })
  }

  const handleUpdateObservation = async () => {
    await updateObservations(
      observation?.id,
      +values.latitude,
      +values.longitude,
      values?.dateCaptured,
      observation?.status,
      values.description,
      observation?.created_by
    )
      .then(async (updatedObs) => {
        if (!updatedObs) return setEdit(false)
        const files = [] as any[]
        values.images.map((file) => {
          const isExist = values.imageList.find(
            (item) => item.image_name === file.name
          )
          if (!isExist) {
            files.push(
              uploadImage(updatedObs.id, (file.originFileObj || file) as File)
            )
          }
        })
        Promise.all(new Set(files))
          .then((res) => {
            message.success('Observation updated')
            setEdit(false)
            updateUI()
          })
          .catch((error) => message.error('Upload error'))
      })
      .catch((error) => showError(error))
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEdit(false)
    setEditAccess(false)
  }

  const handleEditAccess = () => {
    if (!checkAccess())
      return message.error('You do not have permission to perform this action!')
    setEditAccess(true)
  }

  const handleDeleteAccess = async (id: string) => {
    await deleteObservationAccess(id)
      .then((res) => {
        updateUI()
        message.error('Access removed successfully')
      })
      .then((error) => showError(error))
  }

  return (
    <div>
      <div
        onClick={() => {
          setModalOpen(true)
        }}
      >
        {children}
      </div>
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
                <CustomButton onClick={handleUpdateObservation}>
                  Update
                </CustomButton>
              </div>
            ) : isEditAccess ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  width: '100%',
                }}
              >
                <CustomButton onClick={() => setEditAccess(false)}>
                  Back
                </CustomButton>
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
                  >{`${dayjs(observation?.created_at)}`}</span>
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
                  >{`${dayjs(observation?.updated_at)}`}</span>
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
            >{`Observation`}</span>
            <span
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '800',
                fontSize: '40px',
                lineHeight: '48px',
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
              }}
            >{`[${observation?.id}]`}</span>
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
            style={{ display: isEdit || isEditAccess ? 'none' : 'block' }}
            onClick={handleEdit}
            icon={<FormOutlined />}
          ></CustomEditButton>

          <CustomAccessButton
            style={{ display: isEdit || isEditAccess ? 'none' : 'block' }}
            onClick={handleEditAccess}
            icon={<LockOutlined />}
          ></CustomAccessButton>

          <div
            style={{
              width: '100%',
              height: '100%',
              padding: '43px 108px 0 108px',
              background: '#D9D9D9',
            }}
          >
            {isEditAccess ? (
              <Form layout="vertical">
                <CustomFormItem label="Access">
                  <Space
                    direction="horizontal"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 0.2fr',
                      width: '100%',
                      margin: '0 0 0 11px',
                      padding: '8px 8px 8px 15px',
                      borderBottom: '1px solid #000000',
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
                      }}
                    >
                      Username
                    </span>
                    <span
                      style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '800',
                        fontSize: '16px',
                        lineHeight: '20px',
                        color: '#000000',
                        marginRight: '15px',
                      }}
                    >
                      Observation Role
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        width: '100%',
                      }}
                    >
                      <AccessManageButton
                        observation={observation}
                        variant="add"
                      />
                    </div>
                  </Space>
                  {values?.accessList && values?.accessList.length > 0 && (
                    <List
                      style={{
                        overflow: 'auto',
                        height: '340px',
                        width: '100%',
                        margin: '0 0 0 11px',
                      }}
                      dataSource={values.accessList}
                      renderItem={(item) => (
                        <List.Item
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 0.2fr',
                            padding: '8px 8px 8px 15px',
                            width: '100%',
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontWeight: '600',
                            fontSize: '20px',
                            lineHeight: '30px',
                            color: '#494949',
                          }}
                        >
                          <span
                            style={{
                              width: '100%',
                              padding: '0 10px',
                            }}
                          >
                            {item?.user_name}
                          </span>

                          <span
                            style={{
                              width: '100%',
                              padding: '0 10px',
                            }}
                          >
                            {item?.role}
                          </span>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              width: '100%',
                            }}
                          >
                            <AccessManageButton
                              observation={observation}
                              variant="edit"
                              user={{
                                accessId: item?.id,
                                userName: item?.user_name,
                                email: 'admin@sealnet.com',
                                role: item?.role,
                              }}
                            />
                            <CustomControlButton
                              onClick={() => handleDeleteAccess(item?.id)}
                              style={{ marginLeft: '8px' }}
                              icon={<DeleteOutlined />}
                            />
                          </div>
                        </List.Item>
                      )}
                    />
                  )}
                </CustomFormItem>
              </Form>
            ) : (
              <Form layout="vertical">
                <CustomFormItem label="Location">
                  <Space direction="horizontal">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '20px',
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
                        }}
                      >
                        Latitude
                      </span>
                      <Input
                        disabled={!isEdit}
                        type="number"
                        value={values.latitude}
                        placeholder="latitude"
                        onChange={handleChange('latitude')}
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
                        }}
                      >
                        Longitude
                      </span>
                      <Input
                        disabled={!isEdit}
                        type="number"
                        value={values.longitude}
                        placeholder="longitude"
                        onChange={handleChange('longitude')}
                      />
                    </div>
                  </Space>
                </CustomFormItem>
                <CustomFormItem label="Date Captured">
                  <DatePicker
                    disabled={!isEdit}
                    value={
                      values.dateCaptured
                        ? dayjs(values.dateCaptured)
                        : undefined
                    }
                    format={dateFormat}
                    onChange={handleDataChange}
                  />
                </CustomFormItem>
                <CustomFormItem label="Description">
                  <Input.TextArea
                    disabled={!isEdit}
                    value={values.description}
                    placeholder="Description on observation"
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
                        label: 'Observation Details',
                        children: createObservation(observation),
                      },
                      {
                        key: '2',
                        label: 'Seal Faces',
                        // children: createSealFaces(values.seals),
                        children: createSealFaces(mockSales),
                      },
                    ]}
                  />
                </CustomFormItem>
              </Form>
            )}
          </div>
        </div>
      </CustomModal>
    </div>
  )
}

export default DatasetModal
