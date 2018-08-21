import axios from '@/core/axios'

export async function validate (params) {
  const res = await axios.post('validate', params)

  return res
}
