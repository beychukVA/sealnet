import { Avatar, Divider, Dropdown, MenuProps, Space, Typography } from 'antd'
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
} from '@ant-design/icons'
import { CurrentUserCntxt } from '../context/UserContext'
import { useContext } from 'react'
import Link from 'next/link'
import { setToken } from '../utils/LocalStorage'

export const ProfileDropdown = () => {
  const currentUser = useContext(CurrentUserCntxt)

  const logOut = () => setToken('')

  const getAvatar = (): React.ReactNode => {
    return currentUser?.profileUrl ? (
      <Avatar
        src={currentUser.profileUrl}
        style={{
          minWidth: '41px',
          minHeight: '41px',
          maxWidth: '41px',
          maxHeight: '41px',
          background: '#7D7D7D',
        }}
      />
    ) : (
      <Avatar
        style={{
          minWidth: '41px',
          minHeight: '41px',
          maxWidth: '41px',
          maxHeight: '41px',
          background: '#7D7D7D',
        }}
        icon={<UserOutlined style={{ fontSize: '20px' }} />}
      />
    )
  }

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {`${currentUser?.username}`}
          <Divider style={{ margin: 2 }} type="horizontal" />
        </div>
      ),
    },
    {
      key: '1',
      label: (
        <Link href="/profile" style={{ padding: '10px' }}>
          <UserOutlined /> Profile
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link href="/settings" style={{ padding: '10px' }}>
          <SettingOutlined /> Settings{' '}
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link href="/" style={{ padding: '10px' }} onClick={logOut}>
          <LogoutOutlined /> Logout
        </Link>
      ),
    },
  ]

  const menuProps: MenuProps = {
    items,
  }

  return (
    <Dropdown menu={menuProps} trigger={['click']} placement="bottomRight">
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {getAvatar()}
        <Space
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '10px',
            cursor: 'pointer',
          }}
        >
          <Typography
            style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '18px',
              lineHeight: '24px',
              color: '#222222',
            }}
          >
            {currentUser?.username}
          </Typography>
          <DownOutlined
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          />
        </Space>
      </div>
    </Dropdown>
  )
}
