import React from 'react'
import { IndexRoute, Route } from 'react-router'
import Application from './Application'
import Home from './Home'
import About from './About'
import clone from 'clone'
import addPropsRecursively from '../utils/addPropsRecursively'
import { get as getClientContext } from '../clientContextCache'
import routeActions from '../actions/routeActions'
import RouteStore from '../stores/RouteStore'

// function onEnter(next) {
//   console.log('on enter')
//   const context = getClientContext()
//   // console.log('has context', context)
//   if (!context) return
//   context.getStore(RouteStore)._setRoute(next)
//   // context.executeAction(routeActions.UPDATE_ROUTE, next)
// }

// function onLeave(next) {
//   // console.log('on leave')
//   const context = getClientContext()
//   if (!context) return
//   context.getStore(RouteStore)._setRoute()
// }

let routes = (
  <Route name="app" path="/" component={Application}>
    <Route name="about" path="about" component={About}/>
    <IndexRoute name="home" component={Home}/>
    <Route name="round" path='round/:roundId'>
      <Route name="round index" path='index'/>
    </Route>
  </Route>
);

// routes = addPropsRecursively(routes, {onEnter, onLeave})

export default routes;
