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
import { mapGetters } from 'vuex'

import PlantItem from './item'

export default {
  components: {
    PlantItem
  },

  name: 'Areas',

  computed: mapGetters({
    plants: 'plants/plants',
    areaIds: 'areas/mapIdByPlantId'
  })
}
</script>
