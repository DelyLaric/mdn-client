<template>
  <div>
    测试页面
    {{user}}
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
      user: {
        name: 'laric',
        id: 1
      }
    }
  },

  methods: {
    handleClick () {
      Object.defineProperty(this.user, 'email', { value: 'delylaric' })
      console.log(this.user)
    }
  }
}
</script>
