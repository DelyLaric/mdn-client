<template>
  <table v-if="tasks" class="table is-bordered is-nowrapped">
    <thead>
      <th class="is-centered" style="width: 1px">#</th>
      <th>备注</th>
      <th v-for="id in area.columns" :key="id">
        {{columns[id].text}}
      </th>
    </thead>
    <tbody>
      <tr v-for="(task, index) in tasks" :key="task.id">
        <td class="is-centered">{{index}}</td>
        <td>{{task.comment}}</td>
        <td
          v-if="columns[id].name !== 'data_id'" 
          v-for="id in area.columns"
          :key="id">
          {{getLocationData(task, columns[id])}}
        </td>
        <DataId
          v-else
          :task="task"
          :taskArea="task.areas[area.id]"
        />
      </tr>
    </tbody>
  </table>
</template>

<script>
import get from 'lodash/get'
import DataId from './data-id'

export default {
  name: 'TaskArea',

  components: {
    DataId
  },

  props: {
    tasks: Array,
    area: Object,
    columns: Object
  },

  methods: {
    getLocationData (task, column) {
      return get(task, 'areas.' + this.area.id + '.location.' + column.name)
    }
  }
}
</script>
