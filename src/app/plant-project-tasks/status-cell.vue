<template>
  <td
    :class="{
      'is-centered': true,
      'is-hoverable': true,
      'is-selectable': true,
      'is-unselectable': true,
      'is-changed': isShowDropdown
    }"
    style="min-width: 120px; max-width: 120px; padding: 0"
    @click="isShowDropdown = !isShowDropdown">
    <span :class="['tag', 'is-' + state.color]">
      {{state.text}}
    </span>
    <div
      class="dropdown-menu"
      :class="{'is-up': !down}"
      :style="{ display: isShowDropdown ? 'block' : 'none' }">
      <div class="is-background"></div>
      <div class="dropdown-content" style="width: 160px">
        <a
          v-for="status in [0, 1, 2]" :key="status"
          style="padding-left: 2.5rem"
          class="dropdown-item"
          @click="$emit('change', status)">
          {{states[status].text}}
        </a>
      </div>
    </div>
  </td>
</template>

<script>
export default {
  name: 'TaskStatus',

  props: {
    value: {},
    down: Boolean,
  },

  data () {
    return {
      isShowDropdown: false,
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
