export default {
  path: 'plants',
  name: 'plants',
  component: () => import('./index'),
  children: [
    {
      path: 'create',
      name: 'plant create',
      component: () => import('./create')
    },
    {
      path: ':plant',
      name: 'plant manage',
      component: () => import('./plant'),
      props: true,
      children: [
        {
          path: 'delete',
          name: 'plant delete',
          component: () => import('./plant/delete'),
          props: true
        }
      ]
    }
  ]
}
