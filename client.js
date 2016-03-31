/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global App, document, window */
'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var createBrowserHistory = require('history/lib/createBrowserHistory');
var debug = require('debug');
var bootstrapDebug = debug('Example');
var app = require('./app');
var dehydratedState = window.App; // Sent from the server
var ReactRouter = require('react-router');
var FluxibleComponent = require('fluxible-addons-react/FluxibleComponent');
var createElement = require('fluxible-addons-react/createElementWithContext');

import { set as setClientContextCache } from './clientContextCache'

import routeActions from './actions/routeActions'

bootstrapDebug('rehydrating app');

function RenderApp(context){
    bootstrapDebug('React Rendering');

    const Router = React.createElement(ReactRouter.Router, {
        routes: context.getComponent(),
        history: require('./history'),
        onUpdate: function() {
            const { location, params } = this.state
            context.executeAction(routeActions.CACHE_ROUTE_STATE, this.state)
            context.executeAction(routeActions.UPDATE_ROUTE, {location, params})
        }
    })
    
    var mountNode = document.getElementById('app');
    ReactDOM.render(
        React.createElement(
            FluxibleComponent,
            { context: context.getComponentContext() },
            Router
        ),
        mountNode,
        function () {
            bootstrapDebug('React Rendered');
        }
    );
}

app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.debug = debug;
    window.context = context;

    setClientContextCache(context)

    RenderApp(context);
});
