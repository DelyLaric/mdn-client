import Vue from 'vue'
import router from './router'
import store from './vuex'
import bulmaComponents from '@/packages/bulma/components'
import '@/assets/sass/index.sass'
import App from '@/app'
import http from './axios'

Vue.use(bulmaComponents)

Vue.config.productionTip = false

Vue.prototype.$http = http

const app = new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

store.state.app = app
