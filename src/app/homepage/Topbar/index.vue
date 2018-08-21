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
import ModuleItem from './ModuleItem'

export default {
  components: {
    Logo,
    ModuleItem
  },

  data () {
    return {
      moduleItems: [

      ]
    }
  },

  methods: {

  }
}
</script>
