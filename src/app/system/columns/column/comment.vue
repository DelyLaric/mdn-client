<template>
  <div class="field">
    <div class="label">备注</div>
    <div class="contron">
      <input
        class="input"
        v-model="inputValue"
        style="display: inline; min-width: 300px; max-width: 300px; margin-right: 6px"
      />

      <a
        @click="$store.dispatch('wait', handleSave)"
        class="button is-outlined"
        :disabled="!isModified">
        修改
      </a>
    </div>
  </div>
</template>

<script>
import { updateComment } from '@/api/area-columns'
import { storeMixin } from '../_runtime'

export default {
  mixins: [storeMixin],

  data () {
    return {
      inputValue: ''
    }
  },

  computed: {
    column () {
      return this.store.getters.selectedColumn
    },

    isModified () {
      return this.inputValue !== this.column.comment
    }
  },

  watch: {
    column: {
      immediate: true,

      handler (column) {
        this.inputValue = column.comment
      }
    }
  },

  methods: {
    async handleSave () {
      // 处理 disabled 元素依然出发 click 事件的 bug
      if (!this.isModified) return
      await updateComment(this.column.name, this.inputValue)

      this.column.comment = this.inputValue
    }
  }
}
</script>
