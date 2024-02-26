import { showError } from '../../../utils/showError'
import axios from '../axios/axios'

export const getRawimageAnnotations = async (
  id = '',
  limit = 100,
  page = 1
) => {
  const res = await axios
    .get(`/rawimages/${id}/annotations`, {
      params: {
        limit,
        page,
      },
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}

export const createAnnotations = async (id = '', bounding_box = []) => {
  const res = await axios
    .post(`/rawimages/${id}/annotations`, {
      bounding_box,
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}
