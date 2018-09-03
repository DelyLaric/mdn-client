<template>
  <DataUpload v-bind="schema"/>
</template>

<script>
import { upload } from '@/api/common'
import { mapState, mapGetters } from 'vuex'
import DataUpload from '@/components/common/upload'

export default {
  props: {
    areaId: {}
  },

  components: {
    DataUpload
  },

  computed: {
    ...mapState({
      area (state) {
        return state.areas.data[this.areaId]
      }
    }),

    ...mapGetters({
      columnsMapById: 'columns/mapById'
    }),

    columns () {
      return this.area.column_ids.map(id => ({
        name: this.columnsMapById[id].name,
        text: this.columnsMapById[id].text
      }))
    },

    schema () {
      return {
        columns: [
          { name: 'location_id', text: '坐标代码' },
          ...this.columns
        ],

        unique: ['location_id'],

        handler: async (params) => {
          params.table = 'locations'
          params.header.push('area_id')
          params.unique.push('area_id')
          params.data.forEach(item => item.push(this.areaId))
          const data = await upload(params)
          data.forEach(item => item.pop())
          return data
        }
      }
    }
  }
}
</script>
