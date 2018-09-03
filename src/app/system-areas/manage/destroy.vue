<template>
  <div class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card" style="width: 400px">
      <header class="modal-card-head">
        <p class="modal-card-title">删除确认</p>
        <button
          class="destroy"
          @click="handleClose">
        </button>
      </header>
      <section class="modal-card-body">
        流程区域
        <span class="tag is-medium">
          {{area.text}}
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
        取消</button>
      </footer>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
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
