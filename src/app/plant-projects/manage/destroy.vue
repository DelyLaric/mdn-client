<template>
  <DeleteDialog
    @close="handleClose"
    :handler="parent.handleDestroy">
    项目
    <span class="tag is-medium">
      {{parent.project.text}}
    </span>
    将无法恢复
  </DeleteDialog>
</template>

<script>
import DeleteDialog from '@/components/common/delete-dialog'

export default {
  components: {
    DeleteDialog
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
