import { message } from 'antd'
import { showError } from '../../../utils/showError'
import axios from '../axios/axios'

export const getSeals = async (limit = 100, page = 1) => {
  const res = await axios
    .get(`/seals`, {
      params: {
        limit,
        page,
      },
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res.seals
}

export const getSingleSeal = async (id = '') => {
  const res = await axios
    .get(`/seals/${id}`)
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}

export const updateSeal = async (
  id = '',
  name = '',
  description = '',
  created_by = ''
) => {
  const res = await axios
    .put(`/seals/${id}`, {
      name,
      description,
      created_by,
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}

export const createSeal = async (
  name = '',
  description = '',
  created_by = ''
) => {
  const res = await axios
    .post(`/seals/`, {
      name,
      description,
      created_by,
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}

export const deleteSeal = async (id = '') => {
  const res = await axios
    .delete(`/seals/${id}`)
    .then((res) => message.info('Deleted successfully'))
    .catch((error) => message.error(error.response.data.detail))
  return res
}

export const getSealObservations = async (id = '', limit = 100, page = 1) => {
  const res = await axios
    .get(`/seals/${id}/observations`, {
      params: {
        limit,
        page,
      },
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res.seals
}
