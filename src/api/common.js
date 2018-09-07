import axios from '@/core/axios'

export async function validate (params) {
  const res = await axios.post('common/validate', params)

  return res
}

export default {
  validate
}
