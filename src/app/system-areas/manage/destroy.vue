<template>
  <DestroyDialog
    @close="handleClose"
    :handler="handleConfirm">
    <div>
      流程区域
      <span class="tag is-medium">
        {{area.text}}
      </span>
      将无法恢复
    </div>
  </DestroyDialog>
</template>

<script>
import { mapActions } from 'vuex'
import DestroyDialog from '@/components/common/destroy-dialog'

export default {
  components: {
    DestroyDialog
  },

  props: {
    area: Object
  },

  methods: {
    ...mapActions({
      destroy: 'areas/destroy'
    }),

    handleClose () {
      this.$router.push({
        name: 'area manage',
        params: { areaId: this.area.id }
      })
    },

    async handleConfirm () {
      await this.destroy({id: this.area.id})
      this.$router.push({name: 'areas'})
    }
  }
}
</script>
