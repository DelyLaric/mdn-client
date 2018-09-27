<template>
  <DatePicker
    class="is-centered"
    :is-active="newValue !== value"
    @change="$emit('change', $event)"
    wrapper="td" :value="value"
  />
</template>

<script>
export default {
  props: {
    value: {},
    id: Number
  },

  data () {
    return {
      newValue: ''
    }
  }
}
</script>
