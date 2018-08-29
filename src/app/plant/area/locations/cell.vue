<template>
  <td
    :class="{ 'is-active': isChanged, 'is-editable': true }"
    v-html="!isFocused && value ? matchedText : value"
    @keypress.enter="handleEsc"
    @focus="handleFocus"
    @blur="handleBlur"
    tabindex="0"
    ref="td"
  />
</template>

<script>
export default {
  props: {
    value: {},
    isChanged: {},
  },

  data () {
    return {
      isFocused: false,
      matchedText: typeof this.value === 'string' ? this.value.replace(
        this.$parent.queryText,
        `<strong class="has-background-warning">${this.$parent.queryText}</strong>`
      ) : this.value
    }
  },

  methods: {
    handleFocus (event) {
      this.isFocused = true
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
      const value = event.target.innerText.trim()
      if (this.value !== value) {
        this.$emit('change', value)
      }
    },

    handleEsc (event) {
      event.target.blur()
    },

    focus () {
      this.$refs.td.focus()
    }
  }
}
</script>
