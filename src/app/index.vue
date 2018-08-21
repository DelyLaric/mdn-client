<template>
  <div class="full-container">
    <AppWaiting />
    <router-view />
  </div>
</template>

<script>
import AppWaiting from './common/waiting'

export default {
  name: 'App',

  components: {
    AppWaiting
  }
}
</script>
