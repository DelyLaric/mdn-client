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
      text: '零件数据',
      icon: 'table',
      route: {
        name: 'plant parts',
        params: { plantId }
      }
    },
    {
      text: '区域数据',
      icon: 'process',
      expanding: true,
      children: this.areas.map(area => {
        const params = {
          plantId,
          areaId: area.id
        }

        return {
          text: area.text,
          icon: 'table',
          actived: () => this.$router.hasMatched({
            name: 'plant area',
            params
          }),
          route: {
            name: 'area locations',
            params
          }
        }
      })
    }
  ]
}
