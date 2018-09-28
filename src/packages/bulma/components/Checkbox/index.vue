<template>
  <span @click="$emit('click')" class="icon" style="cursor: pointer;">
    <i v-if="value === true"
      :class="`has-text-${color}`"
      class="iconfont icon-check-square"
    ></i>
    <i v-else-if="value === 'minus'"
      :class="`has-text-${color}`"
      class="iconfont icon-minus-square"
    ></i>
    <i v-else-if="value === false"
      class="iconfont icon-square has-text-grey-light"
    ></i>
  </span>
</template>

<script>
export default {
  model: {
    prop: 'value'
  },

  props: {
    value: {
      default: true
    },

    disabled: Boolean
  },

  computed: {
    color () {
      return this.disabled ? 'grey-light' : 'link'
    }
  }
}
</script>
