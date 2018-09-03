import Vue from 'vue'
import router from './router'
import store from './vuex'
import bulmaComponents from '@/packages/bulma/components'
import AppComponent from '@/app'
import http from './axios'
import 'element-ui/lib/theme-chalk/index.css'
import { Scrollbar } from 'element-ui'
import '@/assets/sass/index.sass'

Vue.use(bulmaComponents)
Vue.component(Scrollbar.name, Scrollbar)

Vue.prototype.$http = http

const app = new Vue({
  render: h => h(AppComponent),
  router,
  store
}).$mount('#app')

export const App = app
