<template>
  <td
    :class="{
      'is-editable': true,
      'is-changed': isChanged || hasChanged,
      'is-outlined': isOutlined,
    }"
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
    highlight: String,
    isOutlined: Boolean,
  },

  data () {
    return {
      inputValue: '',
      isFocused: false,
      matchedText: typeof this.value === 'string' ? this.value.replace(
        this.highlight,
        `<strong class="has-background-warning">${this.highlight}</strong>`
      ) : this.value
    }
  },

  computed: {
    hasChanged () {
      return this.value !== this.inputValue
    }
  },

  watch: {
    value: {
      immediate: true,
      handler () {
        this.inputValue = this.value
      }
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
      this.inputValue = event.target.innerText.trim()
      if (!valueEqual(this.value, this.inputValue)) {
        this.$emit('change', this.inputValue)
      }
    },

    // not working
    handleEsc (event) {
      event.target.blur()
    },

    focus () {
      this.$refs.td.focus()
    }
  }
}

function valueEqual (foo, bar) {
  if (foo === null) foo = ''
  if (bar === null) bar = ''

  return foo === bar
}
</script>
