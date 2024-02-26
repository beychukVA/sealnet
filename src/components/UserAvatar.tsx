import { UserOutlined } from '@ant-design/icons'
import { Avatar, Typography } from 'antd'
import React, { useContext } from 'react'
import { CurrentUserCntxt } from '../context/UserContext'

interface IProps {}

export const UserAvatar: React.FC<IProps> = ({}) => {
  const currentUser = useContext(CurrentUserCntxt)
  const getAvatar = (): React.ReactNode => {
    return currentUser?.profileUrl ? (
      <Avatar
        src={currentUser.profileUrl}
        style={{
          minWidth: '4100x',
          minHeight: '100px',
          maxWidth: '100px',
          maxHeight: '100px',
          background: '#7D7D7D',
        }}
      />
    ) : (
      <Avatar
        style={{
          minWidth: '100px',
          minHeight: '100px',
          maxWidth: '100px',
          maxHeight: '100px',
          background: '#7D7D7D',
        }}
        icon={<UserOutlined style={{ fontSize: '80px' }} />}
      />
    )
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '40px 0 50px 0',
      }}
    >
      {getAvatar()}
      <Typography
        style={{
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: '22px',
          lineHeight: '33px',
          color: '#000000',
          marginTop: '14px',
        }}
      >
        {currentUser?.username}
      </Typography>
    </div>
  )
}
