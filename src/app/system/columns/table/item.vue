<template>
  <tr
    @mouseout="isHovered = false"
    @mouseover="isHovered = true">
    <td class="is-centered">{{column.id}}</td>
    <td>{{column.name}}</td>
    <td>{{column.text}}</td>
    <td>{{column.comment}}</td>
    <td
      class="is-centered"
      style="width: 100px; cursor: pointer"
      @click="handleManage(column.name)">
      <a>管理</a>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    column: Object
  },

  data () {
    return {
      isHovered: false
    }
  },

  methods: {
    handleDelete (column) {
      this.$emit('select')
      this.$router.push({
        name: 'area column delete',
        params: { column }
      })
    },

    handleManage (column) {
      this.$emit('select')
      this.$router.push({
        name: 'area column manage',
        params: { column }
      })
    }
  }
}
</script>
