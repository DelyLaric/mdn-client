<template>
  <tr>
    <td class="is-centered">{{plant.id}}</td>
    <td>{{plant.name}}</td>
    <td>{{plant.comment}}</td>
    <td
    <td
      class="is-centered"
      style="width: 100px; cursor: pointer"
      @click="handleManage(plant.id)">
      <a>管理</a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'PlantItem',

  props: {
    plant: Object
  },

  methods: {
    handleManage (plantId) {
      this.$router.push({
        name: 'plant manage',
        params: { plantId }
      })
    }
  }
}
</script>
