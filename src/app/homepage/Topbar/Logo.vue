<template>
  <div class="level-left is-unselectable" style="cursor: pointer">
    <p
      class="app-logo title is-3"
      @click="$router.push('/')">
      &nbsp;&nbsp;LOGO
    </p>
  </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>
