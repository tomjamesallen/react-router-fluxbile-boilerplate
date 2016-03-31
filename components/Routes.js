import React from 'react'
import { IndexRoute, Route } from 'react-router'
import Application from './Application'
import Home from './Home'
import About from './About'
import clone from 'clone'
import addPropsRecursively from '../utils/addPropsRecursively'

function onEnter(next) {
  console.log('on enter', next)
}

function onLeave(next) {
  console.log('on leave', next)
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

// console.log(routes)

export default routes;


