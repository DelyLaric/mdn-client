import Axios from 'axios'

const dev = false
const LOCAL_URL = 'http://mdn.api'
const SERVER_URL = 'http://115.159.51.252:8001'

if (dev) {
  Axios.defaults.baseURL = LOCAL_URL
} else {
  Axios.defaults.baseURL = SERVER_URL
}

const Http = Axios.create()

// custome axios
export default Axios

// primary axios
export const http = Http
