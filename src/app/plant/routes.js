export default {
  path: 'plants/:plantId',
  name: 'plant index',
  component: () => import('./index'),
  props: true,
  children: [
    {
      path: 'areas/:areaId',
      name: 'plant area',
      component: () => import('./area'),
      props: true,
      children: [
        {
          path: 'locations',
          name: 'area locations',
          component: () => import('./area/locations'),
          props: true
        },
        {
          path: 'locations/upload',
          name: 'locations upload',
          component: () => import('./area/upload'),
          props: true
        }
      ]
    },
    {
      path: 'projects',
      name: 'plant projects',
      component: () => import('./projects'),
      props: true,
      children: [
        {
          path: 'create',
          name: 'project create',
          component: () => import('./projects/create'),
          props: true
        },
        {
          path: ':projectId',
          name: 'project manage',
          component: () => import('./projects/manage'),
          props: true,
          children: [
            {
              path: 'delete',
              name: 'project delete',
              component: () => import('./projects/manage/delete'),
              props: true
            }
          ]
        }
      ]
    }
  ]
}
