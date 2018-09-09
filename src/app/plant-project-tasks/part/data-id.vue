<template>
  <EditableCell
    class="is-centered"
    :class="{ 'has-text-danger': task.part_id !== null && !part.id }"
    @change="$wait(() => updatePart({
      taskId: task.id,
      dataId: $event
    }))"
    :value="task.part_id"
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
    part: {}
  },

  methods: {
    ...mapActions('tasks', [
      'updatePart'
    ])
  }
}
</script>
