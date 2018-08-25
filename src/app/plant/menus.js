export default function () {
  return [
    {
      text: '区域数据',
      icon: 'process',
      expanding: true,
      children: this.areas.map(area => {
        const params = {
          areaId: area.id,
          plantId: this.plantId
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
