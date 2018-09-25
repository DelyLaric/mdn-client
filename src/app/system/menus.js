export default [
  {
    text: '工厂管理',
    icon: 'plant',
    route: { name: 'plants' }
  },
  {
    text: '基础数据管理',
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
        text: '包装',
        icon: 'table',
        route: {
          name: 'system table columns',
          params: { table: 'packages' }
        }
      },
      {
        text: '工位',
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
