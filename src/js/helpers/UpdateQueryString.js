import assign from 'object-assign'

export default function(history) {
  history.updateQuery = function(newQuery, location, userOptions = {}) {
    const options = assign({
      mode: 'replace' // replace / merge
    }, userOptions)

    const currentQuery = location.query

    let query
    if (options.mode === 'replace') {
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
