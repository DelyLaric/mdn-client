export default {
  path: 'tables/:table/groups/:groupId',
  name: 'plant table',
  component: () => import('./index'),
  props: true,
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
