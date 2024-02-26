export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage?.getItem('token')
  }
}

export const setToken = (token: string) => {
  return localStorage.setItem('token', token)
}
