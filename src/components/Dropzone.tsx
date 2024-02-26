import React, { useEffect, useMemo, useState } from 'react'
import { Button, message, Upload } from 'antd'
import { UploadProps, UploadFile } from 'antd/lib/upload/interface'
import { UploadOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import { Image, ImageFile } from '../types/Observation'
import { deleteRawimage } from '../pages/api/Rawimages/Rawimages'
import { showError } from '../utils/showError'

const { Dragger } = Upload

const CustomDragger = styled(Dragger)`
  .ant-upload-list.ant-upload-list-picture {
    max-height: 25vh;
    overflow: auto;
  }

  .ant-upload.ant-upload-drag {
    border-color: #000000;
  }

  .ant-upload-list-item {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: #222222;
  }

  .ant-upload-list-item-thumbnail {
    width: 45px !important;
    height: 45px !important;
  }

  div.ant-upload-list.ant-upload-list-picture
    > div
    > div
    > span.ant-upload-list-item-name {
    padding: 0 35px 0 30px;
  }

  .ant-upload-list-item-progress {
    padding-inline-start: 75px !important;
    padding-inline-end: 35px;
  }

  span.ant-upload-list-item-actions.picture > button > span {
    color: #22998b !important;
  }

  span.ant-upload-list-item-actions.picture > button > span > svg {
    width: 20px;
    height: 20px;
  }
`

interface DropzoneProps {
  updateImageList: (images: UploadFile[]) => void
  bodyHeaderText: string
  bodySubText?: string
  images?: UploadFile[]
  imageList?: Image[]
  multiple?: boolean
  type?: 'dropzone' | 'button'
  showUploadList?: boolean
}

const Dropzone: React.FC<DropzoneProps> = ({
  updateImageList,
  bodyHeaderText,
  bodySubText,
  images,
  imageList,
  multiple = true,
  type = 'dropzone',
  showUploadList = true,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>(images || [])

  const validateFileType = (
    { type, name }: UploadFile,
    allowedTypes?: string
  ) => {
    if (!allowedTypes) {
      return true
    }

    if (type) {
      return allowedTypes.includes(type)
    }
  }

  const draggerProps: UploadProps = useMemo(
    () => ({
      name: 'images',
      multiple: multiple,
      listType: 'picture',
      className: 'avatar-uploader',
      beforeUpload: (file: UploadFile) => {
        const isAllowedType = validateFileType(file, 'image/jpeg')
        if (!isAllowedType) {
          setFileList((state) => [...state])
          message.error(`${file.name} is not JPEG file`)
          return false
        }
        let isLt5M
        if (file?.size) {
          isLt5M = file?.size / 1024 / 1024 < 5
          if (!isLt5M) {
            setFileList((state) => [...state])
            message.error('Image must smaller than 5MB!')
            return false
          }
        }
        setFileList((state) => [...state, file])
        return false
      },
      onRemove: async (file: UploadFile) => {
        const someFile = fileList.find((item) => item.uid === file.uid)
        if (someFile) {
          setFileList((fileList) =>
            fileList.filter((item) => item.uid !== file.uid)
          )
          const removeFile = imageList?.find(
            (item) => item.image_name === someFile.name
          )
          if (removeFile) {
            await deleteRawimage(removeFile.id)
              .then((res) => {})
              .catch((error) => showError(error))
            setFileList((state) =>
              state.filter((item) => item.uid !== file.uid)
            )
          }
          return true
        }
        return false
      },
      onChange: ({ file, fileList }) => {
        const { status, uid, type } = file
        if (type !== 'image/jpeg') return

        setFileList(fileList)

        if (status === 'removed') {
          setFileList((state) => state.filter((item) => item.uid !== file.uid))
        }
        if (status === 'done') {
          setFileList((state) => [...state, file])
        } else if (status === 'error') {
        }
      },
      onDrop: (e) => {
        console.log('EVT: Dropped files', e.dataTransfer.files)
      },
      onPreview: () => {},
    }),
    [fileList]
  )

  useEffect(() => updateImageList(fileList), [fileList])

  return (
    <div
      style={{
        background: type === 'dropzone' ? '#d9d9d9' : 'transparent',
        display: 'flex',
        padding: 10,
        justifyItems: 'center',
        flexDirection: 'column',
      }}
    >
      {type === 'dropzone' ? (
        <CustomDragger
          {...draggerProps}
          showUploadList={showUploadList}
          fileList={fileList}
        >
          <>
            <p
              style={{
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: '20px',
                lineHeight: '30px',
                color: '#333333',
              }}
            >
              {bodyHeaderText}
            </p>
            <p>
              <UploadOutlined style={{ color: '#22998B', fontSize: '40px' }} />
            </p>
            <p className="ant-upload-hint">{bodySubText}</p>
          </>
        </CustomDragger>
      ) : (
        <Upload {...draggerProps} showUploadList={showUploadList} fileList={[]}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      )}
    </div>
  )
}

export default Dropzone
