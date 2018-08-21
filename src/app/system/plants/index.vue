<template>
  <div
    v-if="!$store.getters.isLoading"
    class="full-container has-background-white"
    style="padding: 0.75rem; overflow: auto">
    <Title>工厂</Title>
    <PlantsTable />
    <div style="height: 0.75rem"></div>
    <a
      class="button is-primary"
      @click="$router.push({name: 'plant create'})">
      添加属性
    </a>
  </div>
  <div v-else class="loading" />
</template>

<script>
import { getLocalStore } from './_runtime'
import { search } from '@/api/plants'
import PlantsTable from './table'
import store from './_store'

export default {
  name: 'Plants',

  components: {
    PlantsTable
  },

  computed: {
    store: getLocalStore
  },

  created () {
    this.$store.registerModule('plants', store)

    this.$store.dispatch('load', async () => {
      this.store.commit('setPlants', await search())
    })
  },

  beforeDestroy () {
    this.$store.unregisterModule('plants')
  }
}
</script>
