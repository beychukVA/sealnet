import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useMemo } from 'react'
import { Home, Database, ChevronLeft } from 'react-feather'
import MenuAccordion from '../components/MenuAccordion'

const menuItems = [
  { id: 1, label: 'Home', icon: Home, link: '/' },
  { id: 2, label: 'Datasets', icon: Database, link: '/datasets' },
]

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false)
  const [isCollapsible, setIsCollapsible] = useState(false)

  const router = useRouter()

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  )

  const wrapperClasses = classNames(
    'h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col',
    {
      ['w-80']: !toggleCollapse,
      ['w-20']: toggleCollapse,
    }
  )

  const collapseIconClasses = classNames(
    'p-4 rounded bg-light-lighter absolute right-0',
    {
      'rotate-180': toggleCollapse,
    }
  )

  const getNavItemClasses = () => {
    return classNames(
      'flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap'
      // {
      //   ["bg-light-lighter"]: activeMenu.id === menu.id,
      // }
    )
  }

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible)
  }

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse)
  }

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: 'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s' }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <span
              className={classNames('mt-2 text-6xl font-large text-text', {
                hidden: toggleCollapse,
              })}
            >
              🤖 ❤ 🦭
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <ChevronLeft />
            </button>
          )}
        </div>

        <div>
          <MenuAccordion />
        </div>
      </div>

      <div className={`${getNavItemClasses()} px-3 py-4`}>
        <div style={{ width: '2.5rem' }}></div>
        {!toggleCollapse && (
          <span className={classNames('text-md font-medium text-text-light')}>
            Logout
          </span>
        )}
      </div>
    </div>
  )
}

export default Sidebar
