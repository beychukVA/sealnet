import axios from 'axios'
import { getToken } from '../../../utils/LocalStorage'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const AWS_S3_HOST = process.env.NEXT_PUBLIC_AWS_S3_HOST

const instance = axios.create({
  baseURL: BASE_URL,
})
instance.interceptors.request.use(function (config) {
  const token = getToken()
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})
// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.data.status_msg) {
      console.log(error.response.data.status_msg)
    }
    return error
  }
)

export default instance
