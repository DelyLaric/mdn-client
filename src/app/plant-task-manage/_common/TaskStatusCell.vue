<template>
  <td class="is-centered">
    <span :class="['tag', 'is-' + state.color]">
      {{state.text}}
    </span>
  </td>
</template>

<script>
export default {
  props: {
    value: {}
  },

  data () {
    return {
      states: {
        0: { text: '待规划', color: 'warning' },
        1: { text: '规划中', color: 'info' },
        2: { text: '已完成', color: 'success' }
      }
    }
  },

  computed: {
    state () {
      const res = this.states[this.value]

      if (res) return res
      else return {
        color: 'none',
        text: '其他'
      }
    }
  }
}
</script>
