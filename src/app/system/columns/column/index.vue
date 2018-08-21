<template>
  <div v-if="column" class="modal is-active">
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
            params: { column: column.name }
          })">删除属性
        </a>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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

  computed: mapGetters({
    column: 'columns/column'
  }),

  methods: {
    handleClose () {
      this.$router.push({
        name: 'area columns'
      })
    }
  }
}
</script>
