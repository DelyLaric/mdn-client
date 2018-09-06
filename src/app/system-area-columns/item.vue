<template>
  <tr>
    <td class="is-centered">{{column.id}}</td>
    <td>{{column.name}}</td>
    <td>{{column.text}}</td>
    <td>{{column.comment}}</td>
    <td
      class="is-centered"
      style="width: 100px; cursor: pointer"
      @click="$router.push({
        name: 'area column manage',
        params: { columnId: column.id }
      })">
      <a>管理</a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'AreaColumnItem',

  props: {
    column: Object
  },

  data () {
    return {
      isHovered: false
    }
  }
}
</script>
