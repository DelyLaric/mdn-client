<template>
  <DestroyDialog
    v-if="task"
    @close="handleClose"
    :handler="handleDestroy">
    任务
    <span class="tag is-medium">
      {{task.comment}}
    </span>
    将无法恢复
  </DestroyDialog>
</template>

<script>
import { mapActions } from 'vuex'
import DestroyDialog from '@/components/common/destroy-dialog'

export default {
  name: 'TaskDestroy',

  components: {
    DestroyDialog
  },

  props: {
    task: Object
  },

  methods: {
    ...mapActions({
      destroy: 'tasks/destroy'
    }),

    handleClose () {
      const { plantId, projectId } = this.$route.params

      this.$router.push({
        name: 'project tasks',
        params: { plantId, projectId }
      })
    },

    async handleDestroy () {
      await this.destroy({id: this.task.id})
      this.handleClose()
    }
  }
}
</script>
