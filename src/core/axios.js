import Vue from 'vue'
import Axios from 'axios'

const dev = true
const LOCAL_URL = 'http://mdn.api'
const SERVER_URL = 'http://115.159.51.252:8000'

if (!Vue.config.productionTip && dev) {
  Axios.defaults.baseURL = LOCAL_URL
} else {
  Axios.defaults.baseURL = SERVER_URL
}

const Http = Axios.create()
// custome axios
export default Axios

// primary axios
export const http = Http
