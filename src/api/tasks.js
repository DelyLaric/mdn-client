import build from './_builder'

export default build([
  ['search', 'tasks/search', 'data'],
  ['create', 'tasks/create', 'data'],
  ['destroy', 'tasks/destroy'],
  ['updateStatus', 'tasks/status/update'],
  ['updateComment', 'tasks/comment/update'],
])
