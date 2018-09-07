import areas from '../system-areas/routes'
import plants from '../system-plants/routes'
import columns from '../system-area-columns/routes'
import partColumns from '../system-columns-parts/routes'

export default {
  path: 'system',
  name: 'system',
  component: () => import('./index'),
  children: [
    areas,
    plants,
    columns,
    partColumns
  ]
}
