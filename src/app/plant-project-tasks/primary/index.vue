<template>
  <table class="table is-bordered is-fullwidth is-nowrapped">
    <thead>
      <th class="is-centered" style="width: 1px">#</th>
      <th class="is-centered" style="width: 120px;">任务状态</th>
      <th>备注</th>
      <th class="is-centered" >创建时间</th>
      <th class="is-centered" >截止日期</th>
      <th class="is-centered">操作</th>
    </thead>
    <tbody>
      <InfoItem
        v-for="(task, index) in tasks"
        :total="tasks.length"
        :index="index"
        :key="task.id"
        :task="task"
        ref="items"
      />
    </tbody>
  </table>
</template>

<script>
import InfoItem from './row'

export default {
  name: 'TaskPrimaryView',

  components: {
    InfoItem
  },

  props: {
    tasks: Array
  }
}
</script>
