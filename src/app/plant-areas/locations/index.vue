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
          @click="$wait(() => saveItems({table: 'locations'}))"
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
        class="table is-bordered is-nowrapped">
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
      selectedItems: 'data/selectedItems',
      modifiedItems: 'data/modifiedItems'
    }),

    ...vuex.mapState({
      list: state => state.data.list,
      data: state => state.data.data,
      meta: state => state.data.meta,
      query: state => state.data.query,
      isLoading: state => state.data.isLoading,

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
      return this.area.columns.map(id => this.columnsData[id])
    },

    tableColumns () {
      return [
        { name: 'location_id', text: '位置代码' },
        ...this.columns
      ]
    }
  },

  methods: {
    ...vuex.mapActions('data', [
      'search',
      'export',
      'create',
      'destroy',
      'saveItems',
    ]),

    ...vuex.mapMutations({
      setQuery: 'data/setQuery',
      selectItem: 'data/selectItem',
      setParams: 'data/setParams'
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
      const id = await this.create({
        table: 'locations',
        group: 'area_id',
        groupId: this.areaId,
        primary: 'location_id'
      })
      this.$refs.items.find(item => item.location.id === id).$refs.cells[0].focus()
    },

    async handleDataExport () {
      let dataSource = []
      await this.$wait(async () => dataSource = await this.export())
      dataSource.unshift(this.tableColumns.map(column => column.text))
      csv.download(this.area.text, dataSource)
    }
  },

  watch: {
    areaId: {
      immediate: true,
      handler () {
        this.setParams({
          table: 'locations',
          primary: 'location_id',
          group: 'area_id',
          groupId: this.areaId
        })
        this.search()
      }
    }
  }
}
</script>
