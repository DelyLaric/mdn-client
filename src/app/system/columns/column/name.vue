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
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      inputValue: ''
    }
  },

  computed: {
    ...mapGetters({
      column: 'columns/column'
    }),

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
    ...mapActions({
      update: 'columns/updateName'
    }),

    async handleSave () {
      if (this.isModified) {
        await this.update(this.inputValue)
      }
    }
  }
}
</script>
