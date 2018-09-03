import build from './_builder'

export default build([
  ['search', 'areas/search', 'data'],
  ['create', 'areas/create', 'data.data'],
  ['destroy', 'areas/destroy'],
  ['updateName', 'areas/name/update'],
  ['updateText', 'areas/text/update'],
  ['updateComment', 'areas/comment/update'],
  ['updateColumns', 'areas/columns/update']
])
