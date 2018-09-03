import Vue from 'vue'
import WaitingComponent from './component'

const instance = new Vue({
  render: h => h(WaitingComponent)
}).$mount().$children[0]

document.body.appendChild(instance.$el)

export default async function (callback) {
  instance.show = true
  try {
    await callback()
  } finally {
    instance.show = false
  }
}
