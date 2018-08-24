<template>
  <div class="app-level is-flex" style="align-items: center; white-space: nowrap">
    <div style="width: 0.75rem"></div>

    <Logo />

    <PlantItem style="margin-right: 12px; margin-left: auto" />

    <ModuleItem
      v-for="item in moduleItems"
      :key="item.route"
      v-bind="item"
    />

    <div style="width: 0.75rem"></div>
  </div>
</template>

<script>
import Logo from './Logo'
import PlantItem from './PlantItem'
import ModuleItem from './ModuleItem'

export default {
  components: {
    Logo,
    ModuleItem,
    PlantItem
  },

  data () {
    return {
      moduleItems: [
        { route: 'system', text: '后台管理' }
      ]
    }
  }
}
</script>
