import Vue from 'vue'
import WaitingComponent from './component'
import { sleep } from '@/utils/async'

const instance = new Vue({
  render: h => h(WaitingComponent)
}).$mount().$children[0]

document.body.appendChild(instance.$el)

export default async function (callback) {
  instance.show = true
  try {
    await sleep(333)
    await callback()
  } finally {
    instance.show = false
  }
}
