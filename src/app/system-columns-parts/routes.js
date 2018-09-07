export default {
  path: 'parts/columns',
  name: 'parts columns',
  component: () => import('./index'),
  props: true,
  children: [
    {
      path: 'create',
      name: 'parts column create',
      component: () => import('./create')
    },
    {
      path: ':columnId',
      name: 'parts column manage',
      component: () => import('./manage'),
      children: [
        {
          path: 'destroy',
          name: 'parts column destroy',
          component: () => import('./manage/destroy'),
        }
      ]
    }
  ]
}
