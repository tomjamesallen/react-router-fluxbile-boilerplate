export default {
  SET_TITLE(actionContext, payload) {
    actionContext.dispatch('SET_TITLE', payload.title)
  }
}
