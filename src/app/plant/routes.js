import areas from '../plant-areas/routes'
import projects from '../plant-projects/routes'

export default {
  path: 'plants/:plantId',
  name: 'plant index',
  component: () => import('./index'),
  props: true,
  children: [
    areas,
    projects
  ]
}
