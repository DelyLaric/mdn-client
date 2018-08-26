<template>
  <div class="full-container is-flex is-flex-column ">
    <Divider height="8px" />

    <Title level="5" style="margin-bottom: 1rem">
      导入失败数据
    </Title>

    <div class="full-container is-flex-auto">
      <div class="table-container">
        <table class="table is-bordered is-centered is-nowrapped">
          <thead>
            <th v-for="(head, key) in header" :key="key">
              {{head}}
            </th>
          </thead>
          <tbody>
            <tr v-for="(item, key) in chunkedData[page - 1]" :key="key">
              <td v-for="(cell, key) in item" :key="key">
                {{cell}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Divider height="6px" />

    <div>
      <Button
        @click="$emit('close')"
        style="margin-right: 8px">
        <Icon name="arrow-double-left" />
        <span>返回</span>
      </Button>

      <Button
        @click="handleDownload">
        <Icon name="download" />
        <span>导出数据</span>
      </Button>

      <Pagination
        class="is-pulled-right"
        :page="page"
        :last-page="lastPage"
        @change-page="page = $event"
      />
    </div>
  </div>
</template>

<script>
import { chunk } from '@/utils/array'
import exportCsv from '@/utils/export-csv'

export default {
  props: {
    header: Array,
    data: Array
  },

  computed: {
    lastPage () {
      return this.chunkedData.length
    },

    total () {
      return this.data.length
    }
  },

  data () {
    return {
      page: 1,
      chunkedData: []
    }
  },

  watch: {
    data: {
      immediate: true,

      handler () {
        this.page = 1
        this.chunkedData = chunk(this.data, 50)
      }
    }
  },

  methods: {
    handleDownload () {
      let rows = [this.header, ...this.data]
      let csvContent = ''
      rows.forEach(row => { csvContent += (row.join(',') + '\r\n') })

      exportCsv.download('重复数据.csv', csvContent)
    }
  }
}
</script>
