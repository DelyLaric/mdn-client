<template>
  <div class="control">
    <div class="select">
      <select
        v-model="state"
        @change="$emit('change', state)">
        <option :value="null">全部</option>
        <option :value="0">待规划</option>
        <option :value="1">规划中</option>
        <option :value="2">已规划</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: {}
  },

  data () {
    return {
      state: null
    }
  }
}
</script>
