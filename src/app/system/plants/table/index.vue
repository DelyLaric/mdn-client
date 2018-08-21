<template>
  <table class="table is-hoverable is-nowraped is-bordered">
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
        v-for="(plant, key) in plants"
        :key="plant.id"
        :plant="plant"
        @select="store.commit('selectPlant', key)"
      />
    </tbody>
    <router-view :key="$route.path"/>
  </table>
</template>

<script>
import { storeMixin } from '../_runtime'
import PlantItem from './item'

export default {
  mixins: [storeMixin],

  components: {
    PlantItem
  },

  computed: {
    plants () {
      return this.store.state.plants
    }
  }
}
</script>
