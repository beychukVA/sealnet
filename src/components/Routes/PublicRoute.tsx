import { useRouter } from 'next/router'
import React, { ReactNode, useEffect } from 'react'
import { getToken } from '../../utils/LocalStorage'

interface IProps {
  children?: ReactNode
  redirectTo?: string
  restricted: boolean
}

export const PublicRoute: React.FC<IProps> = ({
  children,
  redirectTo = '/',
  restricted = false,
}) => {
  const router = useRouter()
  const token = getToken()
  const shouldRedirect = token && restricted

  useEffect(() => {
    if (shouldRedirect) {
      router.push(redirectTo)
    }
  }, [redirectTo, router, shouldRedirect])

  return shouldRedirect ? null : <>{children}</>
}
