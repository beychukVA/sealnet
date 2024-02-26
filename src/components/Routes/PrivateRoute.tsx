import { useRouter } from 'next/router'
import React, { ReactNode, useContext, useEffect } from 'react'
import { getToken, setToken } from '../../utils/LocalStorage'

interface IProps {
  children?: ReactNode
  redirectTo?: string
}

export const PrivateRoute: React.FC<IProps> = ({
  children,
  redirectTo = '/onboarding',
}) => {
  const accessToken = getToken()
  const router = useRouter()
  const shouldRedirect = !accessToken

  useEffect(() => {
    if (shouldRedirect) {
      setToken('')
      router.push(redirectTo)
    }
  }, [redirectTo, router, shouldRedirect])

  return accessToken ? <>{children}</> : null
}
