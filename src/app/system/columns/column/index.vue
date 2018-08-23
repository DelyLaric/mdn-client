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
        <InputModifyField
          text="字段名"
          :data="column.name"
          :handler="updateName"
        />

        <div style="height: 12px"></div>

        <InputModifyField
          text="属性名"
          :data="column.text"
          :handler="updateText"
        />

        <div style="height: 12px"></div>

        <InputModifyField
          text="备注"
          width="320px"
          :data="column.comment"
          :handler="updateComment"
        />
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
import { mapGetters, mapActions } from 'vuex'

import InputModifyField from '@/components/common/input-modify-field'

export default {
  name: 'AreaColumnManage',

  components: {
    InputModifyField
  },

  computed: mapGetters({
    column: 'columns/column'
  }),

  methods: {
    ...mapActions('columns', [
      'updateName',
      'updateText',
      'updateComment'
    ]),

    handleClose () {
      this.$router.push({
        name: 'area columns'
      })
    },

    handleChange (callback) {
      console.log(event)
    }
  }
}
</script>
