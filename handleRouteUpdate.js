import shallowequal from 'shallowequal'
import clone from 'clone'

let prevRouteState

function routeChanged(prev, next) {
  if (!prev) return true
  if (prev.location.pathname !== next.location.pathname) return true
  if (!shallowequal(prev.location.query, next.location.query)) return true
  return
}

function onRouteEvent(next) {
  if (!routeChanged(prevRouteState, next)) return

  // if (routeValidator.validator(next)) {
    emitRouteAction(next)
    prevRouteState = clone(next)
  // }
}

function emitRouteAction(next) {
  const { location, params } = next
  // RouteActions.onRouteUpdated(location, params)
  console.log('emitRouteAction', next)
}


module.exports = function(location, params) {
  onRouteEvent({
    location, params
  })
}