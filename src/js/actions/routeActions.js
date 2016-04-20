export default {
  CACHE_ROUTE_STATE(actionContext, routeState, done) {
    actionContext.dispatch('CACHE_ROUTE_STATE', routeState)
    done()
  }
}
