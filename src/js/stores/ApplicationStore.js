import BaseStore from 'fluxible/addons/BaseStore'

class ApplicationStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher)
    this.dispatcher = dispatcher
    this.pageTitle = 'Initial title'
  }
  setTitle(title) {
    this.pageTitle = title
    this.emitChange()
  }
  getPageTitle() {
    return this.pageTitle
  }
  cacheIntialRouteProps(payload) {
    this.initialRoutePropsCache = payload
    this.emitChange()
  }
  getInitialRouteProps() {
    return this.initialRoutePropsCache
  }

  dehydrate() {
    // console.log('dehydrate')
    return {
      pageTitle: this.pageTitle,
      initialRoutePropsCache: this.initialRoutePropsCache
    }
  }
  rehydrate(state) {
    this.pageTitle = state.pageTitle
    this.initialRoutePropsCache = state.initialRoutePropsCache
  }
}

ApplicationStore.storeName = 'ApplicationStore'
ApplicationStore.handlers = {
  'SET_TITLE': 'setTitle',
  'SET_INTIAL_ROUTE_PROPS': 'cacheIntialRouteProps'
}

export default ApplicationStore
