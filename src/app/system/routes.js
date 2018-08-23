import AreaRoutes from './areas/routes'
import PlantRoutes from './plants/routes'
import AreaColumnRoutes from './columns/routes'

export default {
  path: 'system',
  name: 'system',
  component: () => import('./index'),
  children: [
    AreaRoutes,
    PlantRoutes,
    AreaColumnRoutes
  ]
}
