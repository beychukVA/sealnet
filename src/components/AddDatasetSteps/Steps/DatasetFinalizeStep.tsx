import React from 'react'
import { CustomButton } from '../../common/CustomButton'
import { DatasetEnum } from '../lib/DatasetEnum'
import { Avatar, Collapse, List, Table } from 'antd'
import styled from '@emotion/styled'
import { IStepProps } from '../types/IDataset'

const { Panel } = Collapse

const CustomCollapse = styled(Collapse)`
  :where(.css-dev-only-do-not-override-1fviqcj).ant-collapse {
    background: transparent;
    border: none;
  }

  .ant-collapse-header-text {
    color: #22998b;
  }

  .ant-collapse-expand-icon > span > svg {
    color: #000000;
    height: 11px !important;
    width: 18px !important;
  }

  .anticon.anticon-right.ant-collapse-arrow {
    font-size: 20px;
  }

  .ant-collapse-content-box {
    background: rgba(255, 255, 255, 0.6);
  }
`

interface IProps {}

export const DatasetFinalizeStep: React.FC<IStepProps> = ({
  step,
  setStep,
  data,
  setData,
}) => {
  const dataSource = [
    {
      key: 'Location',
      name: data.location,
    },
    {
      key: 'Date Captured',
      name: data.dateCaptured,
    },
    {
      key: 'Description',
      name: data.description,
    },
  ]

  const columns = [
    { title: 'Field', dataIndex: 'key' },
    {
      title: 'Data',
      dataIndex: 'name',
      key: 'name',
    },
  ]

  const handleNext = () => {}
  const handleBack = () => setStep(DatasetEnum.DATASET_IMAGES)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '30px 56px',
          background: 'rgba(34, 153, 139, 0.1)',
          overflow: 'auto',
        }}
      >
        <CustomCollapse
          defaultActiveKey={['1', '2']}
          expandIconPosition="right"
        >
          <Panel
            header="Dataset Details"
            key="1"
            style={{
              textAlign: 'center',
              background: '#ffffff',
              borderRadius: '5px',
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '20px',
              lineHeight: '30px',
              marginBottom: '52px',
            }}
          >
            <Table
              pagination={false}
              dataSource={dataSource}
              columns={columns}
            />
          </Panel>
          <Panel
            header="Images"
            key="2"
            style={{
              textAlign: 'center',
              background: '#ffffff',
              borderRadius: '5px',
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '20px',
              lineHeight: '30px',
            }}
          >
            <p
              style={{
                textAlign: 'left',
                color: 'rgba(0, 0, 0, 0.88)',
                fontSize: '14px',
              }}
            >
              <List
                dataSource={data.images}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                      }}
                      avatar={
                        <Avatar
                          style={{
                            width: '100%',
                            maxWidth: '100px',
                            height: '100%',
                            maxHeight: '100px',
                            borderRadius: 0,
                          }}
                          src={item.thumbUrl}
                        />
                      }
                      title={<span>{item.name}</span>}
                      description={`size: ${(item?.size
                        ? item?.size / 1024 / 1024
                        : 0
                      ).toFixed(2)} MB`}
                    />
                  </List.Item>
                )}
              />
            </p>
          </Panel>
        </CustomCollapse>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: '18px',
        }}
      >
        <CustomButton onClick={handleBack}>Upload Images</CustomButton>
        <CustomButton onClick={handleNext}>Create Dataset</CustomButton>
      </div>
    </div>
  )
}
