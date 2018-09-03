<template>
  <DatePicker
    :is-active="newValue !== value"
    @change="handleChange(id, $event)"
    wrapper="td" :value="value"
  />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    value: {},
    id: Number
  },

  data () {
    return {
      newValue: ''
    }
  },

  methods: {
    ...mapActions({
      updateDuetime: 'tasks/updateDuetime'
    }),

    async handleChange (id, duetime) {
      this.newValue = duetime
      this.$waiting.start()
      try {
        await this.updateDuetime({id, duetime})
      } catch (e) {
        // 处理服务端异常导致的页面不同步
      }
      this.$waiting.finish()
    }
  }
}
</script>
