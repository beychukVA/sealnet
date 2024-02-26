import { Divider, UploadFile } from 'antd'
import React, { useState } from 'react'
import Dropzone from '../../../components/Dropzone'
import { CustomButton } from '../../common/CustomButton'
import { DatasetEnum } from '../lib/DatasetEnum'
import { IDate, IStepProps } from '../types/IDataset'

export const DatasetImagesStep: React.FC<IStepProps> = ({
  step,
  setStep,
  data,
  setData,
}) => {
  const [uploadStatus, setUploadStatus] = useState(false)

  // const isNextBtnDisabled = data.images.length === 0 || uploadStatus
  const isNextBtnDisabled = false

  const handleNext = () => setStep(DatasetEnum.DATASET_FINALIZE)
  const handleBack = () => setStep(DatasetEnum.DATASET_INFO)

  const handleUploadStatus = (status: boolean) => setUploadStatus(status)

  const addImage = (file: UploadFile) =>
    setData((prev) => {
      const images = prev.images
      images.push(file)
      return { ...prev, images: images }
    })

  const removeImage = (uid: string) => {
    setData((prev) => {
      const updImages = prev.images.filter((image) => image.uid !== uid)
      return { ...prev, images: updImages }
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '30px 56px',
          background: 'rgba(34, 153, 139, 0.1)',
          overflow: 'hidden',
        }}
      >
        <Dropzone
          updateImageList={() => {}}
          // addImage={addImage}
          // removeImage={removeImage}
          bodyHeaderText="Drag or Click to Upload Observation Images"
          // handleUploadStatus={handleUploadStatus}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: '18px',
        }}
      >
        <CustomButton onClick={handleBack}>Dataset Info</CustomButton>
        <CustomButton disabled={isNextBtnDisabled} onClick={handleNext}>
          Finalize
        </CustomButton>
      </div>
    </div>
  )
}
