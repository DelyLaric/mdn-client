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
    }
  ]
}
