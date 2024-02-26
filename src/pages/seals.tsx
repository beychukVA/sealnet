import React, { useState, useEffect } from 'react'
import RecognitionModal from '../components/RecognitionModal'
import { Card } from 'antd'
import { Grid } from '@chakra-ui/react'
import { PrivateRoute } from '../components/Routes/PrivateRoute'
import styled from '@emotion/styled'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Seal } from '../types/SealTypes'
import { getSeals } from './api/Seals/Seals'
import { showError } from '../utils/showError'
import { AWS_S3_HOST } from './api/axios/axios'

const { Meta } = Card

const CustomCard = styled(Card)`
  :where(.css-dev-only-do-not-override-1fviqcj).ant-card {
    width: 257px;
    height: 158px;
    border-radius: 9px;
  }

  :where(.css-dev-only-do-not-override-1fviqcj).ant-card
    .ant-card-meta-detail
    > div:not(:last-child) {
    margin-bottom: 10px;
  }

  :where(.css-dev-only-do-not-override-1fviqcj).ant-card-bordered
    .ant-card-cover {
    border-radius: 9px 9px 0 0;
    background: #d9d9d9;
  }

  .ant-card-meta .ant-card-meta-detail .ant-card-meta-title {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #222222;
    margin-bottom: 6px !important;
  }

  .ant-card-meta .ant-card-meta-detail .ant-card-meta-description {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #222222;
  }
`

const mockSeals = [
  {
    name: 'string',
    description: 'string',
    created_by: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    created_at: '2023-05-23T16:25:53.651Z',
    updated_at: '2023-05-23T16:25:53.651Z',
  },
  {
    name: 'string',
    description: 'string',
    created_by: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
    created_at: '2023-05-23T16:25:53.651Z',
    updated_at: '2023-05-23T16:25:53.651Z',
  },
  {
    name: 'string',
    description: 'string',
    created_by: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
    created_at: '2023-05-23T16:25:53.651Z',
    updated_at: '2023-05-23T16:25:53.651Z',
  },
]

const Seals = () => {
  const [seals, setSeals] = useState<Seal[]>([])

  useEffect(() => {
    const fetchSeals = async () => {
      await getSeals()
        .then((res) => setSeals(res))
        .catch((error) => showError(error))
    }
    fetchSeals()
  }, [])

  console.log('EVT: seals', seals)

  return (
    // <PrivateRoute>
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
        {seals &&
          seals.map((seal) => {
            return (
              <RecognitionModal key={`seal-${seal.id}`} seal={seal}>
                <CustomCard
                  hoverable
                  cover={
                    <img
                      style={{
                        objectFit: 'cover',
                        borderRadius: '9px 9px 0 0',
                        border: '1px solid #d9d9d9',
                        minWidth: '257px',
                        minHeight: '158px',
                        maxWidth: '257px',
                        maxHeight: '158px',
                      }}
                      width={257}
                      height={158}
                      alt={`${seal.name}`}
                      src={
                        seal.image_url ? `${AWS_S3_HOST}/${seal.image_url}` : ''
                      }
                    />
                  }
                  actions={[]}
                  bodyStyle={{
                    height: '75px',
                    padding: '14px 15px',
                    background: '#ffffff',
                    margin: '0 -1px',
                    borderRadius: ' 0 0 9px 9px',
                  }}
                >
                  {/* {mock?.status === 'verified' && (
                    <CheckCircleOutlined
                      style={{
                        position: 'absolute',
                        top: '9px',
                        right: '7px',
                        fontSize: '27px',
                        color: '#22998B',
                      }}
                    />
                  )} */}
                  <Meta title={`Seal #${seal.id}`} description={seal.name} />
                </CustomCard>
              </RecognitionModal>
            )
          })}
      </Grid>
    </div>
    // </PrivateRoute>
  )
}

export default Seals
