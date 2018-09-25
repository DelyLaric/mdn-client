<template>
  <tr>
    <th class="is-centered has-text-danger">
      {{column.is_fixed ? '*' : ''}}
    </th>
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
    column: Object
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
