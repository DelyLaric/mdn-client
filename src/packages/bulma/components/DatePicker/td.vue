<template>
  <td
    style="min-width: 120px"
    v-text="value"
    :class="{
      'is-selectable': true,
      'is-changed': isActive
    }"
  />
</template>

<script>
import BasicInput from './BasicInput'

export default {
  mixins: [BasicInput]
}
</script>
