import { Menu, Layout, MenuProps, Typography } from 'antd'

import MenuItem from 'antd/lib/menu/MenuItem'
import { useRouter } from 'next/router'
import { ProfileDropdown } from '../ProfileDropdown'
import styled from '@emotion/styled'
import { useContext, useEffect, useState } from 'react'
import { CurrentUserCntxt } from '../../context/UserContext'
import { UserAvatar } from '../UserAvatar'
import {
  BulbOutlined,
  EnvironmentOutlined,
  FileSearchOutlined,
  FolderOutlined,
  HddOutlined,
  ScanOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { FloatAddButton } from '../FloatAddButton'

const { Content, Sider, Header } = Layout

const CustomMenu = styled(Menu)`
  && .ant-menu-submenu {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: #ffffff;
  }

  && .ant-menu-submenu ul {
    background: linear-gradient(180deg, #e6fcf9 0%, #ffffff 134.61%) !important;
    /* margin-top: 14px; */
  }

  && .ant-menu-submenu.ant-menu-submenu-active .ant-menu-submenu-title,
  && .ant-menu-submenu-open .ant-menu-submenu-title {
    background: linear-gradient(90.18deg, #22998b 0.16%, #0e9282 99.86%);
    color: #ffffff !important;
    border-radius: 0px 25.5px 25.5px 0px;
  }

  && .ant-menu-submenu-title {
    width: 100%;
    height: auto;
    margin: 0;
    border-radius: 0;
    padding: 14px 25px !important;
    line-height: 15px !important;
    color: #222222;
    margin-bottom: 2px;
  }

  .ant-menu-submenu > .ant-menu-submenu-title .ant-menu-submenu-arrow {
    transition: transform 0.3s ease-in-out !important;
    transform: rotate(-90deg) !important;
    right: 25px;
  }

  .ant-menu-submenu-open > .ant-menu-submenu-title .ant-menu-submenu-arrow {
    transition: transform 0.3s ease-in-out !important;
    transform: rotate(180deg) !important;
  }

  .ant-menu-item.ant-menu-item-only-child {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #222222;
    border-radius: 0 !important;
    width: 100% !important;
    margin: 0 !important;
  }

  .ant-menu-submenu-selected > .ant-menu-submenu-title {
    color: #ffffff !important;
  }

  .ant-menu-item {
    border-radius: 0 !important;
    width: 100% !important;
    margin: 0 !important;
    padding-left: 61px !important;
  }

  .ant-menu-item.ant-menu-item-active,
  .ant-menu-item.ant-menu-item-selected {
    background: #c9fff8 !important;
  }

  :where(.css-dev-only-do-not-override-1fviqcj).ant-menu-light
    .ant-menu-item-selected,
  :where(.css-dev-only-do-not-override-1fviqcj).ant-menu-light
    > .ant-menu
    .ant-menu-item-selected {
    background: #c9fff8 !important;
  }

  .ant-menu-item .ant-menu-title-content {
    width: 100%;
    padding: 7px 0;
  }

  :where(.css-dev-only-do-not-override-1fviqcj).ant-menu-inline .ant-menu-item {
    line-height: 100% !important;
  }

  span.ant-menu-title-content {
    margin-inline-start: 15px !important;
  }

  span.anticon.ant-menu-item-icon {
    min-width: 20px;
    min-height: 20px;
    color: #21998a;

    & svg {
      width: 100%;
      height: 100%;
    }
  }

  .ant-menu-submenu-open span.anticon.ant-menu-item-icon,
  .ant-menu-submenu-active span.anticon.ant-menu-item-icon {
    color: currentColor;
  }

  .ant-menu.ant-menu-sub span.anticon.ant-menu-item-icon {
    color: #21998a;
  }

  .ant-menu.ant-menu-sub
    .ant-menu-item.ant-menu-item-selected
    span.anticon.ant-menu-item-icon {
    color: #109283;
  }

  .ant-menu.ant-menu-sub .ant-menu-title-content {
    color: #222222;
  }
`

interface AppLayoutProps {
  children?: React.ReactNode
  contentStyle?: React.CSSProperties
}

type MenuItem = {
  label: string
  key: React.Key
  icon: React.ReactNode
  link?: string
  children?: MenuItem[]
}

const items: MenuItem[] = [
  {
    label: 'Data Overview',
    key: '1',
    icon: <FileSearchOutlined />,
    link: '/datasets',
    children: [
      // {
      //   label: 'Add Dataset',
      //   key: '2',
      //   icon: <FolderOutlined />,
      //   link: '/datasets/add',
      // },
      {
        label: 'Detect Faces',
        key: '3',
        icon: <ScanOutlined />,
        link: '/datasets/detect-faces',
      },
      {
        label: 'Clean Data',
        key: '4',
        icon: <HddOutlined />,
        link: '/datasets/clean-data',
      },
    ],
  },
  {
    label: 'Known Seals',
    key: '6',
    icon: <BulbOutlined />,
    link: '/seals',
    children: [
      {
        label: 'Detect Seals',
        key: '7',
        icon: <SearchOutlined />,
        link: '/seals/detect-seals',
      },
    ],
  },
  {
    label: 'View Seal Map',
    key: '8',
    icon: <EnvironmentOutlined />,
    link: '/sealmap',
    children: [],
  },
]

// const flatItems = items.flatMap(item => item.children):

const AppLayout = (props: AppLayoutProps) => {
  const currentUser = useContext(CurrentUserCntxt)
  const [showComponent, setShowComponent] = useState(false)
  const router = useRouter()
  const [openKeys, setOpenKeys] = useState([''])
  const rootSubmenuKeys = ['1', '6', '8']

  useEffect(() => setShowComponent(true), [])

  useEffect(() => {
    const link = items.find((item) => router.pathname.includes(item.link!))
    if (link) setOpenKeys([link.key.toString()])
  }, [])

  const handleMenuItemClick: MenuProps['onClick'] = (e) => {
    const item = items.find((item) => item.key === e.keyPath[1])
    const link = item?.children?.find((child) => child.key === e.keyPath[0])
    if (link?.link) {
      router.push(link?.link)
    }
  }

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
    if (latestOpenKey) {
      const link = items.find((item) => item.key === latestOpenKey)
      if (link?.link) {
        router.push(link.link)
      }
    } else {
      router.push('/')
    }
  }

  // const pathitem = flatitems.filter(item => item.link === props.currentpath)
  // let expandedindex = []
  // if (pathitem.length > 0) {
  // 	expandedindex = [pathitem[0].key]
  // } else {
  // 	expandedindex = ['1']
  // }

  const selectedMenuItem = items
    .flatMap((item) => item.children)
    .find((item) => item?.link === router.pathname)

  if (!showComponent) return null

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Sider
        width={219}
        style={{
          background: 'linear-gradient(180deg, #E6FCF9 0%, #FFFFFF 134.61%)',
        }}
      >
        <UserAvatar />
        <CustomMenu
          style={{
            background: 'linear-gradient(180deg, #E6FCF9 0%, #FFFFFF 134.61%)',
          }}
          openKeys={openKeys}
          selectedKeys={[selectedMenuItem?.key.toString() || '']}
          expandIcon
          mode="inline"
          items={items}
          onClick={handleMenuItemClick}
          onOpenChange={onOpenChange}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{ height: '100vh', width: '100%', overflowY: 'auto' }}
      >
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#ffffff',
          }}
        >
          <Typography
            style={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '22px',
              lineHeight: '33px',
              color: '#333333',
            }}
          >
            Good afternoon, {currentUser?.username}.
          </Typography>
          <ProfileDropdown />
        </Header>
        <Content style={{ margin: '0', overflow: 'auto' }}>
          <div style={{ width: '100%', height: '100%' }}>{props.children}</div>
          <FloatAddButton />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
