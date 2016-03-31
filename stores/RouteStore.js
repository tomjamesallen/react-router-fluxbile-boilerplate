import BaseStore from 'fluxible/addons/BaseStore';

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
  prevRouteState = clone(next)
  return true
}

function getInitialState() {
  return {
    location: {},
    params: {}
  }
}

let state = {}
let cachedRouteState = {}

class RouteStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    state = getInitialState()
  }
  updateRoute(payload) {
    let location, params
    
    if (payload.location && payload.params) {
      location = payload.location
      params = payload.params
    }
    else if (cachedRouteState.location && cachedRouteState.params) {
      location = cachedRouteState.location
      params = cachedRouteState.params
    }
    else return
    
    if (onRouteEvent({
      location, params
    })) {
      state.location = location
      state.params = params
      console.log('emit change', state)
      this.emitChange()
    }   
  }
  cacheRouteState(payload) {
    cachedRouteState = payload
  }
  getState() {
    return state;
  }
  dehydrate() {
    return this.getState()
  }
  rehydrate(importState) {
    state = importState
  }
}

RouteStore.storeName = 'RouteStore';
RouteStore.handlers = {
  CHANGE_ROUTE: 'updateRoute',
  CACHE_ROUTE_STATE: 'cacheRouteState'
};

export default RouteStore;
