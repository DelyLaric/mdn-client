<template>
  <a
    @click="handleClick"
    :class="{
      'level-item': true,
      'is-unselectable': true,
      'is-active': hasMatched(),
    }">
    {{text}}
  </a>
</template>

<script>
export default {
  props: {
    route: String,

    text: {
      type: String,
      required: true
    }
  },

  methods: {
    hasMatched () {
      return Boolean(this.$route.matched.find(
        route => route.name === this.route
      ))
    },

    handleClick () {
      if (!this.hasMatched()) {
        this.$router.push({name: this.route})
      }
    }
  }
}
</script>
