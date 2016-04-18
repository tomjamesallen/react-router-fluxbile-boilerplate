/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global document, window */
'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import debug from 'debug'
import app from './app'
const dehydratedState = window.App // Sent from the server
import ReactRouter from 'react-router'
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent'

var bootstrapDebug = debug('Example')

bootstrapDebug('rehydrating app')

function RenderApp(context) {
  bootstrapDebug('React Rendering')

  const Router = React.createElement(ReactRouter.Router, {
    routes: context.getComponent(),
    history: require('./history')
  })

  var mountNode = document.getElementById('app')
  ReactDOM.render(
    React.createElement(
      FluxibleComponent,
      { context: context.getComponentContext() },
      Router
    ),
    mountNode,
    function() {
      bootstrapDebug('React Rendered')
    }
  )
}

app.rehydrate(dehydratedState, function(err, context) {
  if (err) throw err
  window.debug = debug
  window.context = context

  RenderApp(context)
})
