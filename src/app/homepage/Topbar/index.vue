<template>
  <nav class="app-level level">
    <Logo />
    <div class="level-right">
      <ModuleItem
        v-for="item in moduleItems"
        :key="item.route"
        v-bind="item"
      />
      <p class="level-item" style="width: 6px">
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
        { route: 'system', text: '系统管理' }
      ]
    }
  }
}
</script>
