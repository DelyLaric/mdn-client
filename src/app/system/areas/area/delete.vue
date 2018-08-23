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
        流程区域
        <span class="tag is-medium">
          {{area.text}}
        </span>
        将无法恢复
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-primary"
          @click="$store.dispatch('wait', handleConfirm)">
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
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    areaId: [String, Number]
  },

  computed: mapState({
    area (state) {
      return state.areas.data[this.areaId]
    }
  }),

  methods: {
    ...mapActions({
      delete: 'areas/delete'
    }),

    handleClose () {
      this.$router.push({
        name: 'area manage',
        params: { areaId: this.areaId }
      })
    },

    async handleConfirm () {
      await this.delete(this.areaId)
      this.$router.push({name: 'areas'})
    }
  }
}
</script>
