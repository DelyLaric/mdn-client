module.exports = function (source, map) {
  this.callback(
    null,
    `export default function (Component) {
      Component.options.__code__ = ${
        JSON.stringify(source)
      }.trim()
    }`,
    map
  )
}