<template>
  <DataUpload v-bind="uploadSchema"/>
</template>

<script>
import data from '@/api/data'
import DataUpload from '@/components/common/upload'

export default {
  name: 'LocationsUpload',

  components: {
    DataUpload
  },

  props: {
    groupId: {},
    schema: Object
  },

  computed: {
    columns () {
      return this.schema.columns(this)
    },

    uploadSchema () {
      return {
        columns: [
          { name: this.schema.primary, text: this.schema.primaryText },
          ...this.columns
        ],

        unique: [this.schema.primary],

        handler: this.submit
      }
    }
  },

  methods: {
    async submit (params) {
      params.table = this.schema.table
      params.header.push(this.schema.group)
      params.unique.push(this.schema.group)
      params.data.forEach(item => item.push(this.groupId))
      /* es-lint disable vue/no-async-in-computed-properties */
      const dataSource = await data.upload(params)
      dataSource.forEach(item => item.pop())
      return dataSource
    }
  }
}
</script>
