/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import Nav from './Nav';
import TestComponent from './TestComponent'
import ApplicationStore from '../stores/ApplicationStore';
import {connectToStores, provideContext} from 'fluxible-addons-react';
import {RouteHandler, Router} from 'react-router';
import routes from './Routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';

var Application = React.createClass({
  contextTypes: {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func,
  },

  childContextTypes: {
    location: React.PropTypes.object
  },

  getChildContext() {
    return { location: this.props.location }
  },
  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
        <TestComponent />
      </div>
    )
  }
})

export default Application;
