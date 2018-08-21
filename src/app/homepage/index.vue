<template>
  <DataLoader>
    <div class="full-container">
      <div class="full-container is-flex is-flex-column">
        <Topbar />
        <div class="full-container is-flex-auto">
          <router-view />
        </div>
      </div>
    </div>
  </DataLoader>
</template>

<script>
import Topbar from './topbar'
import Bootstrap from './boot'
import DataLoader from './data-loader'

export default {
  name: 'Homepage',

  mixins: [Bootstrap],

  components: {
    Topbar,
    DataLoader
  }
}
</script>
