import { getNamespacedStore } from '@/core/vuex'

export function getLocalStore () {
  return getNamespacedStore('areas/columns')
}

export const storeMixin = {
  data () {
    return {
      store: getLocalStore()
    }
  }
}
