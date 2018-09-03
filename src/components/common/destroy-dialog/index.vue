<template>
  <Modal
    @close="$emit('close')"
    z-index="99999"
    width="400px"
    has-close-icon>
    <p slot="title">{{title}}</p>

    <slot v-if="$slots.default"/>
    <div v-else>
      该操作将不可恢复
    </div>

    <button
      slot="foot"
      @click="$wait(handler)"
      class="button is-primary"
      v-text="confirmButtonText"
    />
    <button
      slot="foot"
      class="button"
      @click="handleClose"
      v-text="cancelButtonText"
    />
  </Modal>
</template>

<script>
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
