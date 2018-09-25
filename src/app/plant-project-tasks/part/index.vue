<template>
  <table v-if="tasks" class="table is-bordered is-nowrapped">
    <thead>
      <th class="is-centered">#</th>
      <th>备注</th>
      <th v-for="column in columns.parts" :key="column.id">
        {{column.text}}
      </th>
    </thead>
    <tbody>
      <tr v-for="(task, key) in tasks" :key="task.id">
        <td class="is-centered">{{key}}</td>
        <td>{{task.comment}}</td>
        <td
          v-if="column.name !== 'data_id'"
          v-for="column in columns.parts"
          :key="column.id">
          {{task.part[column.name]}}
        </td>
        <EditableCell v-else
          class="is-centered"
          :value="task.part_id"
          @change="$wait(() => {
            updatePart({taskId: task.id, partId: $event})
          })"
        />
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EditableCell from '@/components/common/editable-cell'

export default {
  name: 'TaskBasicView',

  components: {
    EditableCell
  },

  props: {
    tasks: Array
  },

  computed: {
    ...mapGetters({
      columns: 'columns/mapByTable'
    })
  },

  methods: mapActions({
    updatePart: 'tasks/updatePart'
  })
}
</script>
