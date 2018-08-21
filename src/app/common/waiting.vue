<template>
  <div v-show="show" class="modal is-active" style="z-index: 99999">
    <div class="modal-background"></div>
    <div class="loading"></div>
  </div>
</template>

<script>
export default {
  computed: {
    show () {
      return this.$store.state.isWaiting
    }
  }
}
</script>
