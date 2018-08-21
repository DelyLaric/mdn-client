import { getNamespacedStore } from '@/core/vuex'

export function getLocalStore () {
  return getNamespacedStore('plants')
}

export const storeMixin = {
  data () {
    return {
      store: getLocalStore()
    }
  }
}
