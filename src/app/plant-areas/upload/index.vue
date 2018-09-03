<template>
  <DataUpload v-bind="schema"/>
</template>

<script>
import { upload } from '@/api/common'
import { mapState } from 'vuex'
import DataUpload from '@/components/common/upload'

export default {
  name: 'LocationsUpload',

  components: {
    DataUpload
  },

  props: {
    areaId: {}
  },

  computed: {
    ...mapState({
      columnsData: state => state.columns.data,

      area (state) {
        return state.areas.data[this.areaId]
      }
    }),

    columns () {
      return this.area.column_ids.map(id => ({
        name: this.columnsData[id].name,
        text: this.columnsData[id].text
      }))
    },

    schema () {
      return {
        columns: [
          { name: 'location_id', text: '坐标代码' },
          ...this.columns
        ],

        unique: ['location_id'],

        handler: this.submit
      }
    }
  },

  methods: {
    async submit (params) {
      params.table = 'locations'
      params.header.push('area_id')
      params.unique.push('area_id')
      params.data.forEach(item => item.push(this.areaId))
      /* es-lint disable vue/no-async-in-computed-properties */
      const data = await upload(params)
      data.forEach(item => item.pop())
      return data
    }
  }
}
</script>
