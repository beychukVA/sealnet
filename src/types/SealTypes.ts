export interface SealRecognition {
  id: string
  imageUrl: string
  createdAt: number
  updatedAt: number
  likelihood: number
  verified?: boolean
  observationId: string
}

export interface Seal {
  id: string
  name: string
  created_at: string
  updated_at: string
  image_url?: string
  description: string
  created_by: string
}
