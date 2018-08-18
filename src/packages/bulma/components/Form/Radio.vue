<template>
  <label
    @click="$emit('click', value)"
    style="display: inline-block; font-weight: 400; margin-right: 8px"
    class="is-unselectable"
  >
    <i v-if="checked"
      class="iconfont icon-radio-checked has-text-info"
      @click="$emit('click-radio')"
    />
    <i v-else
      style="color: #c0c0c0"
      class="iconfont icon-radio-unchecked"
      @click="$emit('click-radio')"
    />
    <span v-if="label">
      {{label}}
    </span>
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: true
    },

    label: {
      type: String
    },

    value: {}
  }
}
</script>
