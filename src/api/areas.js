import axios from '@/core/axios'

export async function search () {
  const { data } = await axios.get('areas')

  return data
}

export async function create (params) {
  const { data: { data } } = await axios.post('areas', params)

  return data
}

export async function remove (id) {
  await axios.delete('areas/' + id)
}

export async function updateName (id, name) {
  await axios.put(`areas/${id}/name`, { name })
}

export async function updateText (id, text) {
  await axios.put(`areas/${id}/text`, { text })
}

export async function updateComment (id, comment) {
  await axios.put(`areas/${id}/comment`, { comment })
}

export async function updateColumns (id, columns) {
  await axios.put(`areas/${id}/columns`, { columns})
}
