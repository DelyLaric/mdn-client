<template>
  <ul class="is-unselectable">
    <li>
      <a
        class="menu"
        @click="click && click()"
        @dblclick="isExpanding = !isExpanding"
        :class="{'is-active': actived}"
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
          v-if="children.length > 0"
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

    icon: {
      type: String,
      default: ''
    },

    click: {
      type: Function
    },

    actived: {
      type: Boolean,
      default: false
    },

    expanding: {
      type: Boolean,
      default: false
    },

    children: {
      type: Array,
      default: () => []
    },

    depth: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      isExpanding: this.expanding
    }
  }
}
</script>
