<template>
  <p
    class="level-item is-unselectable"
    @click="$router.push({name: route})">
    <strong v-if="hasMatched(route)">流程区域管理</strong>
    <a v-else>流程区域管理</a>
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
    }
  }
}
</script>
