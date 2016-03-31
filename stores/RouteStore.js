/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/addons').createStore;

function getInitialState() {
    return {
        location: {},
        params: {}
    }
}

var routeState = {}

var RouteStore = createStore({
    storeName: 'PageStore',
    initialize: function () {
        routeState = getInitialState()
    },
    handleRouteChange: function (location, params) {
        routeState.route = {
            location,
            params
        }
        this.emitChange();
    },
    handlers: {
        'UPDATE_ROUTE': 'handleRouteChange'
    },
    getState: function () {
        return routeState
    },
    dehydrate: function () {
        console.log('dehydrate', this.getState())
        return this.getState();
    },
    rehydrate: function (state) {
        console.log('rehydrate', state)
        routeState = state;
    }
});

module.exports = RouteStore;
