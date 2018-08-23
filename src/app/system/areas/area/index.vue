<template>
  <div v-if="area" class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card" style="width: 680px">
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
          :handler="name => updateName({id: areaId, name})"
        />
        <div style="height: 12px"></div>

        <InputModifyField
          text="流程区域名"
          :data="area.text"
          :handler="text => updateText({id: areaId, text})"
        />
        <div style="height: 12px"></div>

        <InputModifyField
          width="320px"
          text="备注"
          :data="area.comment"
          :handler="comment => updateComment({id: areaId, comment})"
        />
        <div style="height: 12px"></div>

        <ColumnsField
          :columns="columns"
          :data="area.column_ids"
          :handler="columns => updateColumns({id: areaId, columns})"
        />
      </section>

      <div class="modal-card-foot">
        <a
          class="button is-danger"
          @click="$router.push({
            name: 'area delete',
            params: { areaId }
          })">删除区域
        </a>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import ColumnsField from './columns'
import InputModifyField from '@/components/common/input-modify-field'

export default {
  name: 'AreaManage',

  components: {
    ColumnsField,
    InputModifyField
  },

  props: {
    areaId: [String, Number]
  },

  computed: mapState({
    area (state) {
      return state.areas.data[this.areaId]
    },

    columns: state => state.columns.columns
  }),

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
