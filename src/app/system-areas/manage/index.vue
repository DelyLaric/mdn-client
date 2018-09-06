<template>
  <div v-if="area" class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card" style="width: 680px; max-height: 800px;">
      <header class="modal-card-head">
        <p class="modal-card-title">流程属性管理</p>
        <button
          class="delete"
          @click="handleClose">
        </button>
      </header>

      <section class="modal-card-body">
        <InputModifyField
          text="流程区域表名"
          :data="area.name"
          :handler="name => updateName({id, name})"
        />
        <div style="height: 12px"></div>

        <InputModifyField
          text="流程区域名"
          :data="area.text"
          :handler="text => updateText({id, text})"
        />
        <div style="height: 12px"></div>

        <InputModifyField
          width="320px"
          text="备注"
          :data="area.comment"
          :handler="comment => updateComment({id, comment})"
        />
        <div style="height: 12px"></div>

        <ColumnsField
          :columns="columns"
          :data="area.columns"
          :handler="columns => updateColumns({id, columns})"
        />
      </section>

      <div class="modal-card-foot">
        <a
          class="button is-danger"
          @click="$router.push({
            name: 'area destroy',
            params: { areaId: id }
          })">删除区域
        </a>
      </div>
    </div>
    <router-view :area="area"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import ColumnsField from './columns'
import InputModifyField from '@/components/common/input-modify-field'

export default {
  name: 'AreaManage',

  components: {
    ColumnsField,
    InputModifyField
  },

  props: {
    area: Object,
    columns: Array
  },

  computed: {
    id () {
      return this.area.id
    }
  },

  methods: {
    ...mapActions('areas', [
      'updateName',
      'updateText',
      'updateComment',
      'updateColumns'
    ]),

    handleClose () {
      this.$router.push({ name: 'areas' })
    }
  }
}
</script>
