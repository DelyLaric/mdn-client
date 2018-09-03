import build from './_builder'

export default build([
  ['search', 'locations/search', 'data'],
  ['create', 'locations/create', 'data'],
  ['update', 'locations/update'],
  ['destroy', 'locations/destroy']
])
