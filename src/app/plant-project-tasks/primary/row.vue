<template>
  <tr>
    <td class="is-centered">{{index}}</td>
    <StatusCell
      :id="task.id"
      :total="total"
      :index="index"
      :value="task.status"
    />
    <EditableCell
      style="min-width: 300px"
      :value="task.comment"
      @change="$wait(() => updateComment({id, comment: $event}))"
      ref="comment"
    />
    <td class="is-centered">{{task.due_time}}</td>
    <td class="is-centered">{{task.created_at.slice(0, 10)}}</td>
    <td class="is-centered">
      <a
        @click="$wait(() => destroy({id: task.id}))">
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
    task: Object,
    index: Number,
    total: Number,
  },

  computed: {
    id () {
      return this.task.id
    }
  },

  methods: {
    ...mapActions('tasks', [
      'destroy',
      'updateComment'
    ])
  }
}
</script>
