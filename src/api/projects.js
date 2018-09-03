import build from './_builder'

export default build([
  ['search', 'projects/search', 'data'],
  ['create', 'projects/create', 'data.data'],
  ['file', 'projects/file', 'data.data'],
  ['reopen', 'projects/reopen'],
  ['destroy', 'projects/destroy'],
  ['updateName', 'projects/name/update'],
  ['updateText', 'projects/text/update'],
  ['updateComment', 'projects/comment/update'],
])
