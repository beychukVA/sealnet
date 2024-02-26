import React, { useMemo, useState } from 'react'
import { addDatasetComponentsFactory } from './DatasetFactory'
import { DatasetEnum } from './lib/DatasetEnum'
import { IDate } from './types/IDataset'
import { Typography } from 'antd'
import { SectionTitle } from '../common/SectionTitle'

const { Title } = Typography

interface IProps {}

export const AddDataset: React.FC<IProps> = ({}) => {
  const [step, setStep] = useState<string>(DatasetEnum.DATASET_INFO)
  const [data, setData] = useState<IDate>({
    location: '',
    dateCaptured: '',
    description: '',
    images: [],
  })

  const subTitle = useMemo(() => {
    switch (step) {
      case DatasetEnum.DATASET_INFO:
        return 'Dataset Info'
      case DatasetEnum.DATASET_IMAGES:
        return 'Upload Images'
      case DatasetEnum.DATASET_FINALIZE:
        return 'Finalize Dataset'

      default:
        return 'Dataset Info'
    }
  }, [step])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        maxWidth: '1141px',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxHeight: '142px',
          background: '#22998B',
          borderRadius: '5px 5px 0 0',
          padding: '29px 0 20px 0',
        }}
      >
        <SectionTitle>Upload New Oberservation</SectionTitle>
        <Title
          style={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '30px',
            lineHeight: '45px',
            color: '#FFFFFF',
            margin: '4px 0 0 0',
          }}
        >
          {subTitle}
        </Title>
      </div>
      {addDatasetComponentsFactory.getComponent({
        step,
        data,
        setData,
        setStep,
      })}
    </div>
  )
}
