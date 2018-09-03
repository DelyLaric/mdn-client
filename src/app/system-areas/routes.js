export default {
  path: 'areas',
  name: 'areas',
  component: () => import('./index'),
  children: [
    {
      path: 'plants/:plantId/create',
      name: 'area create',
      component: () => import('./create'),
      props: true
    },
    {
      path: ':areaId',
      name: 'area manage',
      component: () => import('./manage'),
      props: true,
      children: [
        {
          path: 'destroy',
          name: 'area destroy',
          component: () => import('./manage/destroy'),
          props: true
        }
      ]
    },
  ]
}
