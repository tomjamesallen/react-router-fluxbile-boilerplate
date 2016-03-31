import React from 'react'
import { IndexRoute, Route } from 'react-router'
import Application from './Application'
import Home from './Home'
import About from './About'
import clone from 'clone'
import addPropsRecursively from '../utils/addPropsRecursively'
import { get as getClientContextCache } from '../clientContextCache'
import routeActions from '../actions/routeActions'

function onEnter(next) {
  const context = getClientContextCache()
  if (!context) return
  context.getActionContext().executeAction(routeActions.UPDATE_ROUTE, next)
}

function onLeave(next) {
  const context = getClientContextCache()
  if (!context) return
  context.getActionContext().executeAction(routeActions.UPDATE_ROUTE)
}

let routes = (
  <Route name="app" path="/" component={Application}>
    <Route name="about" path="about" component={About}/>
    <IndexRoute name="home" component={Home}/>
    <Route name="round" path='round/:roundId'>
      <Route name="round index" path='index'/>
    </Route>
  </Route>
);

routes = addPropsRecursively(routes, {onEnter, onLeave})

export default routes;


