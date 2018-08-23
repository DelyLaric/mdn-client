<template>
  <nav class="panel" style="min-width: 280px; margin-right: 0.75rem">
    <p class="panel-heading">
      <strong>{{plant.name}}</strong>
    </p>

    <AreaListItem
      v-for="areaId in areaIds"
      :areaId="areaId"
      :key="areaId"
    />

    <a
      class="panel-block is-footer has-text-grey"
      style="font-size: 1rem;"
      @click="$router.push({
        name: 'area create',
        params: { plantId: plant.id }
      })">
      <Icon name="plus-bold" />
      <span><strong>添加区域</strong></span>
    </a>
  </nav>
</template>

<script>
import AreaListItem from './area-item'

export default {
  components: {
    AreaListItem
  },

  name: 'PlantAreas',

  props: {
    plant: Object,
    areaIds: Array
  }
}
</script>
