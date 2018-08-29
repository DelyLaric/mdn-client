import root from './root'
import areas from './areas'
import plants from './plants'
import columns from './columns'
import locations from './locations'
import projects from './projects'

export default {
  ...root,
  modules: {
    areas,
    plants,
    columns,
    locations,
    projects
  }
}
