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
import { updateComment } from '@/api/plants'
import { storeMixin } from '../_runtime'

export default {
  mixins: [storeMixin],

  data () {
    return {
      inputValue: ''
    }
  },

  computed: {
    plant () {
      return this.store.getters.selectedPlant
    },

    isModified () {
      return this.inputValue !== this.plant.comment
    }
  },

  watch: {
    plant: {
      immediate: true,

      handler (plant) {
        this.inputValue = plant.comment
      }
    }
  },

  methods: {
    async handleSave () {
      // 处理 disabled 元素依然出发 click 事件的 bug
      if (!this.isModified) return
      await updateComment(this.plant.name, this.inputValue)

      this.plant.comment = this.inputValue
    }
  }
}
</script>
