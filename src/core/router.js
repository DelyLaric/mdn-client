import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/app/routes'

Vue.use(Router)

Router.prototype.hasMatched = function ({name, params}) {
  const route = this.app.$route
  const hasMatched = route.matched.findIndex(
    route => route.name === name
  ) !== -1

  if (!hasMatched || !params) return hasMatched

  for (let key in params) {
    if (route.params[key] !== params[key]) {
      return false
    }
  }

  return true
}

export default new Router({
  routes
})
