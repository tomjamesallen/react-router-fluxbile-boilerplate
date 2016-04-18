export default {
  SET_TITLE(actionContext, payload) {
    actionContext.dispatch('SET_TITLE', payload.title)
  },

  SET_INTIAL_ROUTE_PROPS(actionContext, payload) {
    actionContext.dispatch('SET_INTIAL_ROUTE_PROPS', payload)
  }
}
