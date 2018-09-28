import data from '../plant-data/routes'
import projects from '../plant-projects/routes'
import areaManage from '../plant-task-manage/area-manage/routes'
import areasManage from '../plant-task-manage/areas-manage/routes'

export default {
  path: 'plants/:plantId',
  name: 'plant index',
  component: () => import('./index'),
  props: true,
  children: [
    data,
    projects,
    areasManage,
    areaManage
  ]
}
