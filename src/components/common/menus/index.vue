<template>
  <div
    class="menu-list menu-container"
    :style="{'max-width': width, 'min-width': width}">
    <MenuItem
      v-for="menu in menus" :key="menu.text"
      v-bind="menu"
    />
  </div>
</template>

<script>
import MenuItem from './item'

export default {
  components: {
    MenuItem
  },

  render (h) {
    return h(
      'div',
      { class: 'menu-list' },
      this.menus.map(menu => {
        return h(
          MenuItem,
          {
            props: menu
          }
        )
      })
    )
  },

  props: {
    menus: {
      type: Array,
      required: true
    },

    width: {
      type: String,
      default: '280px'
    }
  }
}
</script>
