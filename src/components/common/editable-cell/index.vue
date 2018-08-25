<template>
  <td
    class="is-editable"
    v-on="$listeners"
    @click="selectContent"
    :v-text="value"
    ref="el"
  ></td>
</template>

<script>
export default {
  props: {
    value: {}
  },

  data () {
    return {
      contentSelected: false
    }
  },

  computed: {
    dom () {
      return this.$refs.el
    }
  },

  methods: {
    selectContent (event) {
      console.log(event)
      // const range = document.createRange()
      // const selection = window.getSelection()
      // range.selectNodeContents(event.target)
      // selection.removeAllRanges()
      // selection.addRange(range)
    }
  }
}
</script>
