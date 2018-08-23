<template>
  <a
    @mouseover="isActive = true"
    @mouseout="isActive = false"
    @click="handleClick"
    :class="{'panel-block': true, 'is-active': isActive}"
    style="height: 60px; display: flex;">
    <span>{{area.name}}</span>
    <span class="icon" style="margin-left: auto">
      <i class="iconfont icon-gear" />
    </span>
  </a>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    areaId: Number
  },

  data () {
    return {
      isActive: false
    }
  },

  computed: mapState({
    area (state) {
      return state.areas.data[this.areaId]
    }
  }),

  methods: {
    handleClick () {
      this.$router.push({
        name: 'area manage',
        params: { areaId: this.areaId }
      })
    }
  }
}
</script>
