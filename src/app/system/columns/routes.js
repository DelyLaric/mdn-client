export default {
  path: 'columns',
  name: 'area columns',
  component: () => import('./index'),
  children: [
    {
      path: 'create',
      name: 'area column create',
      component: () => import('./create')
    },
    {
      path: ':column',
      name: 'area column manage',
      component: () => import('./column'),
      props: true,
      children: [
        {
          path: 'delete',
          name: 'area column delete',
          component: () => import('./column/delete'),
          props: true
        }
      ]
    }
  ]
}
