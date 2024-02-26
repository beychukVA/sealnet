// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Annotator } from 'react-image-annotate'
import React from 'react'

interface _Image {
  src: string
  name: string
  regions: number[]
}

interface ImageAnnotationProps {
  labelImages: boolean
  regionClsList: string[]
  regionTagList: string[]
  images: _Image[]
  hidePrev: boolean
  hideNext: boolean
  onExit?: (event: any) => void
}

const ImageAnnotation = (props: ImageAnnotationProps) => {
  return <Annotator {...props} />
}

export default ImageAnnotation
