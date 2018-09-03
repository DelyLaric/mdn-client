<template>
  <DestroyDialog
    @close="handleClose"
    :handler="parent.handleDestroy">
    项目
    <span class="tag is-medium">
      {{parent.project.text}}
    </span>
    将无法恢复
  </DestroyDialog>
</template>

<script>
import DestroyDialog from '@/components/common/destroy-dialog'

export default {
  components: {
    DestroyDialog
  },

  computed: {
    // @danger
    parent () {
      return this.$parent
    }
  },

  methods: {
    handleClose () {
      this.$router.push({
        name: 'plant projects',
        params: this.$route.params
      })
    }
  }
}
</script>
