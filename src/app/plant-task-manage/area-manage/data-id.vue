<template>
  <EditableCell
    class="is-centered"
    :class="{ 'has-text-danger': taskArea.data_id && !task.location.id }"
    @change="$emit('change', $event)"
    :value="taskArea.data_id"
  />
</template>

<script>
import EditableCell from '@/components/common/editable-cell'

export default {
  name: 'TaskAreaLocationId',

  components: {
    EditableCell
  },

  props: {
    task: Object,
    taskArea: Object
  }
}
</script>
