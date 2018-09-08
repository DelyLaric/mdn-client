export default {
  locations: {
    table: 'locations',
    text: '流程区域',
    primary: 'location_id',
    primaryText: '位置代码',
    group: 'area_id',
    columns: app => app.$store.state.areas.data[app.groupId].columns.map(
      id => app.columns[id]
    ),

    pivot: {
      table: 'areas',
      key: 'columns',
      destroyed: async app => {
        await app.$store.dispatch('areas/search')
      }
    }
  },

  parts: {
    table: 'parts',
    text: '零件',
    primary: 'part_id',
    primaryText: '零件号',
    group: 'plant_id',
    columns: app => app.$store.getters['columns/mapByTable']['parts']
  }
}
