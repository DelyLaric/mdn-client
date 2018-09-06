<template>
  <DestroyDialog
    :handler="handleConfirm"
    @close="handleClose">
    <div>
      流程属性
      <span class="tag is-medium">
        {{column.name}}
      </span>
      将无法恢复
    </div>
  </DestroyDialog>
</template>

<script>
import { mapActions } from 'vuex'
import DestroyDialog from '@/components/common/destroy-dialog'

export default {
  name: 'AreaColumnDestroy',

  components: {
    DestroyDialog
  },

  props: {
    column: Object
  },

  methods: {
    ...mapActions({
      destroy: 'columns/destroy'
    }),

    handleClose () {
      this.$router.push({
        name: 'area column manage',
        params: { columnId: this.column.id }
      })
    },

    async handleConfirm () {
      await this.destroy({
        id: this.column.id
      })
      this.$router.push({name: 'area columns'})
    }
  }
}
</script>
