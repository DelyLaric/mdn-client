import data from '../plant-data/routes'
import projects from '../plant-projects/routes'

export default {
  path: 'plants/:plantId',
  name: 'plant index',
  component: () => import('./index'),
  props: true,
  children: [
    data,
    projects
  ]
}
