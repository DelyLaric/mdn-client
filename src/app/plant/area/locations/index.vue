<template>
  <div
    class="full-container is-flex is-flex-column"
    style="padding: 0.5rem">
    <div>
      <div
        class="buttons has-addons"
        style="margin-right: 0.5rem">
        <a
          @click="search()"
          :class="{ 'button': true, 'is-loading': isLoading }">
          <Icon name="refresh"/>
        </a>
      </div>

      <div class="buttons has-addons">
        <a
          @click="$store.dispatch('wait', updateModifiedItems)"
          :disabled="!modifiedItems.length"
          class="button is-selected has-text-grey-dark">
          <Icon name="save" />
          <span>保存</span>
        </a>
        <a
          :disabled="!stateOfSelected"
          @click="$store.dispatch('wait', deleteItems)"
          class="button">
          <Icon name="bin" />
          <span>删除</span>
        </a>
      </div>
    </div>

    <div style="height: 0.5rem"></div>

    <div class="table-container is-flex-auto">
      <table
        v-if="!isLoading"
        class="table is-hoverable is-fullwidth is-bordered is-nowraped">
        <thead>
          <td
            @click="handleCheck"
            style="cursor: pointer">
            <Checkbox :value="stateOfSelected" />
          </td>
          <th>#</th>
          <th v-for="text in tableHeaders" :key="text">
            {{text}}
          </th>
        </thead>
        <tbody>
          <LocationTableItem
            v-for="id in list"
            :key="id"
            :location="data[id]"
            :columns="columns"
          />
        </tbody>
      </table>
      <div v-else class="loading" />
    </div>
    <div style="height: 0.5rem"></div>
    <div>
      <a @click="handleDataExport" class="button">
        <Icon name="download" />
        <span>数据导出</span>
      </a>
      <Pagination
        v-if="meta"
        :meta="meta"
        @change-page="search({page: $event})"
      />
    </div>
  </div>
</template>

<script>
import vuex from 'vuex'
import csv from '@/utils/export-csv'

import ExportData from './export'
import LocationTableItem from './item'
import Pagination from '@/components/common/pagination'

export default {
  components: {
    ExportData,
    Pagination,
    LocationTableItem
  },

  props: {
    areaId: {}
  },

  computed: {
    ...vuex.mapGetters({
      columnsMap: 'columns/mapById',
      selectedItems: 'locations/selectedItems',
      modifiedItems: 'locations/modifiedItems'
    }),

    ...vuex.mapState({
      list: state => state.locations.list,
      data: state => state.locations.data,
      meta: state => state.locations.meta,
      isLoading: state => state.locations.isLoading,

      area (state) {
        return state.areas.data[this.areaId]
      },

      stateOfSelected () {
        const L = this.selectedItems.length
        if (L === 0) {
          return false
        } else if (L === this.list.length) {
          return true
        } else {
          return 'minus'
        }
      }
    }),

    columns () {
      return this.area.column_ids.map(id => this.columnsMap[id])
    },

    tableHeaders () {
      const res = this.columns.map(column => column.text)
      res.unshift('区域代码')

      return res
    }
  },

  watch: {
    areaId: {
      immediate: true,

      handler (val) {
        this.search()
      }
    }
  },

  methods: {
    ...vuex.mapActions('locations', [
      'search',
      'export',
      'deleteItems',
      'updateModifiedItems'
    ]),

    ...vuex.mapMutations({
      selectItem: 'locations/selectItem'
    }),

    handleCheck () {
      this.selectItem(this.stateOfSelected !== true)
    },

    async handleDataExport () {
      let dataSource = []
      await this.$store.dispatch(
        'wait', async () => dataSource = await this.export()
      )
      dataSource.unshift(this.tableHeaders)
      csv.download(this.area.text, dataSource)
    }
  }
}
</script>
