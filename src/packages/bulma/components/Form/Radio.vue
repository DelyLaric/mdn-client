<template>
  <label
    @click="$emit('click')"
    style="display: inline-block; font-weight: 400; margin-right: 8px"
    class="is-unselectable"
  >
    <i v-if="value"
      class="iconfont icon-radio-checked has-text-info"
    />
    <i v-else
      style="color: #c0c0c0"
      class="iconfont icon-radio-unchecked"
    />
    <span v-if="text">
      {{text}}
    </span>
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    },

    value: {}
  }
}
</script>
