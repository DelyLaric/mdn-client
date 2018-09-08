<template>
  <div class="full-container is-flex is-flex-column">
    <RouteTabs :tabs="tabs"/>
    <div class="full-container is-flex-auto">
      <router-view
        :groupId="groupId"
        :schema="schema"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import tables from '@/assets/tables'
import RouteTabs from '@/components/common/tabs'

export default {
  name: 'PlantArea',

  components: {
    RouteTabs
  },

  props: {
    table: {},
    groupId: {}
  },

  computed: {
    schema () {
      return tables[this.table]
    },

    tabs () {
      const params = {
        areaId: this.areaId,
        plantId: this.plantId
      }

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
  },

  watch: {
    '$router.currentRoute': {
      immediate: true,
      handler (val) {
        if (val.name === 'plant area') {
          this.$router.push({
            name: 'area locations',
            params: val.params
          })
        }
      }
    }
  }
}
</script>
