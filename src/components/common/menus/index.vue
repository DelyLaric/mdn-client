<template>
  <div
    class="menu-container"
    :style="{'width': _width}">
    <el-scrollbar style="height: 100%; overflow: hidden">
    <div
      :class="{ 'menu-list': true, 'is-active': isActive }"
      :style="{'max-width': _width, 'min-width': _width}">
      <MenuItem
        v-for="menu in menus" :key="menu.text"
        v-bind="menu"
      />
    </div>
    <div
      v-if="hasToggler"
      @mouseout="isActive = false"
      @mousemove="isActive = true"
      @click="isExpanding = !isExpanding"
      :class="{
        'menu-toggler': true,
        'is-active': isActive
      }">
      <div style="width: 0.5rem"></div>
    </div>
    </el-scrollbar>
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

  data () {
    return {
      isActive: false,
      isExpanding: true
    }
  },

  computed: {
    _width () {
      return this.isExpanding ? this.width : 0
    }
  },

  props: {
    menus: {
      type: Array,
      required: true
    },

    hasToggler: {
      type: Boolean,
      default: false
    },

    width: {
      type: String,
      default: '280px'
    }
  }
}
</script>
