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
          :handler="name => updateName({id, name, table})"
        />

        <div style="height: 12px"></div>

        <InputModifyField
          text="属性名"
          :data="column.text"
          :handler="text => updateText({id, text})"
        />

        <div style="height: 12px"></div>

        <InputModifyField
          text="备注"
          width="320px"
          :data="column.comment"
          :handler="comment => updateComment({id, comment})"
        />
      </section>

      <div class="modal-card-foot">
        <a
          class="button is-danger"
          @click="$router.push({
            name: 'system table column destroy',
            params: $route.params
          })">删除属性
        </a>
      </div>
    </div>
    <router-view
      :schema="schema"
      :column="column"
      :table="table"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import InputModifyField from '@/components/common/input-modify-field'

export default {
  name: 'SystemTableColumnManage',

  components: {
    InputModifyField
  },

  props: {
    table: {},
    schema: Object,
    column: Object
  },

  computed: {
    id () {
      return this.column.id
    }
  },

  methods: {
    ...mapActions('columns', [
      'updateName',
      'updateText',
      'updateComment'
    ]),

    handleClose () {
      this.$router.push({
        name: 'system table columns',
        params: this.$route.params
      })
    }
  }
}
</script>
