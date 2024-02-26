import { showError } from '../../../utils/showError'
import axios from '../axios/axios'

export const updateSealId = async (id = '', seal_id = '') => {
  const res = await axios
    .put(`/annotations/${id}`, {
      seal_id,
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}

export const deleteAnnotations = async (id = '') => {
  const res = await axios
    .delete(`/annotations/${id}`)
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}

export const recognize = async (id = '', limit = '5') => {
  const res = await axios
    .post(`/annotations/${id}/recognize`, {
      limit,
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}
