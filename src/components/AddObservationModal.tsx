import styled from '@emotion/styled'
import {
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  message,
  Modal,
  Space,
  UploadFile,
} from 'antd'
import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import { useUpdateUI } from '../context/UpdateContext'
import { createObservations } from '../pages/api/Observations/Observation'
import { uploadImage } from '../pages/api/Rawimages/Rawimages'
import { showError } from '../utils/showError'
import { CustomButton } from './common/CustomButton'
import { SectionTitle } from './common/SectionTitle'
import Dropzone from './Dropzone'

interface IAddObservationModalProps {
  children: React.ReactNode
}

interface Observation {
  latitude: string
  longitude: string
  dateCaptured: string
  description: string
  images: UploadFile[]
}

const dateFormat = 'YYYY-MM-DD'

const CustomModal = styled(Modal)`
  :where(.css-dev-only-do-not-override-1fviqcj).ant-modal .ant-modal-content {
    padding: 0;
    border-radius: 25px 25px 0px 0px;
    max-width: 881px;
    max-height: 841px;
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

export const AddObservationModal = (props: IAddObservationModalProps) => {
  const { isUpdate, updateUI } = useUpdateUI()
  const [modalOpen, setModalOpen] = useState(false)
  const [values, setValues] = useState<Observation>({
    latitude: '',
    longitude: '',
    dateCaptured: '',
    description: '',
    images: [],
  })

  useEffect(
    () =>
      setValues({
        latitude: '',
        longitude: '',
        dateCaptured: '',
        description: '',
        images: [],
      }),
    []
  )

  const isNextBtnDisabled =
    !values.latitude ||
    !values.longitude ||
    !values.dateCaptured ||
    !values.description ||
    !values.images.length

  const updateImageList = (images: UploadFile[]) => {
    setValues((prev) => {
      return {
        ...prev,
        images,
      }
    })
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

  const handleAddObservation = async () => {
    await createObservations(
      +values.latitude,
      +values.longitude,
      values.dateCaptured,
      values.description
    )
      .then(async (res) => {
        const files: any[] = []
        values.images.map((file) => {
          files.push(uploadImage(res.id, file.originFileObj as File))
        })
        Promise.all(files)
          .then((res) => {
            updateUI()
            setModalOpen(false)
          })
          .catch((error) => message.error('Upload error'))
      })
      .catch((error) => showError(error))
  }

  const handleCloseModal = () => {
    setValues({
      latitude: '',
      longitude: '',
      dateCaptured: '',
      description: '',
      images: [],
    })
    setModalOpen(false)
  }

  return (
    <div>
      <div onClick={() => setModalOpen(true)}>{props.children}</div>
      <CustomModal
        destroyOnClose={true}
        centered
        open={modalOpen}
        onOk={() => handleCloseModal()}
        onCancel={() => handleCloseModal()}
        width={'980px'}
        closable={false}
        footer={[
          <div
            key="1"
            style={{
              padding: '26px 35px',
              background: '#D9D9D9',
            }}
          >
            <CustomButton
              disabled={isNextBtnDisabled}
              onClick={handleAddObservation}
            >
              Create
            </CustomButton>
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
          <SectionTitle>{`Create observation`}</SectionTitle>
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
                  value={
                    values.dateCaptured ? dayjs(values.dateCaptured) : undefined
                  }
                  format={dateFormat}
                  onChange={handleDataChange}
                />
              </CustomFormItem>
              <CustomFormItem label="Description">
                <Input.TextArea
                  value={values.description}
                  placeholder="Description on observation"
                  autoSize={{ minRows: 3, maxRows: 3 }}
                  onChange={handleChange('description')}
                />
              </CustomFormItem>
              <CustomFormItem label="Images">
                <Dropzone
                  updateImageList={updateImageList}
                  bodyHeaderText="Drag or Click to Upload Observation Images"
                />
              </CustomFormItem>
            </Form>
          </div>
        </div>
      </CustomModal>
    </div>
  )
}
