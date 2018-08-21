<template>
  <ul class="is-unselectable" style="white-space: nowrap">
    <li>
      <a
        class="menu"
        @click="click"
        @dblclick="toggle"
        :class="{'is-active': isActived}"
        :style="{
          'cursor': 'default',
          'padding-left': 12 + (depth ) * 16 + (icon ? 0 : 20) + 'px'
        }">
        <!-- 菜单图标 -->
        <Icon v-if="icon" :name="icon" />

        <span style="margin-left: 6px">
          {{text}}
        </span>

        <span
          v-if="hasChildren"
          class="is-pulled-right"
          style="cursor: pointer"
          @click.stop="isExpanding = !isExpanding">
          <Icon v-show="isExpanding" name="arrow-down"/>
          <Icon v-show="!isExpanding" name="arrow-up"/>
        </span>
      </a>
    </li>

    <div v-if="children.length" v-show="isExpanding">
      <MenuItem
        v-for="(child, key) in children"
        :key="key"
        v-bind="child"
        :depth="depth + 1"
      />
    </div>
  </ul>
</template>

<script>
export default {
  name: 'MenuItem',

  props: {
    text: {
      type: String,
      required: true
    },

    route: {
      type: [String, Object],
      default: ''
    },

    icon: {
      type: String,
      default: ''
    },

    actived: {
      type: Function
    },

    children: {
      type: Array,
      default: () => []
    },

    expanding: {
      type: Boolean,
      default: false
    },

    depth: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      router: this.$router,
      isExpanding: this.expanding
    }
  },

  computed: {
    hasChildren () {
      return this.children.length > 0
    },

    hasRoute () {
      return this.route.length > 0
    },

    isActived () {
      if (this.actived) return Boolean(this.actived())
      if (this.router === '') return
      if (typeof this.route === 'string') {
        return this.$route.path === this.route
      } else {
        const route = this.$route.matched.find(route => route.name === this.route.name)
        if (!route) return false

        if (!this.route.params) return true

        for (let key in this.$route.params) {
          if (this.$route.params[key] !== this.route.params[key]) return false
        }

        return true
      }
    }
  },

  methods: {
    push () {
      this.$router.push(this.route)
    },

    toggle () {
      this.isExpanding = !this.isExpanding
    },

    click () {
      if (this.route) this.push(this.route)
      else this.isExpanding = !this.isExpanding
    }
  }
}
</script>
