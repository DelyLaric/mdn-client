<template>
  <textarea
    class="textarea"
    :value="value"
    v-on="$listeners"
    :class="[
      'input',
      color === '' ? false : 'is-' + color
    ]"
  />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    },

    value: {
      default: ''
    },

    errors: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
