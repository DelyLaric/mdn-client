import build from './_builder'

export default build([
  ['create', 'data/create', 'data'],
  ['search', 'data/search', 'data'],
  ['update', 'data/update'],
  ['destroy', 'data/destroy'],
  ['upload', 'data/upload', 'data.data']
])
