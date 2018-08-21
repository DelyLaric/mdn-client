import axios from '@/core/axios'

export async function create (params) {
  const { data: { data } } = await axios.post('plants', params)

  return data
}

export async function remove (plant) {
  await axios.delete(`plants/${plant}`)
}

export async function updateName (plant, name) {
  await axios.put(`plants/${plant}/name`, { name })
}

export async function updateComment (plant, comment) {
  await axios.put(`plants/${plant}/comment`, { comment })
}

export async function search () {
  const { data } = await axios.get('plants')

  return data
}
