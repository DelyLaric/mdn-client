import schema from './schema'

export default {
  path: 'tables/:table/groups/:groupId',
  name: 'plant table',
  component: () => import('./index'),
  props: route => ({ ...route.params, schema }),
  children: [
    {
      path: 'data',
      name: 'plant table data',
      component: () => import('./data')
    },
    {
      path: 'upload',
      name: 'plant table data upload',
      component: () => import('./upload')
    }
  ]
}
