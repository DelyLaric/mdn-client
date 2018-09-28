export default function () {
  const plantId = this.plantId

  return [
    {
      text: '项目管理',
      icon: 'table',
      route: {
        name: 'plant projects',
        params: { plantId }
      }
    },
    {
      text: '任务规划',
      icon: 'table',
      expanding: true,
      children: [
        {
          text: '区域管理',
          icon: 'table',
          route: {
            name: 'plant areas manage',
            params: { plantId }
          }
        },
        ...this.areas.map(area => {
          const params = {
            plantId,
            areaId: area.id
          }

          return {
            text: area.text,
            icon: 'table',
            actived: () => this.$router.hasMatched({
              name: 'plant area manage',
              params
            }),
            route: {
              name: 'plant area manage',
              params
            }
          }
        })
      ]
    },
    {
      text: '基础数据',
      icon: 'storage',
      expanding: true,
      children: [
        {
          text: '零件数据',
          icon: 'table',
          actived: () => this.$router.hasMatched({
            name: 'plant table',
            params: { table: 'parts', categroyId: plantId }
          }),
          route: {
            name: 'plant table data',
            params: { table: 'parts', categroyId: plantId }
          }
        },
        {
          text: '包装',
          icon: 'table',
          actived: () => this.$router.hasMatched({
            name: 'plant table',
            params: { table: 'packages', categroyId: plantId }
          }),
          route: {
            name: 'plant table data',
            params: { table: 'packages', categroyId: plantId }
          }
        },
        {
          text: '工位',
          icon: 'table',
          actived: () => this.$router.hasMatched({
            name: 'plant table',
            params: { table: 'lines', categroyId: plantId }
          }),
          route: {
            name: 'plant table data',
            params: { table: 'lines', categroyId: plantId }
          }
        },
        ...this.areas.map(area => {
          const params = {
            plantId,
            table: 'locations',
            categroyId: area.id
          }

          return {
            text: area.text,
            icon: 'table',
            actived: () => this.$router.hasMatched({
              name: 'plant table',
              params
            }),
            route: {
              name: 'plant table data',
              params
            }
          }
        })
      ]
    }
  ]
}
