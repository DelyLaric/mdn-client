import Vue from 'vue'
import router from './router'
import store from './vuex'
import bulmaComponents from '@/packages/bulma/components'
import '@/assets/sass/index.sass'
import App from '@/app'

Vue.use(bulmaComponents)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
