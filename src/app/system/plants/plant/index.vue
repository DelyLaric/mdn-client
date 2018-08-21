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
        <NameField />
        <div style="height: 12px"></div>
        <CommentField />
      </section>

      <div class="modal-card-foot">
        <a
          class="button is-danger"
          @click="$router.push({
            name: 'plant delete',
            params: { plant: plant.name }
          })">删除工厂
        </a>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NameField from './name'
import CommentField from './comment'

export default {
  name: 'PlantManage',

  components: {
    NameField,
    CommentField
  },

  computed: mapGetters({
    plant: 'plants/plant'
  }),

  methods: {
    handleClose () {
      this.$router.push({
        name: 'plants'
      })
    }
  }
}
</script>
