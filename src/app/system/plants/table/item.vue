<template>
  <tr
    @mouseout="isHovered = false"
    @mouseover="isHovered = true">
    <td class="is-centered">{{plant.id}}</td>
    <td>{{plant.name}}</td>
    <td>{{plant.comment}}</td>
    <td
    <td
      class="is-centered"
      style="width: 100px; cursor: pointer"
      @click="handleManage(plant.name)">
      <a>管理</a>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    plant: Object
  },

  data () {
    return {
      isHovered: false
    }
  },

  methods: {
    handleManage (plant) {
      this.$emit('select')
      this.$router.push({
        name: 'plant manage',
        params: { plant }
      })
    }
  }
}
</script>
