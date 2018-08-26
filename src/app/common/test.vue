<template>
  <div>
    测试页面
    {{array}}
    <a class="button" @click="handleClick">
      test
    </a>
  </div>  
</template>

<script>
export default {
  name: 'Test',

  data () {
    return {
      array: [{a: 1}, {b: 2}]
    }
  },

  methods: {
    handleClick () {
      this.array[0].b = 100
      this.array.splice(0, 1, this.array[0])
    }
  }
}
</script>
