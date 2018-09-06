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
      :areas="areasMapByPlantId[plant.id]"
    />

    <div>&nbsp;</div>
    <router-view
      :plantId="plantId"
      :columns="columns"
      :area="areas[areaId]"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import PlantItem from './item'

export default {
  name: 'Areas',

  components: {
    PlantItem
  },

  props: {
    areaId: {},
    plantId: {}
  },

  computed: {
    ...mapState({
      areas: state => state.areas.data
    }),

    ...mapGetters({
      plants: 'plants/plants',
      areasMapByPlantId: 'areas/mapByPlantId',
      columnsMapByTable: 'columns/mapByTable'
    }),

    columns () {
      return this.columnsMapByTable.locations
    }
  }
}
</script>
