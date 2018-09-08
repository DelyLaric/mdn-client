export default {
  locations: {
    table: 'locations',
    primary: 'location_id',
    primaryText: '位置代码',
    group: 'area_id',
    columns: app => app.$store.state.areas.data[app.groupId].columns.map(
      id => app.columns[id]
    )
  },
  parts: {
    table: 'parts',
    primary: 'part_id',
    primaryText: '零件号',
    group: 'plant_id',
    columns: app => app.$store.getters['columns/mapByTable']['parts']
  }
}
