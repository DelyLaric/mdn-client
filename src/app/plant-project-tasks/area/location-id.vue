<template>
  <td
    v-if="!task.areas[area.id]"
    class="is-centered"
    style="padding: 0">
    <span class="tag">未分配</span>
  </td>
  <EditableCell
    v-else
    class="is-centered"
    @change="$wait(() => updateAreaLocation({
      taskId: task.id,
      areaId: area.id,
      locationId: $event
    }))"
    :value="task.areas[area.id].location_id"
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
    area: Object
  },

  methods: mapActions('tasks', [
    'updateAreaLocation'
  ])
}
</script>
