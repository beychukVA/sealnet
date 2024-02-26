import { showError } from '../../../utils/showError'
import axios from '../axios/axios'

export const updateObservationAccess = async (id = '', role = '') => {
  const res = await axios
    .put(`/access/${id}`, {
      role,
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}

export const deleteObservationAccess = async (id = '') => {
  const res = await axios
    .delete(`/access/${id}`)
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}

export const addObservationAccess = async (
  id = '',
  role = 'admin',
  user_id = ''
) => {
  const res = await axios
    .post(`/observations/${id}/access`, {
      role,
      user_id,
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}

export const getObservationAccess = async (id = '', limit = 100, page = 1) => {
  const res = await axios
    .get(`/observations/${id}/access`, {
      params: {
        limit,
        page,
      },
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res.access_links
}

export const getObservations = async (limit = 100, page = 1) => {
  const res = await axios
    .get(`/observations`, {
      params: {
        limit,
        page,
      },
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res.observations
}

export const getObservationSeals = async (id = '', limit = 100, page = 1) => {
  const res = await axios
    .get(`/observations/${id}/seals`, {
      params: {
        limit,
        page,
      },
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res.seals
}

export const createObservations = async (
  latitude = 0,
  longitude = 0,
  captured_at = '',
  description = ''
) => {
  const res = await axios
    .post('/observations', {
      latitude,
      longitude,
      captured_at,
      description,
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}

export const getSingleObservations = async (id = '') => {
  const res = await axios
    .get(`/observations/${id}`)
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}

export const getObservationRawimages = async (
  id = '',
  limit = 100,
  page = 1
) => {
  const res = await axios
    .get(`/observations/${id}/rawimages`, {
      params: {
        limit,
        page,
      },
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}

export const updateObservations = async (
  id = '',
  latitude = 0,
  longitude = 0,
  captured_at = '',
  status = '',
  description = '',
  created_by = ''
) => {
  const res = await axios
    .put(`/observations/${id}`, {
      latitude,
      longitude,
      captured_at,
      status,
      description,
      created_by,
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}
