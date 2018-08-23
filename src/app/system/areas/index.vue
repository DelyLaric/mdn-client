<template>
  <div
    class="full-container is-flex"
    style="
      align-items: flex-start;
      flex-wrap: nowrap;
      padding: 0.75rem;
      overflow: auto;
    ">

    <PlantItem
      v-for="plant in plants"
      :key="plant.id"
      :plant="plant"
      :areaIds="areaIds[plant.id]"
    />

    <div>&nbsp;</div>

    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import PlantItem from './item'

export default {
  components: {
    PlantItem
  },

  name: 'Areas',

  computed: mapState({
    plants: state => state.plants.plants,
    areaIds: state => state.areas.list.reduce(
      (res, areaId) => {
        const id = state.areas.data[areaId].plant_id
        if (res[id]) res[id].push(areaId)
        else res[id] = [areaId]

        return res
      }, {}
    )
  })
}
</script>
