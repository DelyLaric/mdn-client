<template>
  <table class="table is-bordered is-fullwidth is-nowrapped">
    <thead>
      <th class="is-centered" style="width: 1px">#</th>
      <th>备注</th>
      <th v-for="area in areas" :key="area.id">
        {{area.text}}
      </th>
    </thead>
    <tbody>
      <tr v-for="(task, index) in tasks" :key="task.id">
        <td class="is-centered">{{index}}</td>
        <td>{{task.comment}}</td>
        <td
          v-for="area in areas" :key="area.id"
          @click="handleClick(
            task.id, area.id, getArea(task, area.id)
          )"
          style="cursor: pointer"
          class="is-centered">
          <Checkbox :value="getArea(task, area.id)"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import get from 'lodash/get'
import { mapActions } from 'vuex'

export default {
  name: 'TaskAreas',

  props: {
    tasks: Array,
    areas: Array
  },

  methods: {
    ...mapActions('tasks', [
      'addArea',
      'removeArea'
    ]),

    getArea (task, id) {
      return Boolean(get(task, 'areas.' + id))
    },

    handleClick (taskId, areaId, value) {
      let callback

      if (value === false) {
        callback = () => this.addArea({taskId, areaId})
      } else {
        callback = () => this.removeArea({taskId, areaId})
      }

      this.$wait(() => callback())
    }
  }
}
</script>
