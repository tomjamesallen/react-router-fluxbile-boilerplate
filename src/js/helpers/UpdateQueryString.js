import assign from 'object-assign'

export default function(history) {
  history.updateQuery = function(newQuery, location, userOptions = {}) {
    const options = assign({
      replace: true
    }, userOptions)

    const currentQuery = location.query

    let query
    if (options.replace) {
      query = newQuery
    }
    else {
      query = assign(currentQuery, newQuery)
    }

    this.push({
      pathname: location.pathname,
      query
    })
  }
}
