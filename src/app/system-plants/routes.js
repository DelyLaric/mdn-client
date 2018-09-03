export default {
  path: 'plants',
  name: 'plants',
  component: () => import('./index'),
  props: true,
  children: [
    {
      path: 'create',
      name: 'plant create',
      component: () => import('./create')
    },
    {
      path: ':plantId',
      name: 'plant manage',
      component: () => import('./manage'),
      children: [
        {
          path: 'destroy',
          name: 'plant destroy',
          component: () => import('./manage/destroy')
        }
      ]
    }
  ]
}
