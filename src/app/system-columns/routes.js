export default {
  path: 'tables/:table/columns',
  name: 'system table columns',
  component: () => import('./index'),
  props: true,
  children: [
    {
      path: 'create',
      name: 'system table column create',
      component: () => import('./create')
    },
    {
      path: ':columnId',
      name: 'system table column manage',
      component: () => import('./manage'),
      children: [
        {
          path: 'destroy',
          name: 'system table column destroy',
          component: () => import('./manage/destroy'),
        }
      ]
    }
  ]
}
