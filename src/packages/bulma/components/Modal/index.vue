<template>
  <div :class="{'modal': true, 'is-active': show}">
    <div
      class="modal-background"
      @click="close">
    </div>
    <div
      class="modal-card animated"
      :style="{ 'width': width, 'height': height }">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <slot name="title"></slot>
        </p>
        <a
          @click="close"
          class="delete"
          v-if="hasCloseIcon"
        />
      </header>
      <section
        :class="{
          'modal-card-body': true,
          'has-no-footer': !$slots.foot
        }">
        <slot></slot>
        <slot name="content"></slot>
      </section>
      <footer v-if="$slots.foot" class="modal-card-foot">
        <slot name="foot" />
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'show',
    event: 'close'
  },

  props: {
    show: {
      type: Boolean,
      default: true
    },

    zIndex: {
      type: String
    },

    width: String,

    height: String,

    hasCloseIcon: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    close () {
      this.$emit('close', false)
    }
  }
}
</script>
