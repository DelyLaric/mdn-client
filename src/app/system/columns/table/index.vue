<template>
  <table class="table is-hoverable is-nowraped is-bordered">
    <thead>
      <tr>
        <th style="width: 1px">编号</th>
        <th>字段名</th>
        <th>属性名</th>
        <th style="width: 360px">备注</th>
        <th style="width: 1px" class="is-centered">操作</th>
      </tr>
    </thead>
    <tbody>
      <AreaColumn
        v-for="(column, key) in columns"
        :key="column.id"
        :column="column"
        @select="store.commit('selectColumn', key)"
      />
    </tbody>
    <router-view :key="$route.path"/>
  </table>
</template>

<script>
import { storeMixin } from '../_runtime'

import AreaColumn from './item'

export default {
  components: {
    AreaColumn
  },

  mixins: [storeMixin],

  computed: {
    columns () {
      return this.store.state.columns
    },

    newColumns () {
      return this.store.state.newColumns
    }
  }
}
</script>
