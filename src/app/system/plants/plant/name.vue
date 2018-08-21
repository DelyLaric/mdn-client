<template>
  <div class="field">
    <div class="label">工厂名</div>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      inputValue: ''
    }
  },

  computed: {
    ...mapGetters({
      plant: 'plants/plant'
    }),

    isModified () {
      return this.inputValue !== this.plant.name
    }
  },

  watch: {
    plant: {
      immediate: true,

      handler (plant) {
        this.inputValue = plant.name
      }
    }
  },

  methods: {
    ...mapActions({
      update: 'plants/updateName'
    }),

    async handleSave () {
      // 处理 disabled 元素依然出发 click 事件的 bug
      if (this.isModified) {
        await this.update(this.inputValue)
      }
    }
  }
}
</script>
