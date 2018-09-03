<template>
  <tr>
    <td class="is-centered">{{column.id}}</td>
    <td>{{column.name}}</td>
    <td>{{column.text}}</td>
    <td>{{column.comment}}</td>
    <td
      class="is-centered"
      style="width: 100px; cursor: pointer"
      @click="handleManage(column.id)">
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
    handleManage (columnId) {
      this.$emit('select')
      this.$router.push({
        name: 'column manage',
        params: { columnId }
      })
    }
  }
}
</script>
