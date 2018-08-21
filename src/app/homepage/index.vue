<template>
  <div class="full-container">
    <div class="full-container is-flex is-flex-column">
      <Topbar />
      <div class="full-container is-flex-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Topbar from './Topbar'

export default {
  name: 'Homepage',

  components: {
    Topbar
  }
}
</script>
