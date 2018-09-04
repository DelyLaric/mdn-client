<template>
  <table v-if="tasks" class="table is-bordered is-nowrapped">
    <thead>
      <th class="is-centered" style="width: 1px">#</th>
      <th>备注</th>
      <th>位置代码</th>
      <th v-for="id in area.column_ids" :key="id">
        {{columns[id].text}}
      </th>
    </thead>
    <tbody>
      <tr v-for="(task, index) in tasks" :key="task.id">
        <td class="is-centered">{{index}}</td>
        <td>{{task.comment}}</td>
        <td>{{getLocationId(task)}}</td>
        <td v-for="id in area.column_ids" :key="id">
          {{getLocationData(task, columns[id])}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import get from 'lodash/get'

export default {
  props: {
    tasks: Array,
    area: Object,
    columns: Object
  },

  methods: {
    getLocationId (task) {
      return get(task, 'areas.' + this.area.id + '.location.location_id')
    },

    getLocationData (task, column) {
      return get(task, 'areas.' + this.area.id + '.location.' + column.name)
    }
  }
}
</script>
