<template>
  <div class="field">
    <div class="label">{{text}}</div>
    <div class="contron">
      <input
        class="input"
        v-model="value"
        :readonly="disabled"
        :style="{ width, 'margin-right': '6px' }"
      />
      <a
        v-if="!disabled"
        @click="isModified && $wait(() => handler(value))"
        class="button is-outlined"
        :disabled="!isModified">
        修改
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    handler: Function,
    disabled: Boolean,
    width: {
      type: String,
      default: '160px'
    },
    data: {}
  },

  data () {
    return {
      value: ''
    }
  },

  computed: {
    isModified () {
      return this.value !== this.data
    }
  },

  watch: {
    data: {
      immediate: true,

      handler (val) {
        this.value = val
      }
    }
  }
}
</script>
