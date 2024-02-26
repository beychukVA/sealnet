import React, { useState } from 'react'
import { DatePicker, Input, Form, Space, Divider, DatePickerProps } from 'antd'
import { IDate, IStepProps } from '../types/IDataset'
import { CustomButton } from '../../common/CustomButton'
import { DatasetEnum } from '../lib/DatasetEnum'
import dayjs from 'dayjs'
import styled from '@emotion/styled'

const dateFormat = 'YYYY/MM/DD'

const CustomFormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    color: #222222;
  }

  .ant-col.ant-form-item-label {
    padding-bottom: 20px;
  }

  .ant-input,
  .ant-picker-input > input {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    color: #222222;
  }

  .anticon.anticon-close-circle svg,
  .anticon.anticon-calendar svg {
    width: 20px !important;
    height: 20px !important;
  }
`

export const DatasetInfoStep: React.FC<IStepProps> = ({
  step,
  setStep,
  data,
  setData,
}) => {
  const [values, setValues] = useState<IDate>({
    location: data.location,
    dateCaptured: data.dateCaptured,
    description: data.description,
    images: data.images,
  })

  const isNextBtnDisabled =
    !values.location || !values.dateCaptured || !values.description

  const handleChange =
    (prop: string) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setValues({ ...values, [prop]: event.target.value })
      setData((prev) => ({
        ...prev,
        [prop]: event.target.value,
      }))
    }

  const handleDataChange = (
    value: DatePickerProps['value'],
    dateString: [string, string] | string
  ) => {
    setValues({ ...values, ['dateCaptured']: dateString?.toString() || '' })
    setData((prev) => ({
      ...prev,
      ['dateCaptured']: dateString.toString() || '',
    }))
  }

  const handleNext = () => setStep(DatasetEnum.DATASET_IMAGES)
  return (
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
          padding: '43px 108px',
          background: 'rgba(34, 153, 139, 0.1)',
        }}
      >
        <Form layout="vertical">
          <CustomFormItem label="Location">
            <Input
              type="text"
              value={data.location}
              placeholder="location"
              onChange={(e) => handleChange('location')(e)}
            />
          </CustomFormItem>
          <CustomFormItem label="Date Captured">
            <DatePicker
              value={
                data.dateCaptured
                  ? dayjs(data.dateCaptured, dateFormat)
                  : undefined
              }
              format={dateFormat}
              onChange={handleDataChange}
            />
          </CustomFormItem>
          <CustomFormItem label="Description">
            <Input.TextArea
              value={data.description}
              placeholder="Description on observation"
              autoSize={{ minRows: 3, maxRows: 3 }}
              onChange={(e) => handleChange('description')(e)}
            />
          </CustomFormItem>
        </Form>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: '18px',
        }}
      >
        <CustomButton disabled={isNextBtnDisabled} onClick={handleNext}>
          Upload Images
        </CustomButton>
      </div>
    </div>
  )
}
