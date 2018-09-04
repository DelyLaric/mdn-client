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
      v-for="plantId in plantsList"
      :key="plantId"
      :plant="plantsData[plantId]"
      :areas="areasMapByPlantId[plantId]"
    />

    <div>&nbsp;</div>
    <router-view :area="areasData[$route.params.areaId]"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import PlantItem from './item'

export default {
  components: {
    PlantItem
  },

  name: 'Areas',

  computed: {
    ...mapState({
      areasData: state => state.areas.data,
      plantsData: state => state.plants.data,
      plantsList: state => state.plants.list
    }),

    ...mapGetters({
      areasMapByPlantId: 'areas/mapByPlantId'
    }),
  }
}
</script>
