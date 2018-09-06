export default {
  path: 'area/columns',
  name: 'area columns',
  component: () => import('./index'),
  props: true,
  children: [
    {
      path: 'create',
      name: 'area column create',
      component: () => import('./create')
    },
    {
      path: ':columnId',
      name: 'area column manage',
      component: () => import('./manage'),
      props: true,
      children: [
        {
          path: 'destroy',
          name: 'area column destroy',
          component: () => import('./manage/destroy'),
          props: true
        }
      ]
    }
  ]
}
