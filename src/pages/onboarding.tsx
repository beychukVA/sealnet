import React, { ReactElement, useState, useMemo } from 'react'
import { OnboardingLayout } from '../components/Layouts/OnboardingLayout'
import { LoginForm } from '../components/LoginForm'
import { PublicRoute } from '../components/Routes/PublicRoute'
import { SignUpForm } from '../components/SignUpForm'

interface IProps {}

export interface IOnboardingMenu {
  MENU_REGISTRATION: string
  MENU_LOGIN: string
}

const menu: IOnboardingMenu = {
  MENU_REGISTRATION: 'menu_registration',
  MENU_LOGIN: 'menu_login',
}

const Onboarding = ({}: IProps) => {
  const [selectedMenu, setSelectedMenu] = useState<string>(menu.MENU_LOGIN)
  const handleChangeMenu = (menuItem: string) => setSelectedMenu(menuItem)

  const currMenu = useMemo(() => {
    switch (selectedMenu) {
      case menu.MENU_LOGIN:
        return <LoginForm menu={menu} handleChangeMenu={handleChangeMenu} />
      case menu.MENU_REGISTRATION:
        return <SignUpForm menu={menu} handleChangeMenu={handleChangeMenu} />

      default:
        return <LoginForm menu={menu} handleChangeMenu={handleChangeMenu} />
    }
  }, [selectedMenu])

  return (
    <PublicRoute restricted>
      <OnboardingLayout>{currMenu}</OnboardingLayout>
    </PublicRoute>
  )
}

export default Onboarding

Onboarding.getLayout = (page: ReactElement) => page
