import build from './_builder'

export default build([
  ['search', 'tasks/search', 'data'],
  ['create', 'tasks/create', 'data'],
  ['destroy', 'tasks/destroy'],
  ['updateStatus', 'tasks/status/update'],
  ['updateComment', 'tasks/comment/update'],
  ['updateDuetime', 'tasks/duetime/update'],
  ['addArea', 'tasks/areas/add'],
  ['removeArea', 'tasks/areas/remove'],
  ['updateAreaLocation', 'tasks/areas/location/update', 'data'],
  ['updatePart', 'tasks/part/update', 'data'],
  ['updateLine', 'tasks/line/update', 'data'],
  ['searchArea', 'tasks/area/search', 'data'],
  ['searchAreas', 'tasks/areas/search', 'data']
])
