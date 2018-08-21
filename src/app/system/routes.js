import PlantRoutes from './plants/routes'
import AreaColumnRoutes from './columns/routes'

export default {
  path: 'system',
  name: 'system',
  component: () => import('./index'),
  children: [
    PlantRoutes,
    AreaColumnRoutes
  ]
}
