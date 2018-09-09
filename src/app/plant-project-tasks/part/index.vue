<template>
  <table v-if="tasks" class="table is-bordered is-nowrapped">
    <thead>
      <th class="is-centered" style="width: 1px">#</th>
      <th>备注</th>
      <th v-for="column in columns" :key="column.id">
        {{column.text}}
      </th>
    </thead>
    <tbody>
      <tr v-for="(task, index) in tasks" :key="task.id">
        <td class="is-centered">{{index}}</td>
        <td>{{task.comment}}</td>
        <td
          v-for="column in columns"
          :key="column.id"
          v-if="column.name !== 'data_id'">
          {{getPartValue(task, column.name)}}
        </td>
        <DataId
          v-else
          :task="task"
          :part="task.part"
        />
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import get from 'lodash/get'
import DataId from './data-id'

export default {
  name: 'TaskArea',

  components: {
    DataId
  },

  props: {
    tasks: Array
  },

  computed: {
    ...mapGetters({
      tableColumns: 'columns/mapByTable'
    }),

    columns () {
      return this.tableColumns.parts
    }
  },

  methods: {
    getPartValue (task, column) {
      return get(task, 'part.' + column)
    }
  }
}
</script>
