import axios from '@/core/axios'

export async function search (params) {
  const { data } = await axios.post('projects/search', params)

  return data
}

export async function create (params) {
  const { data: { data } } = await axios.post('projects/create', params)

  return data
}

export async function updateName (params) {
  await axios.post('projects/update/name', params)
}

export async function updateText (params) {
  await axios.post('projects/update/text', params)
}

export async function updateComment (params) {
  await axios.post('projects/update/comment', params)
}

export async function file (id) {
  const { data: { data } } = await axios.post('projects/file', {id})

  return data
}

export async function reopen (id) {
  await axios.post('projects/reopen', {id})
}

export async function destroy (id) {
  await axios.post('projects/destroy', {id})
}
