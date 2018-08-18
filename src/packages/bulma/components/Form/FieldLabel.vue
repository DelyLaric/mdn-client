<template>
  <div
    :class="[
      'field-label',
      size === '' ? false : 'is-' + size
    ]"
    style="white-space: nowrap;"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'normal'
    }
  }
}
</script>
