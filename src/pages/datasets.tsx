import DataCard from '../components/DataCard'
import { Grid } from '@chakra-ui/react'
import { mockData } from '../mock_data/observations'
import { useEffect, useState } from 'react'
import {
  getObservationRawimages,
  getObservations,
} from './api/Observations/Observation'
import { PrivateRoute } from '../components/Routes/PrivateRoute'
import { Observation } from '../types/Observation'
import { AWS_S3_HOST } from './api/axios/axios'
import { showError } from '../utils/showError'
import { useUpdateUI } from '../context/UpdateContext'

const Datasets = () => {
  const { isUpdate } = useUpdateUI()
  // Use the first image available as cover image
  const [observations, setObservations] = useState<Observation[]>([])

  useEffect(() => {
    const fetchObservations = async () => {
      await getObservations()
        .then((res) => {
          setObservations(res)
          return res
        })
        .then((res) => {
          res.map(async (obs: Observation) => {
            await getObservationRawimages(obs.id)
              .then((images) => {
                setObservations((prev) => {
                  const tmp = [...prev]
                  const currObs = tmp.find((item) => item.id === obs.id)
                  if (currObs) {
                    const updTmp = tmp.filter((item) => item.id !== currObs?.id)
                    return [
                      ...updTmp,
                      { ...currObs, images: images.raw_images },
                    ]
                  }
                  return prev
                })
              })
              .catch((error) => showError(error))
          })
        })
        .catch((error) => showError(error))
    }
    fetchObservations()
  }, [isUpdate])

  return (
    <PrivateRoute>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
          height: '100%',
          padding: '40px 78px 74px 40px',
        }}
      >
        <Grid templateColumns="repeat(4, 1fr)" rowGap={100} gridGap={25}>
          {observations &&
            observations.length > 0 &&
            observations.map((obs) => (
              <DataCard
                key={obs.id}
                coverImageUrl={
                  obs?.images
                    ? `${AWS_S3_HOST}/${obs?.images[0]?.image_url}`
                    : ''
                }
                cardTitle={`Seal dataset #: ${obs.id}`}
                cardDescription={`11 Images`}
                observation={obs}
              />
            ))}
          {/* {mockData.map((mock) => {
            return (
              <DataCard
                key={mock.id}
                coverImageUrl={mock.imageData[0]}
                cardTitle={`Seal dataset #: ${mock.id}`}
                cardDescription={`${mock.imageData.length} Images`}
                observation={mock}
              />
            )
          })} */}
        </Grid>
      </div>
    </PrivateRoute>
  )
}

export default Datasets
