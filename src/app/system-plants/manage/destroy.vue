<template>
  <DestroyDialog
    @close="handleClose"
    :handler="handleConfirm">
    <div>
        工厂
        <span class="tag is-medium">
          {{plant.name}}
        </span>
        将无法恢复
    </div>
  </DestroyDialog>
</template>

<script>
import { mapActions } from 'vuex'
import DestroyDialog from '@/components/common/destroy-dialog'

export default {
  name: 'PlantDestroy',

  components: {
    DestroyDialog
  },

  props: {
    plant: Object
  },

  methods: {
    ...mapActions({
      destroy: 'plants/destroy'
    }),

    handleClose () {
      this.$router.push({
        name: 'plant manage',
        params: { plantId: this.plant.id }
      })
    },

    async handleConfirm () {
      await this.destroy({ id: this.plant.id })
      this.$router.push({name: 'plants'})
    }
  }
}
</script>
