import React from 'react'
import { IndexRoute, Route } from 'react-router'
import Application from './Application'
import Home from './Home'
import About from './About'
import clone from 'clone'
import routeActions from '../actions/routeActions'

let routes = (
  <Route name="app" path="/" component={Application}>
    <Route name="about" path="about" component={About}/>
    <IndexRoute name="home" component={Home}/>
    <Route name="round" path='round/:roundId'>
      <Route name="round index" path='index'/>
    </Route>
  </Route>
);

export default routes;
