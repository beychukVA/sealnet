import { useContext, useState } from 'react'
import { Modal, Layout, Menu, Tag, MenuProps } from 'antd'
import { UserOutlined, SettingOutlined } from '@ant-design/icons'
import { CurrentUserCntxt } from '../context/UserContext'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = {
  label: string
  key: React.Key
  icon: React.ReactNode
  link?: string
  children?: MenuItem[]
}

interface ProfileModalProps {
  children?: React.ReactNode
}

const items: MenuItem[] = [
  { label: 'Profile', key: '1', icon: <UserOutlined /> },
  { label: 'Settings', key: '2', icon: <SettingOutlined /> },
]

const ProfileModal = (props: ProfileModalProps) => {
  const [modalOpen, setModalOpen] = useState(false)

  const currentUser = useContext(CurrentUserCntxt)

  const handleMenuItemClick: MenuProps['onClick'] = (e) => {
    // console.log(e)
  }

  return (
    <>
      <div onClick={() => setModalOpen(true)}>{props.children}</div>
      <Modal
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={'65%'}
      >
        <Layout style={{ backgroundColor: 'white' }}>
          <Sider>
            <Menu
              theme="light"
              defaultOpenKeys={['1']}
              mode="inline"
              items={items}
              onClick={handleMenuItemClick}
            />
          </Sider>
          <Content>
            <div></div>
          </Content>
        </Layout>
      </Modal>
    </>
  )
}

export default ProfileModal
