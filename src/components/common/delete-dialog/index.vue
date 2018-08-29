<template>
  <div class="modal is-active" style="z-index: 99999">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card" style="width: 400px">
      <header class="modal-card-head">
        <p class="modal-card-title">{{title}}</p>
        <button
          class="delete"
          @click="handleClose">
        </button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-primary"
          @click="$store.dispatch('wait', handler)">
          {{confirmButtonText}}
        </button>
        <button
          class="button"
          @click="handleClose">
          {{cancelButtonText}}
        </button>
      </footer>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: '删除确认'
    },

    width: {
      type: String,
      default: '400px'
    },

    handler: {
      type: Function,
      required: true
    },

    confirmButtonText: {
      type: String,
      default: '确认'
    },

    cancelButtonText: {
      type: String,
      default: '取消'
    }
  },

  methods: {
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>
