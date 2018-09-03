<template>
  <a
    @mouseover="isActive = true"
    @mouseout="isActive = false"
    @click="handleClick"
    :class="{'panel-block': true, 'is-active': isActive}"
    style="height: 60px; display: flex;">
    <span>{{area.text}}</span>
    <span class="icon" style="margin-left: auto">
      <i class="iconfont icon-gear" />
    </span>
  </a>
</template>

<script>
export default {
  name: 'PlantAreaItem',

  props: {
    area: Object
  },

  data () {
    return {
      isActive: false
    }
  },

  methods: {
    handleClick () {
      this.$router.push({
        name: 'area manage',
        params: { areaId: this.area.id }
      })
    }
  }
}
</script>
