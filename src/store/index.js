import root from './root'
import areas from './areas'
import plants from './plants'
import columns from './columns'

export default Object.assign(root, {
  modules: {
    areas,
    plants,
    columns
  }
})
