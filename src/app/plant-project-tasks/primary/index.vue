<template>
  <table class="table is-bordered is-fullwidth is-nowrapped">
    <thead>
      <th class="is-centered" style="width: 1px">#</th>
      <th class="is-centered" >任务状态</th>
      <th>备注</th>
      <th class="is-centered" >创建时间</th>
      <th class="is-centered" >截止日期</th>
      <th class="is-centered">操作</th>
    </thead>
    <tbody>
      <InfoItem
        v-for="(id, index) in parent.list"
        :key="id"
        :project="parent.data[id]"
        :index="index"
        ref="items"
      />
    </tbody>
    <router-view />
  </table>
</template>

<script>
import InfoItem from './row'

export default {
  name: 'TaskPrimaryView',

  components: {
    InfoItem
  },

  computed: {
    parent () {
      return this.$parent
    }
  }
}
</script>
