export default {
  path: 'columns',
  name: 'columns',
  component: () => import('./index'),
  props: true,
  children: [
    {
      path: 'create',
      name: 'column create',
      component: () => import('./create')
    },
    {
      path: ':columnId',
      name: 'column manage',
      component: () => import('./manage'),
      props: true,
      children: [
        {
          path: 'destroy',
          name: 'column destroy',
          component: () => import('./manage/destroy'),
          props: true
        }
      ]
    }
  ]
}
