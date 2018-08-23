import axios from '@/core/axios'

export async function create (params) {
  const { data: { data } } = await axios.post('areas/columns', params)

  return data
}

export async function remove (name) {
  await axios.delete(`areas/columns/${name}`)
}

export async function updateName (column, name) {
  await axios.put(`areas/columns/${column}/name`, { name })
}

export async function updateText (column, text) {
  await axios.put(`areas/columns/${column}/text`, { text })
}

export async function updateComment (column, comment) {
  await axios.put(`areas/columns/${column}/comment`, { comment })
}

export async function search () {
  const { data } = await axios.get('areas/columns')

  return data
}
