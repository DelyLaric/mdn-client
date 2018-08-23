<template>
  <div class="field">
    <div class="label" style="display: flex; align-items: center">
      流程区域属性
      <a
        class="button is-outlined"
        style="margin-left: 12px"
        @click="$store.dispatch('wait', () => handler(value))"
        :disabled="!isModified">
        修改
      </a>
    </div>
    <div class="control">
      <MultiSelect
        v-model="value"
        :options="columns.map(column => ({
          value: column.id,
          text: column.text
        }))"
      />
      <div style="height: 8px"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {},
    columns: Array,
    handler: Function
  },

  data () {
    return {
      value: []
    }
  },

  computed: {
    isModified () {
      if (this.value.length !== this.data.length) return true
      for (let i = 0, L = this.value.length; i < L; i++) {
        if (this.data.indexOf(this.value[i]) === -1) return true
      }

      return false
    }
  },

  watch: {
    data: {
      immediate: true,

      handler (val) {
        this.value = [...val]
      }
    }
  }
}
</script>
