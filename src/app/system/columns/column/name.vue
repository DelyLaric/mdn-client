<template>
  <div class="field">
    <div class="label">字段名</div>
    <div class="contron" style="display: table-row">
      <input
        class="input"
        v-model="inputValue"
        style="width: 160px; margin-right: 6px"
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
import { updateName } from '@/api/area-columns'
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
      return this.inputValue !== this.column.name
    }
  },

  watch: {
    column: {
      immediate: true,

      handler (column) {
        this.inputValue = column.name
      }
    }
  },

  methods: {
    async handleSave () {
      // 处理 disabled 元素依然出发 click 事件的 bug
      if (!this.isModified) return
      await updateName(this.column.name, this.inputValue)

      this.column.name = this.inputValue
    }
  }
}
</script>
