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
import { mapGetters } from 'vuex'

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
      areasMapByPlantId: 'areas/mapByPlantId'
    }),

    areas (state) {
      return this.areasMapByPlantId[this.plantId]
    },

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
