import { message } from 'antd'
import { setToken } from './LocalStorage'

const TOKEN_ERRORS = [
  'Token is invalid or has expired',
  'You are not logged in',
]

const clearToken = (msg: any) => {
  if (TOKEN_ERRORS.includes(msg)) {
    setToken('')
  }
}

export const showError = (err: any) => {
  if (!err && !err?.response) return message.error('')
  if (err?.response?.data?.detail instanceof Array) {
    err?.response?.data?.detail?.map((e: any) => {
      clearToken(e.msg)
      return message.error(e.msg)
    })
    return
  }
  clearToken(err?.response?.data?.detail)
  message.error(err?.response?.data?.detail)
}
