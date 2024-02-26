import { UploadFile } from 'antd'

export interface IDate {
  location: string
  dateCaptured: string
  description: string
  images: UploadFile[]
}

export interface IStepProps {
  step: string
  setStep: (step: string) => void
  data: IDate
  setData: (data: React.SetStateAction<IDate>) => void
}
