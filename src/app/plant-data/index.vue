<template>
  <div class="full-container is-flex is-flex-column">
    <RouteTabs :tabs="tabs"/>
    <div class="full-container is-flex-auto">
      <router-view
        :table="table"
        :categroyId="categroyId"
        :columns="columns"
      />
    </div>
  </div>
</template>

<script>
import RouteTabs from '@/components/common/tabs'

export default {
  name: 'PlantTable',

  components: {
    RouteTabs
  },

  props: {
    table: {},
    categroyId: {}
  },

  computed: {
    columns () {
      const store = this.$store
      if (this.table === 'locations') {
        const columns = store.state.areas.data[this.categroyId].columns
        return columns.map(id => store.state.columns.data[id])
      } else {
        return store.getters['columns/mapByTable'][this.table]
      }
    },

    tabs () {
      const params = this.$route.params

      return [
        {
          text: '数据管理',
          route: {
            name: 'plant table data',
            params
          }
        },
        {
          text: '数据上传',
          route: {
            name: 'plant table data upload',
            params
          }
        }
      ]
    }
  }
}
</script>
