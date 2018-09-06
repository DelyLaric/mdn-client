<template>
  <div
    v-if="!isLoading"
    class="full-container has-background-white"
    style="padding: 0.75rem; overflow: auto">

    <Title>区域属性</Title>

    <table class="table is-hoverable is-nowrapped is-bordered">
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
        <ColumnItem
          v-for="id in list"
          :key="id"
          :column="data[id]"
        />
      </tbody>
    </table>

    <div style="height: 0.75rem"></div>

    <a
      class="button is-primary"
      @click="$router.push({name: 'area column create'})">
      创建属性
    </a>
    <router-view :column="column"/>
  </div>
  <div v-else class="loading" />
</template>

<script>
import { mapState } from 'vuex'
import ColumnItem from './item'

export default {
  name: 'AreaColumns',

  components: {
    ColumnItem
  },

  props: {
    columnId: {}
  },

  computed: mapState('columns', {
    list: state => state.list,
    data: state => state.data,
    isLoading: state => state.isLoading,

    column (state) {
      return state.data[this.columnId]
    }
  })
}
</script>
