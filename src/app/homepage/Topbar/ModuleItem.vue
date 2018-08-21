<template>
  <p class="level-item is-unselectable">
    <strong v-if="hasMatched(route)">{{text}}</strong>
    <a v-else @click="handleClick">
      {{text}}
    </a>
  </p>
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
    hasMatched (routeName) {
      return Boolean(this.$route.matched.find(
        route => route.name === routeName
      ))
    },

    handleClick () {
      this.$router.push({name: this.route})
    }
  }
}
</script>
