<template>
  <div
    v-if="!isLoading"
    class="full-container has-background-white"
    style="padding: 0.75rem; overflow: auto">
    <Title>工厂</Title>
    <PlantsTable />
    <div style="height: 0.75rem"></div>
    <a
      class="button is-primary"
      @click="$router.push({name: 'plant create'})">
      创建工厂
    </a>
  </div>
  <div v-else class="loading" />
</template>

<script>
import { mapState } from 'vuex'
import PlantsTable from './table'

export default {
  name: 'Plants',

  components: {
    PlantsTable
  },

  computed: mapState({
    isLoading: 'plants/isLoading'
  })
}
</script>
