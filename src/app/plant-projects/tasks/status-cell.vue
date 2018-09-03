<template>
  <td class="is-centered">
    <span :class="['tag', trans.class]">
      {{trans.text}}
    </span>
  </td>
</template>

<script>
export default {
  props: {
    value: Number
  },

  computed: {
    trans () {
      const res = {}
      switch (this.value) {
        case 0:
          res.text = '待规划'
          res.class = 'is-warning'
          return res
        case 1:
          res.text = '规划中'
          res.class = 'is-success'
          return res
        case 2:
          res.text = '已完成'
          res.class = 'is-info'
          return res
      }
    }
  }
}
</script>
