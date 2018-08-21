<template>
  <div
    v-if="!$store.getters.isLoading"
    class="full-container has-background-white"
    style="padding: 0.75rem; overflow: auto">
    <Title>区域属性</Title>
    <ColumnsTable />
    <div style="height: 0.75rem"></div>
    <a
      class="button is-primary"
      @click="$router.push({name: 'area column create'})">
      添加属性
    </a>
  </div>
  <div v-else class="loading" />
</template>

<script>
import { search } from '@/api/area-columns'
import { getLocalStore } from './_runtime'

import ColumnsTable from './table'
import store from './_store'

export default {
  name: 'AreaColumns',

  components: {
    ColumnsTable
  },

  computed: {
    store: getLocalStore
  },

  async created () {
    this.$store.registerModule('areas/columns', store)

    this.$store.dispatch('load', async () => {
      this.store.commit('setColumns', await search())
    })
  },

  beforeDestroy () {
    this.$store.unregisterModule('areas/columns')
  }
}
</script>
