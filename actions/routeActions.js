export default {
  UPDATE_ROUTE(actionContext, payload, done) {
    const { location, params } = payload
    actionContext.dispatch('UPDATE_ROUTE', {location, params})
    done()
  },
  CACHE_ROUTE_STATE(actionContext, routeState, done) {
    actionContext.dispatch('CACHE_ROUTE_STATE', routeState)
    done()
  }
}
