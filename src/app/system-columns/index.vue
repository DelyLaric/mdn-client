<template>
  <div
    class="full-container has-background-white"
    style="padding: 0.75rem; overflow: auto">

    <Title>属性管理</Title>

    <table class="table is-hoverable is-nowrapped is-bordered">
      <thead>
        <tr>
          <th style="width: 36px">-</th>
          <th>字段名</th>
          <th>属性名</th>
          <th style="width: 360px">备注</th>
          <th style="width: 1px" class="is-centered">操作</th>
        </tr>
      </thead>
      <tbody>
        <ColumnItem
          v-for="column in columns"
          :key="column.id"
          :column="column"
        />
      </tbody>
    </table>

    <div style="height: 0.75rem"></div>

    <a
      class="button is-primary"
      @click="$router.push({
        name: 'system table column create',
        params: $route.params
      })">
      创建属性
    </a>

    <router-view
      :table="table"
      :columns="columns"
      :column="columnsData[columnId]"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ColumnItem from './item'

export default {
  name: 'SystemTableColumns',

  components: {
    ColumnItem
  },

  props: {
    table: {},
    columnId: {}
  },

  computed: {
    ...mapState ({
      columnsData: state => state.columns.data
    }),

    ...mapGetters({
      columnsMapByTable: 'columns/mapByTable'
    }),

    columns () {
      return this.columnsMapByTable[this.table]
    }
  }
}
</script>
