import axios from '@/core/axios'

export async function search (params) {
  const { data } = await axios.post('tasks/search', params)

  return data
}

export async function create (params) {
  const { data } = await axios.post('tasks/create', params)

  return data
}

export async function destroy (params) {
  await axios.post('tasks/destroy', params)
}

export async function updateComment (params) {
  await axios.post('tasks/comment/update', params)
}

export default {
  create,
  search,
  destroy,
  updateComment
}
