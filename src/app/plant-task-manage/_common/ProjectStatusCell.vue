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
        true: { text: '进行中', color: 'success' },
        false: { text: '已归档', color: 'info' }
      }
    }
  },

  computed: {
    state () {
      const res = this.states[this.value === null]

      if (res) return res
      else return {
        color: 'none',
        text: '其他'
      }
    }
  }
}
</script>
