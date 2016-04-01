import BaseStore from 'fluxible/addons/BaseStore';

import shallowequal from 'shallowequal'
import clone from 'clone'

function routeChanged(prev, next) {
  if (!prev) return true
  if (prev.location.pathname !== next.location.pathname) return true
  if (!shallowequal(prev.location.query, next.location.query)) return true
  return
}

function getInitialState() {
  return {
    location: {},
    params: {}
  }
}

let cachedRouteState = {}

class RouteStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.state = getInitialState()
    this.dispatcher = dispatcher
    
    if (this.initialize) {
      this.initialize()
    }
  }
  state = {}
  prevRouteState = false
  updateRoute(payload) {
    let location, params
    
    if (payload) {
      location = payload.location
      params = payload.params
    }
    else if (cachedRouteState.location) {
      location = cachedRouteState.location
      params = cachedRouteState.params
    }
    else return

    let shouldUpdate = routeChanged(this.prevRouteState, {
      location, params
    })
    
    if (shouldUpdate) {
      this.state.location = location
      this.state.params = params
      // console.log('emit change', this.state.location)
      // this.emitChange()

      // console.log('this.context', this.dispatcher.getContext())

      

      // if (this.context) {
      //   console.log('shouldUpdate', this.context)
      //   this.context.executeAction(routeActions.UPDATE_ROUTE, next)
      // }

      

      this.prevRouteState = clone({
        location, params
      })
    }   
  }
  cacheRouteState(payload) {
    cachedRouteState = payload
  }
  _setRoute(payload, callback = function() {}) {
    this.updateRoute(payload)
    callback()
  }
  getState() {
    return null
    return this.state;
  }
  dehydrate() {
    console.log('dehydrate routestore', this.getState())
    return this.getState()
  }
  rehydrate(importState) {
    this.state = importState
    this.prevRouteState = importState
    console.log('rehydrate', importState)
  }
  updateRouteAction() {
    // this.emitChange()
  }
}

RouteStore.storeName = 'RouteStore';
RouteStore.handlers = {
  UPDATE_ROUTE: 'updateRouteAction',
  // CACHE_ROUTE_STATE: 'cacheRouteState'
};

export default RouteStore;
