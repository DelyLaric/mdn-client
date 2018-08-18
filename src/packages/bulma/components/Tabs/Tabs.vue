<template>
  <div :class="[
    'tabs',
    fullwidth ? 'is-fullwidth' : false
  ]">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tabs',

  model: {
    prop: 'currentTab',
    event: 'change'
  },

  props: {
    currentTab: {

    },

    fullwidth: {
      type: Boolean,
      default: false
    }
  }
}
</script>
