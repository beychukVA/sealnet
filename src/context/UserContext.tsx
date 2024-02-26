import { message } from 'antd'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { GetCurrentUser } from '../pages/api/User/User'
import { User } from '../types/UserTypes'
import { setToken } from '../utils/LocalStorage'
import { showError } from '../utils/showError'

export const CurrentUserCntxt = createContext<User | null>(null)
export const useCurrentUserCntxt = (): User | null =>
  useContext(CurrentUserCntxt)

export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [currentUser, setCurrentUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await GetCurrentUser()
        .then((user) => {
          setCurrentUser(user)
          return user
        })
        .catch((error) => showError(error))
      if (!user) {
        setToken('')
        router.push('/onboarding')
      }
    }
    if (!currentUser && router.pathname !== '/onboarding') fetchCurrentUser()
  })

  return (
    <CurrentUserCntxt.Provider value={currentUser}>
      {children}
    </CurrentUserCntxt.Provider>
  )
}
