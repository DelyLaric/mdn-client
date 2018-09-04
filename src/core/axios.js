import Axios from 'axios'
import Vue from 'vue'

const local = true
const LOCAL_URL = 'http://mdn.api'
const SERVER_URL = 'http://115.159.51.252:8001'

if (Vue.config.productionTip === false || local === false) {
  Axios.defaults.baseURL = SERVER_URL
} else {
  Axios.defaults.baseURL = LOCAL_URL
}

const Http = Axios.create()

// custome axios
export default Axios

// primary axios
export const http = Http
