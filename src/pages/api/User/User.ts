import { message } from 'antd'
import { setToken } from '../../../utils/LocalStorage'
import { showError } from '../../../utils/showError'
import axios from '../axios/axios'

/**
 * ADMIN: 
Login: admin@sealnet.com
Password: x2ZHD#BbxBr&u#CkJMCQ!wkPCZm9Dr
 */

export const Login = async (email = '', password = '') => {
  await axios
    .post(`/auth/login`, {
      email,
      password,
    })
    .then((res) => {
      const token = res.data.access_token
      if (token) {
        message.success('Logged in successfully')
        setToken(token)
      }
    })
    .catch((error) => showError(error))
}

export const Register = async (email = '', username = '', password = '') => {
  await axios
    .post(`/auth/register`, {
      email,
      username,
      password,
    })
    .then((res) => {
      message.success('Registr successfully')
    })
    .catch((error) => showError(error))
}

export const GetCurrentUser = async () => {
  const user = await axios
    .get(`/users/me`)
    .then((res) => {
      return res.data
    })
    .catch((error) => showError(error))
  return user
}

export const GetUserById = async (id = '') => {
  const user = await axios
    .get(`/users/id/${id}`)
    .then((res) => {
      return res.data
    })
    .catch((error) => showError(error))
  return user
}

export const GetUserByEmail = async (email = '') => {
  const user = await axios
    .get(`/users/email/${email}`)
    .then((res) => {
      return res.data
    })
    .catch((error) => showError(error))
  return user
}

export const deleteUserById = async (id = '') => {
  const res = await axios
    .delete(`/users/${id}`)
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}

export const assignUserAdminRole = async (id = '') => {
  const res = await axios
    .put(`/users/${id}/system_role`, {
      sys_admin: true,
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}
