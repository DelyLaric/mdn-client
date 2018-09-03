<template>
  <tr>
    <td class="is-centered">{{index}}</td>
    <StatusCell :value="project.status"/>
    <EditableCell
      style="min-width: 300px"
      :value="project.comment"
      @change="$wait(() => updateComment({
        id: project.id,
        value: $event
      }))"
      ref="comment"
    />
    <td class="is-centered">{{project.created_at.slice(0, 10)}}</td>
    <td class="is-centered">{{project.due_time}}</td>
    <td class="is-centered">
      <a
        @click="$wait(() => destroy({id: project.id}))">
        删除
      </a>
    </td>
  </tr>
</template>

<script>
import { mapActions } from 'vuex'
import StatusCell from './status-cell'
import EditableCell from '@/components/common/editable-cell'

export default {
  name: 'TaskPrimaryViewItem',

  components: {
    StatusCell,
    EditableCell
  },

  props: {
    index: Number,
    project: Object
  },

  methods: {
    ...mapActions('tasks', [
      'destroy',
      'updateComment'
    ])
  }
}
</script>
