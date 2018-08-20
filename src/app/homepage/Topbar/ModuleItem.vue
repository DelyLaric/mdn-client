<template>
  <p class="level-item is-unselectable">
    <strong v-if="hasMatched(route)">流程区域管理</strong>
    <a v-else @click="handleClick">
      流程区域管理
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
