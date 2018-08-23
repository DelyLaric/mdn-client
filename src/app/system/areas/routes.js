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
      component: () => import('./area'),
      props: true,
      children: [
        {
          path: 'delete',
          name: 'area delete',
          component: () => import('./area/delete'),
          props: true
        }
      ]
    },
  ]
}
