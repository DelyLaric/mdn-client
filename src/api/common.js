import axios from '@/core/axios'

export async function validate (params) {
  const res = await axios.post('common/validate', params)

  return res
}

export async function upload(params) {
  const { data: {data} } = await axios.post('common/upload', params)

  return data
}
