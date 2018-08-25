<template>
  <span class="icon" style="cursor: pointer;">
    <i v-if="value === true"
      style="color: #20a0ff"
      class="iconfont icon-check-square"
    ></i>
    <i v-else-if="value === 'minus'"
      style="color: #20a0ff"
      class="iconfont icon-minus-square"
    ></i>
    <i v-else-if="value === false"
      style="color: #c0c0c0"
      class="iconfont icon-square"
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
    }
  }
}
</script>
