import Vue from 'vue'
import router from './router'
import store from './vuex'
import bulma from '@/packages/bulma'

Vue.use(bulma)
Vue.config.productionTip = false

new Vue({
  render: h => h('router-view'),
  router,
  store
}).$mount('#app')
