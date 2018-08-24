<template>
  <div class="is-unselectable" style="cursor: pointer">
    <div
      class="app-logo title is-3"
      @click="$router.push('/')">
      LOGO
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>
