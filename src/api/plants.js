import build from './_builder'

export default build ([
  ['search', 'plants/search', 'data'],
  ['create', 'plants/create', 'data.data'],
  ['destroy', 'plants/destroy'],
  ['updateName', 'plants/name/update'],
  ['updateComment', 'plants/comment/update']
])
