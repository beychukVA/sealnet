import React from 'react'
import { DatasetEnum } from './lib/DatasetEnum'
import { DatasetFinalizeStep } from './Steps/DatasetFinalizeStep'
import { DatasetImagesStep } from './Steps/DatasetImagesStep'
import { DatasetInfoStep } from './Steps/DatasetInfoStep'
import { IStepProps } from './types/IDataset'

class AddDatasetComponentsFactory {
  list = {
    [DatasetEnum.DATASET_INFO]: DatasetInfoStep,
    [DatasetEnum.DATASET_IMAGES]: DatasetImagesStep,
    [DatasetEnum.DATASET_FINALIZE]: DatasetFinalizeStep,
  }

  getComponent({ step, setStep, data, setData }: IStepProps) {
    const Component = this.list[step]

    if (Component) {
      return (
        <Component
          {...{
            step,
            setStep,
            data,
            setData,
          }}
        />
      )
    }

    return null
  }
}

export const addDatasetComponentsFactory = new AddDatasetComponentsFactory()
