<template>
  <div v-if="plant" class="modal is-active">
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
          text="工厂名"
          :data="plant.name"
          :handler="name => updateName({
            name,
            id: plant.id,
          })"
        />
        <div style="height: 12px"></div>
        <InputModifyField
          text="备注"
          width="320px"
          :data="plant.comment"
          :handler="comment => updateComment({
            comment,
            id: plant.id,
          })"
        />
      </section>

      <div class="modal-card-foot">
        <a
          class="button is-danger"
          @click="$router.push({
            name: 'plant destroy',
            params: { plant: plant.name }
          })">删除工厂
        </a>
      </div>
    </div>
    <router-view :plant="plant"/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import InputModifyField from '@/components/common/input-modify-field'

export default {
  name: 'PlantManage',

  components: {
    InputModifyField
  },

  props: {
    plant: Object
  },

  methods: {
    ...mapActions('plants', [
      'updateName',
      'updateComment'       
    ]),

    handleClose () {
      this.$router.push({name: 'plants'})
    }
  }
}
</script>
