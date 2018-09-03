<template>
  <div class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card" style="width: 400px">
      <header class="modal-card-head">
        <p class="modal-card-title">删除确认</p>
        <button
          class="delete"
          @click="handleClose">
        </button>
      </header>
      <section class="modal-card-body">
        工厂
        <span class="tag is-medium">
          {{plant.name}}
        </span>
        将无法恢复
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-primary"
          @click="$wait(handleConfirm)">
          删除
        </button>
        <button
          class="button"
          @click="handleClose">
          取消
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PlantDestroy',

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
