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
    ...mapActions({
      update: 'columns/updateComment'
    }),

    async handleSave () {
      if (this.isModified) {
        await this.update(this.inputValue)
      }
    }
  }
}
</script>
