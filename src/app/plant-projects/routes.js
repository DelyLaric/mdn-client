export default {
  path: 'projects',
  name: 'plant projects',
  component: () => import('./index'),
  props: true,
  children: [
    {
      path: ':projectId',
      name: 'project tasks',
      component: () => import('./tasks'),
      props: true,
      children: [
        {
          path: 'create',
          name: 'project create',
          component: () => import('./create'),
          props: true
        },
        {
          path: 'manage',
          name: 'project manage',
          component: () => import('./manage'),
          children: [
            {
              path: 'destroy',
              name: 'project destroy',
              component: () => import('./manage/destroy'),
              props: true
            }
          ],
          props: true
        }
      ]
    }
  ]
}
