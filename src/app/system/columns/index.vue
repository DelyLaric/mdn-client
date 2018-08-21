<template>
  <div
    v-if="!isLoading"
    class="full-container has-background-white"
    style="padding: 0.75rem; overflow: auto">
    <Title>区域属性</Title>
    <ColumnsTable />
    <div style="height: 0.75rem"></div>
    <a
      class="button is-primary"
      @click="$router.push({name: 'area column create'})">
      创建属性
    </a>
  </div>
  <div v-else class="loading" />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ColumnsTable from './table'

export default {
  name: 'AreaColumns',

  components: {
    ColumnsTable
  },

  computed: mapState({
    isLoading: 'columns/isLoading'
  })
}
</script>
