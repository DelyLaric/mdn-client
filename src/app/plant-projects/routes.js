export default {
  path: 'projects',
  name: 'plant projects',
  component: () => import('./index'),
  props: true,
  children: [
    {
      path: ':projectId/tasks',
      name: 'project tasks',
      component: () => import('../plant-project-tasks'),
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
        },
        {
          path: ':taskId/destroy',
          name: 'task destroy',
          component: () => import('../plant-project-tasks/destroy'),
          props: true
        }
      ]
    }
  ]
}
