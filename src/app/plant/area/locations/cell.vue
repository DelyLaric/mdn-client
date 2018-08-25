<template>
  <td
    class="is-editable"
    :class="{'is-active': isChanged}"
    v-text="value"
    @focus="handleFocus"
    @blur="handleBlur"
    @keypress.enter="handleEsc"
    tabindex="0"
  />
</template>

<script>
export default {
  props: {
    value: {},

    isChanged: {}
  },

  methods: {
    handleFocus (event) {
      const range = document.createRange()
      const selection = window.getSelection()
      range.selectNodeContents(event.target)
      selection.removeAllRanges()
      selection.addRange(range)
    },

    handleBlur (event) {
      const range = document.createRange()
      const selection = window.getSelection()
      range.selectNodeContents(event.target)
      selection.removeAllRanges()
      this.$emit('change', event.target.innerText)
    },

    handleEsc (event) {
      event.target.blur()
    }
  }
}
</script>
