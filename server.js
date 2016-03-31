/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import HtmlComponent from './components/Html';

var express = require('express');
var serialize = require('serialize-javascript');
var navigateAction = require('./actions/navigate');
var routeActions = require('./actions/routeActions');
var renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;
var renderToString = require('react-dom/server').renderToString;
var debug = require('debug')('Example');
var React = require('react');
var app = require('./app');
var FluxibleComponent = require('fluxible-addons-react/FluxibleComponent');
var router = require('react-router');
var match = router.match;
import { RouterContext } from 'react-router'
const env = process.env.NODE_ENV;

var server = express();
server.use('/public', express['static'](__dirname + '/build'));

server.use(function (req, res, next) {
    debug('Executing navigate action');
    match({
        routes: app.getComponent(),
        location: req.url
    }, function (error, redirectLocation, renderProps) {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const { location, params } = renderProps


            var context = app.createContext();
            context.executeAction(routeActions.UPDATE_ROUTE, renderProps, function () {
                debug('Exposing context state');
                var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
                var markupElement = React.createElement(
                        FluxibleComponent,
                        { context: context.getComponentContext() },
                        React.createElement(RouterContext, renderProps)
                    );
                var html = renderToStaticMarkup(
                    <HtmlComponent
                        context={context.getComponentContext()}
                        state={exposed}
                        markup={renderToString(markupElement)}
                        clientFile={env === 'production' ? 'main.min.js' : 'main.js'}
                    />
                );

                debug('Sending markup');
                res.status(200).send(html);
            });
        } else {
            next();
        }
    })
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
