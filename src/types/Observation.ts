import { UploadFile } from 'antd'

interface Researcher {
  userId: string
  firstName: string
  lastName: string
}

interface Location {
  lat: number
  long: number
}

interface ObsMetadata {
  dateCaptured: Date
  location: Location
  description: string
}

export interface Image {
  created_at: string
  id: string
  image_name: string
  image_url: string
  observation_id: string
}

export interface ImageFile {
  image: Image
  originFileObj: UploadFile
}

export interface Observation {
  latitude: number
  longitude: number
  captured_at: string
  description: string
  id: string
  status: string
  created_at: string
  updated_at: string
  created_by: string
  images?: Image[]
}
