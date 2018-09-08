<template>
  <tr>
    <td class="is-centered">{{column.id}}</td>
    <td>{{column.name}}</td>
    <td>{{column.text}}</td>
    <td>{{column.comment}}</td>
    <td
      class="is-centered"
      style="width: 100px; cursor: pointer"
      @click="handleClickManage">
      <a>管理</a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'SystemTableColumnsItem',

  props: {
    column: Object,
    schema: Object
  },

  methods: {
    handleClickManage () {
      this.$router.push({
        name: 'system table column manage',
        params: {
          ...this.$route.params,
          columnId: this.column.id
        }
      })
    }
  }
}
</script>
