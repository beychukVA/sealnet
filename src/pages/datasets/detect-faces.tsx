import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { PrivateRoute } from '../../components/Routes/PrivateRoute'
import { useRouter } from 'next/router'

const DatasetFaces = () => {
  const router = useRouter()
  const { id } = router.query
  const [image, setImage] = useState(null)

  const DynamicImageAnnotation = dynamic(
    () => import('../../components/ImageAnnotation'),
    {
      ssr: false,
    }
  )
  const initProps = {
    labelImages: true,
    regionClsList: ['Alpha', 'Beta', 'Charlie', 'Delta'],
    regionTagList: ['tag1', 'tag2', 'tag3'],
    images: [
      {
        src: '',
        name: 'name',
        regions: [],
      },
    ],
    hidePrev: true,
    hideNext: true,
    onExit: (event: any) => {
      console.log('EVT: onExit', event)
      const { h, w, x, y } = event?.lastAction?.image?.regions[0]
      console.log('EVT: bounding_box', [h, w, x, y])
    },
  }

  return (
    <PrivateRoute>
      <div
        style={{
          width: '100%',
          height: 'calc(100% - 64px)',
          padding: '0.5em',
        }}
      >
        <DynamicImageAnnotation {...initProps} />
      </div>
    </PrivateRoute>
  )
}

export default DatasetFaces
