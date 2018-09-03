export default     {
  path: 'areas/:areaId',
  name: 'plant area',
  component: () => import('./index'),
  props: true,
  children: [
    {
      path: 'locations',
      name: 'area locations',
      component: () => import('./locations'),
      props: true
    },
    {
      path: 'locations/upload',
      name: 'locations upload',
      component: () => import('./upload'),
      props: true
    }
  ]
}
