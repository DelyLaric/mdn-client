export default [
  {
    text: '工厂管理',
    icon: 'plant',
    route: { name: 'plants' }
  },
  {
    text: '数据表管理',
    icon: 'table',
    expanding: true,
    children: [
      {
        text: '零件表',
        icon: 'table',
        route: {
          name: 'system table columns',
          params: { table: 'parts' }
        }
      },
      {
        text: '包装表',
        icon: 'table',
        route: {
          name: 'system table columns',
          params: { table: 'packages' }
        }
      },
      {
        text: '工位表',
        icon: 'table',
        route: {
          name: 'system table columns',
          params: { table: 'lines' }
        }
      },
      {
        text: '流程区域',
        icon: 'process',
        route: {
          name: 'system table columns',
          params: { table: 'locations' }
        }
      }
    ]
  },
  {
    text: '流程区域管理',
    icon: 'process',
    route: { name: 'areas' }
  }
]
