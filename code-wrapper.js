module.exports = function (source) {
  const resource = this.resource

  if (resource.indexOf('.code.vue') !== -1) {
    source += `<vue-auto-code>${source}</vue-auto-code>`
    console.log(source)
  }

  return source
}
