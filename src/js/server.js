/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import HtmlComponent from './components/Html'

import express from 'express'
import serialize from 'serialize-javascript'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'

import React from 'react'
import app from './app'
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent'
import { match } from 'react-router'
import { RouterContext } from 'react-router'
import appActions from './actions/appActions'

import Debug from 'debug'
let debug = Debug('Example')

const env = process.env.NODE_ENV

var server = express()
server.use('/public', express['static'](__dirname + '/build'))

server.use(function(req, res, next) {
  debug('Executing navigate action')
  match({
    routes: app.getComponent(),
    location: req.url
  }, function(error, redirectLocation, renderProps) {
    if (error) {
      res.status(500).send(error.message)
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }
    else if (renderProps) {
      const { location, params } = renderProps
      var context = app.createContext()
      context.executeAction(appActions.SET_INTIAL_ROUTE_PROPS, { location, params }, function() {
        debug('Exposing context state')
        var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';'
        var markupElement = React.createElement(
            FluxibleComponent,
            { context: context.getComponentContext() },
            React.createElement(RouterContext, renderProps)
          )
        var html = renderToStaticMarkup(
          <HtmlComponent
            context={context.getComponentContext()}
            state={exposed}
            markup={renderToString(markupElement)}
            clientFile={env === 'production' ? 'main.min.js' : 'main.js'}
          />
        )

        debug('Sending markup')
        res.status(200).send(html)
      })
    }
    else {
      next()
    }
  })
})

var port = process.env.PORT || 3000
server.listen(port)
console.log('Listening on port ' + port)
