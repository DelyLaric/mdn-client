<template>
  <div
    @mouseover="isShowPlants = true"
    @mouseout="isShowPlants = false"
    :class="{'is-active': isShowPlants}"
    class="dropdown is-left is-unselectable">
    <div
      class="dropdown-trigger"
      style="white-space: nowrap; width: 4.15em;"
      :class="{'is-active': hasMatched || isShowPlants}">
      <span>
        工厂管理
      </span>
      <Icon name="arrow-down" />
    </div>
      <Icon name="arrow-downs" />
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content" style="max-width: 160px;">
        <a
          v-for="plant in plants" :key="plant.name"
          :href="`#/plants/${plant.id}`"
          :class="{'is-active': isMatchedPlant(plant.id)}"
          class="dropdown-item"
          v-text="plant.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TopbarPlants',

  data () {
    return {
      isShowPlants: false
    }
  },

  computed: mapState({
    plants: state => state.plants.plants,

    hasMatched () {
      return this.$route.matched.findIndex(
        route => route.name === 'plant index'
      ) !== -1
    }
  }),

  methods: {
    isMatchedPlant (plantId) {
      return this.hasMatched && plantId === parseInt(
        this.$route.params.plantId
      )
    }
  }
}
</script>
