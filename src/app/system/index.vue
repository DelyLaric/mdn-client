<template>
  <div class="full-container is-flex">
    <MenuList :menus="MenuData" width="220px" />
    <router-view />
  </div>
</template>

<script>
import MenuData from './menus'
import MenuList from '@/components/common/menus'

export default {
  name: 'SystemAdmin',

  components: {
    MenuList
  },

  data () {
    return {
      MenuData
    }
  }
}
</script>
