import build from './_builder'

export default build([
  ['search', 'columns/search', 'data'],
  ['create', 'columns/create', 'data.data'],
  ['destroy', 'columns/destroy'],
  ['updateName', 'columns/name/update'],
  ['updateText', 'columns/text/update'],
  ['updateComment', 'columns/comment/update']
])
