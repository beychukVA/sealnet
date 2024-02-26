import { Avatar, Card } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

import DatasetModal from './DatasetModal'
import { Observation } from '../types/Observation'
import styled from '@emotion/styled'

const { Meta } = Card

interface DataCardProps {
  cardTitle?: string
  cardDescription?: string
  children?: React.ReactNode
  altText?: string
  onClick?: () => void
  coverImageUrl: string
  observation: Observation
}

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

const DataCard = ({
  cardTitle,
  cardDescription,
  children,
  altText,
  onClick,
  coverImageUrl,
  observation,
}: DataCardProps) => {
  return (
    <DatasetModal observation={observation} imgCount={cardDescription}>
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
            alt={altText || ''}
            src={coverImageUrl}
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
        {observation.status === 'verified' && (
          <CheckCircleOutlined
            style={{
              position: 'absolute',
              top: '9px',
              right: '7px',
              fontSize: '27px',
              color: '#22998B',
            }}
          />
        )}
        <Meta title={cardTitle} description={cardDescription} />
      </CustomCard>
    </DatasetModal>
  )
}

export default DataCard
