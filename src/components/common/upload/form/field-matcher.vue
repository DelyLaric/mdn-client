<template>
  <Field>
    <Label>表头匹配</Label>
    <Control>
      <div class="table-container">
        <table class="table is-centered is-bordered is-fullwidth is-nowraped">
          <thead>
            <th>字段名</th>
            <th>Excel 表头</th>
            <th>列</th>
          </thead>
          <tbody>
            <tr
              v-for="column in store.state['columns']"
              :key="column.name">
              <td>{{column.text}}</td>
              <td>
                <span>
                  {{headers[column.index]}}
                </span>
                <span
                  v-show="headers.length && column.index === -1"
                  class="tag is-warning">
                  未匹配
                </span>
              </td>
              <td>
                <span v-show="column.index !== -1">
                  {{column.index + 1}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Control>
  </Field>
</template>

<script>
export default {
  props: {
    columns: Array
  },

  inject: ['store'],

  computed: {
    headers () {
      return this.store.state['headers']
    }
  },

  created () {
    this.store.commit('setColumns', this.columns)
  }
}
</script>
