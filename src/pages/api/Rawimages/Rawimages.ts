import { showError } from '../../../utils/showError'
import axios from '../axios/axios'

export const uploadImage = async (observationId: string, data: File) => {
  const formData = new FormData()
  formData.append('file', data, data.name)

  const res = await axios
    .post(`/observations/${observationId}/rawimages`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}

export const deleteRawimage = async (id = '') => {
  const res = await axios
    .delete(`/rawimages/${id}`)
    .then((res) => res.data)
    .catch((error) => showError(error))
  return res
}
