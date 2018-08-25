<template>
  <div class="full-container is-flex is-flex-column">
    <RouteTabs :tabs="tabs"/>
    <div class="full-container is-flex-auto">
      <router-view />
    </div>
  </div>
</template>

<script>
import RouteTabs from '@/components/common/tabs'

export default {
  components: {
    RouteTabs
  },

  props: {
    areaId: {},
    plantId: {},
  },

  computed: {
    tabs () {
      const params = {
        areaId: this.areaId,
        plantId: this.plantId
      }

      return [
        {
          text: '区域管理',
          route: {
            name: 'area locations',
            params
          }
        },
        {
          text: '数据上传',
          route: {
            name: 'locations upload',
            params
          }
        }
      ]
    }
  },

  watch: {
    '$router.currentRoute': {
      immediate: true,
      handler (val) {
        if (val.name === 'plant area') {
          this.$router.push({
            name: 'area locations',
            params: val.params
          })
        }
      }
    }
  }
}
</script>
