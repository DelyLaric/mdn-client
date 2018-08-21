<template>
  <div
    @mouseover="isShowPlants = true"
    @mouseout="isShowPlants = false"
    :class="{'is-active': isShowPlants}"
    class="dropdown level-item is-left">
    <div class="dropdown-trigger">
      <span>空间管理</span>
      <Icon name="arrow-down" />
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a
          v-for="plant in plants" :key="plant.name"
          :class="{ 'is-active': plant.name === $route.params.plant }"
          :href="`#/plants/${plant.name}`"
          class="dropdown-item"
          v-text="plant.text"
        />
        <hr class="dropdown-divider" v-if="plants.length">
        <a href="#/system/plants/create" class="dropdown-item">
          创建工厂
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopbarSpaces',

  data () {
    return {
      isShowPlants: false
    }
  },

  computed: {
    plants () {
      return []
    }
  }
}
</script>
