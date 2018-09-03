<template>
  <div
    v-if="!isLoading"
    class="full-container has-background-white"
    style="padding: 0.75rem; overflow: auto">

    <Title>工厂</Title>

    <table class="table is-hoverable is-nowrapped is-bordered">
      <thead>
        <tr>
          <th style="width: 1px">编号</th>
          <th>工厂名</th>
          <th style="width: 360px">备注</th>
          <th style="width: 1px" class="is-centered">操作</th>
        </tr>
      </thead>
      <tbody>
        <PlantItem
          v-for="id in list"
          :plant="data[id]"
          :key="id"
        />
      </tbody>
    </table>

    <div style="height: 0.75rem"></div>

    <a
      class="button is-primary"
      @click="$router.push({name: 'plant create'})">
      创建工厂
    </a>

    <router-view :plant="plant" />
  </div>
  <div v-else class="loading" />
</template>

<script>
import { mapState } from 'vuex'

import PlantItem from './item'

export default {
  name: 'SystemPlants',

  components: {
    PlantItem
  },

  props: {
    plantId: {}
  },

  computed: mapState('plants', {
    list: state => state.list,
    data: state => state.data,
    isLoading: state => state.isLoading,

    plant (state) {
      return state.data[this.plantId]
    }
  })
}
</script>
