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
        流程属性
        <span class="tag is-medium">
          {{column}}
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
    </div>
  </div>
</template>

<script>
import { remove } from '@/api/area-columns'
import { getLocalStore } from '../_runtime'

export default {
  props: {
    column: String
  },

  data () {
    return {
      store: getLocalStore()
    }
  },

  methods: {
    handleClose () {
      this.$router.push({
        name: 'area columns',
      })
    },

    async handleConfirm () {
      await remove(this.column)

      this.store.commit('removeColumn', this.column)
      this.handleClose()
    }
  }
}
</script>
