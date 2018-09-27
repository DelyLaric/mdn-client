<template>
  <DestroyDialog
    v-if="task"
    @close="handleClose"
    :handler="handleConfirm">
    任务
    <span class="tag is-medium">
      {{task.comment}}
    </span>
    将无法恢复
  </DestroyDialog>
</template>

<script>
import DestroyDialog from '@/components/common/destroy-dialog'

export default {
  name: 'TaskDestroy',

  components: {
    DestroyDialog
  },

  props: {
    task: Object,
    handleDestroy: Function
  },

  methods: {
    handleClose () {
      const { plantId, projectId } = this.$route.params

      this.$router.push({
        name: 'project tasks',
        params: { plantId, projectId }
      })
    },

    async handleConfirm () {
      await this.handleDestroy({id: this.task.id})
      this.handleClose()
    }
  }
}
</script>
