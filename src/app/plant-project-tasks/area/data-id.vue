<template>
  <td
    v-if="!taskArea"
    class="is-centered"
    style="padding: 0">
    <span class="tag">未分配</span>
  </td>
  <EditableCell
    v-else
    class="is-centered"
    :class="{ 'has-text-danger': taskArea.data_id !== null && !taskArea.location.id }"
    @change="$wait(() => updateAreaLocation({
      taskId: task.id,
      areaId: taskArea.area_id,
      dataId: $event
    }))"
    :value="taskArea.data_id"
  />
</template>

<script>
import { mapActions } from 'vuex'
import EditableCell from '@/components/common/editable-cell'

export default {
  name: 'TaskAreaLocationId',

  components: {
    EditableCell
  },

  props: {
    task: Object,
    taskArea: Object
  },

  methods: {
    ...mapActions('tasks', [
      'updateAreaLocation'
    ])
  }
}
</script>
