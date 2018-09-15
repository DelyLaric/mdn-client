<template>
  <div style="width: 1000px; height: 2000px">
    <pre v-highlightjs="MyCode.__code__"><code class="javascript"></code></pre>
  </div>
</template>

<script>
import MyCode from './code'
console.log(MyCode)

export default {
  data () {
    return {
      test: '1234123123',
      MyCode
    }
  },

  created () {

  }
}
</script>
