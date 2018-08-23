<template>
  <nav class="app-level level">
    <Logo />
    <div class="level-right">
      <PlantItem style="margin-right: 12px" />
      <ModuleItem
        v-for="item in moduleItems"
        :key="item.route"
        v-bind="item"
      />
      <p class="level-item" style="width: 20px">
      </p>
    </div>
  </nav>
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
