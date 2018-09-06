<template>
  <div
    class="full-container is-flex is-flex-column"
    style="padding: 0.5rem">
    <div class="is-flex">
      <div class="buttons has-addons" style="margin-right: 0.5rem">
        <a
          @click="$wait(handleCreate)"
          :disabled="isLoading"
          class="button">
          <Icon name="create-record"/>
          <span>新增</span>
        </a>
        <a
          @click="$wait(saveItems)"
          :disabled="!modifiedItems.length"
          class="button is-selected has-text-grey-dark">
          <Icon name="save"/>
          <span>保存</span>
        </a>
        <a
          :disabled="!stateOfSelected"
          @click="$wait(destroy)"
          class="button">
          <Icon name="bin"/>
          <span>删除</span>
        </a>
      </div>

      <div class="field has-addons">
        <div class="control">
          <input
            :value="query" class="input"
            type="text" style="width: 160px"
            @change="setQuery($event.target.value)"
            @keypress.enter="handleQueryEnter"
          >
        </div>
        <div class="control">
          <a
            @click="search"
            :class="{'is-loading': isLoading}"
            class="button is-info">
            <Icon name="search"/>
          </a>
        </div>
      </div>
    </div>

    <div style="height: 0.5rem"></div>

    <div class="table-container is-flex-auto">
      <table
        v-if="!isLoading"
        class="table is-fullwidth is-bordered is-nowrapped">
        <thead>
          <td
            @click="handleCheck"
            style="cursor: pointer; width: 1px">
            <Checkbox :value="stateOfSelected"/>
          </td>
          <th v-for="column in tableColumns" :key="column.name">
            {{column.text}}
          </th>
        </thead>
        <tbody>
          <LocationTableItem
            v-for="id in list"
            :key="id"
            :location="data[id]"
            :columns="tableColumns"
            ref="items"
          />
        </tbody>
      </table>
      <div v-else class="loading" />
    </div>
    <div style="height: 0.5rem"></div>
    <div>
      <a @click="handleDataExport" class="button">
        <Icon name="download"/>
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

import LocationTableItem from './item'
import Pagination from '@/components/common/pagination'

export default {
  components: {
    Pagination,
    LocationTableItem
  },

  props: {
    areaId: {}
  },

  computed: {
    ...vuex.mapGetters({
      selectedItems: 'locations/selectedItems',
      modifiedItems: 'locations/modifiedItems'
    }),

    ...vuex.mapState({
      list: state => state.locations.list,
      data: state => state.locations.data,
      meta: state => state.locations.meta,
      query: state => state.locations.query,
      isLoading: state => state.locations.isLoading,

      columnsData: state => state.columns.data,

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
      return this.area.column_ids.map(id => this.columnsData[id])
    },

    tableColumns () {
      return [
        { name: 'location_id', text: '位置代码' },
        ...this.columns
      ]
    }
  },

  methods: {
    ...vuex.mapActions('locations', [
      'search',
      'export',
      'create',
      'destroy',
      'saveItems'
    ]),

    ...vuex.mapMutations({
      setQuery: 'locations/setQuery',
      selectItem: 'locations/selectItem'
    }),

    handleCheck () {
      this.selectItem(this.stateOfSelected !== true)
    },

    handleQueryEnter (event) {
      event.target.blur()
      this.search()
    },

    async handleCreate () {
      if (this.isLoading) return
      const id = await this.create({areaId: this.areaId})
      this.$refs.items.find(item => item.location.id === id).$refs.cells[0].focus()
    },

    async handleDataExport () {
      let dataSource = []
      await this.$wait(() => dataSource = this.export())
      dataSource.unshift(this.tableColumns.map(column => column.text))
      csv.download(this.area.text, dataSource)
    }
  },

  watch: {
    areaId: {
      immediate: true,
      handler () {
        this.search()
      }
    }
  }
}
</script>
