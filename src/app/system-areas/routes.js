export default {
  path: 'areas',
  name: 'areas',
  component: () => import('./index'),
  props: true,
  children: [
    {
      path: 'plants/:plantId/create',
      name: 'area create',
      component: () => import('./create')
    },
    {
      path: ':areaId',
      name: 'area manage',
      component: () => import('./manage'),
      children: [
        {
          path: 'destroy',
          name: 'area destroy',
          component: () => import('./manage/destroy')
        }
      ]
    }
  ]
}
