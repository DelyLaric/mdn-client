import SystemRoutes from './system/routes'

export default [
  {
    path: '/test',
    name: 'Test',
    component: () => import('./common/test')
  },
  {
    path: '/',
    name: 'home page',
    component: () => import('./homepage'),
    children: [
      SystemRoutes
    ]
  }
]
