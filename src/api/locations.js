import axios from '@/core/axios'

export async function search (params) {
  const { data } = await axios.post('locations/search', params)

  return data
}

export async function update (items) {
  if (!Array.isArray(items)) {
    items = [items]
  }

  const { data } = await axios.post('locations/update', {
    data: items
  })

  return data
}

export async function remove (ids) {
  if (!Array.isArray(ids)) {
    ids = [ids]
  }

  const { data } = await axios.post('locations/delete', {
    ids
  })

  return data
}
