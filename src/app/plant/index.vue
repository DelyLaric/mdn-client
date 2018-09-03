<template>
  <div v-if="!isLoading" class="full-container is-flex">
    <MenuList :menus="MenuData" width="220px" />
    <div class="is-flex-auto">
      <router-view />
    </div>
  </div>
  <div v-else class="loading" />
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import MenuData from './menus'
import MenuList from '@/components/common/menus'

import { sleep } from '@/utils/async'

export default {
  name: 'Plant',

  components: {
    MenuList
  },

  data () {
    return {
      // 假装正在读取
      isLoading: true
    }
  },

  props: {
    plantId: {}
  },

  computed: {
    ...mapGetters({
      areasIdMapByPlantId: 'areas/mapIdByPlantId'
    }),

    ...mapState({
      areaIds () {
        return this.areasIdMapByPlantId[this.plantId]
      },

      areas (state) {
        return this.areaIds.map(id => state.areas.data[id])
      }
    }),

    MenuData
  },

  watch: {
    plantId: {
      immediate: true,
      async handler () {
        this.isLoading = true
        await sleep(500)
        this.isLoading = false
      }
    }
  }
}
</script>
