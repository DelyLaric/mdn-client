<template>
  <div class="full-container is-flex">
    <MenuList :menus="MenuData" width="220px" />
    <div class="is-flex-auto">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import MenuData from './menus'
import MenuList from '@/components/common/menus'

export default {
  name: 'PlantIndex',

  components: {
    MenuList
  },

  props: {
    plantId: {}
  },

  computed: {
    ...mapGetters({
      plantsAreaIds: 'areas/mapIdByPlantId'
    }),

    ...mapState({
      areaIds () {
        return this.plantsAreaIds[this.plantId]
      },

      areas (state) {
        return this.areaIds.map(id => state.areas.data[id])
      }
    }),

    MenuData
  }
}
</script>
