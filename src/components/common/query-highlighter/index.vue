<template>
  <span v-html="highlight"/>
</template>

<script>
export default {
  props: {
    text: {},
    query: {}
  },

  computed: {
    highlight () {
      const text = this.text + ''
      const query = this.query

      if (query === '') return text

      return typeof text === 'string' ? text.replace(
        query,
        `<strong class="has-background-warning">${query}</strong>`
      ) : text
    }
  }
}
</script>
