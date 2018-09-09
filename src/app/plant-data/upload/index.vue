<template>
  <DataUpload v-bind="uploadSchema"/>
</template>

<script>
import data from '@/api/data'
import DataUpload from '@/components/common/upload'

export default {
  name: 'PlantTableDataUpload',

  components: {
    DataUpload
  },

  props: {
    table: {},
    categroyId: {},
    columns: Array
  },

  computed: {
    uploadSchema () {
      return {
        columns: this.columns,

        unique: ['data_id'],

        handler: this.submit
      }
    }
  },

  methods: {
    async submit (params) {
      params.table = this.table
      params.header.push('categroy_id')
      params.unique.push('categroy_id')
      params.data.forEach(item => item.push(this.categroyId))
      const dataSource = await data.upload(params)
      dataSource.forEach(item => item.pop())
      return dataSource
    }
  }
}
</script>
