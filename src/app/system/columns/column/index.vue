<template>
  <div class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card" style="width: 600px">
      <header class="modal-card-head">
        <p class="modal-card-title">流程属性管理</p>
        <button
          class="delete"
          @click="handleClose">
        </button>
      </header>

      <section class="modal-card-body">
        <NameField />
        <div style="height: 12px"></div>
        <TextField />
        <div style="height: 12px"></div>
        <CommentField />
      </section>

      <div class="modal-card-foot">
        <a
          class="button is-danger"
          @click="$router.push({
            name: 'area column delete',
            params: { column }
          })">删除属性
        </a>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { remove } from '@/api/area-columns'
import { storeMixin } from '../_runtime'

import NameField from './name'
import TextField from './text'
import CommentField from './comment'

export default {
  name: 'AreaColumnManage',

  components: {
    NameField,
    TextField,
    CommentField
  },

  mixins: [storeMixin],

  props: {
    column: String
  },

  methods: {
    handleClose () {
      this.$router.push({
        name: 'area columns'
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
