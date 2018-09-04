<template>
  <table class="table is-bordered is-nowrapped">
    <thead>
      <th class="is-centered" style="width: 1px">#</th>
      <th>备注</th>
      <th class="is-centered" style="width: 120px;">任务状态</th>
      <th class="is-centered" >截止日期</th>
      <th class="is-centered" >创建时间</th>
      <th class="is-centered">操作</th>
    </thead>
    <tbody>
      <tr v-for="(task, index) in tasks" :key="task.id">
        <td class="is-centered">{{index}}</td>
        <EditableCell
          :value="task.comment"
          @change="$wait(() => updateComment({id: task.id, comment: $event}))"
          ref="comment"
        />
        <StatusCell
          :id="task.id"
          :index="index"
          :value="task.status"
          :total="tasks.length"
        />
        <DuetimeCell
          :id="task.id"
          :value="task.duetime"
        />
        <td class="is-centered">{{task.created_at.slice(0, 10)}}</td>
        <td class="is-centered">
          <a @click="handleClickDestroy">
            删除
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions } from 'vuex'
import StatusCell from './status-cell'
import DuetimeCell from './duetime-cell'
import EditableCell from '@/components/common/editable-cell'

export default {
  name: 'TaskPrimaryView',

  components: {
    StatusCell,
    DuetimeCell,
    EditableCell
  },

  props: {
    tasks: Array
  },

  methods: {
    ...mapActions('tasks', [
      'updateComment'
    ]),

    handleClickDestroy () {
      this.$router.push({
        name: 'task destroy',
        params: {
          taskId: this.task.id,
          ...this.$route.params
        }
      })
    }
  }
}
</script>
