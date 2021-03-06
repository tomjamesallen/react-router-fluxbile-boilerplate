/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React, { PropTypes } from 'react'
import Nav from './Nav'
// import TestComponent from './TestComponent'
// import ApplicationStore from '../stores/ApplicationStore'
// import { connectToStores, provideContext } from 'fluxible-addons-react'

var Application = React.createClass({
  contextTypes: {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
  },

  childContextTypes: {
    location: PropTypes.object,
    params: PropTypes.object
  },

  propTypes: {
    location: PropTypes.object,
    params: PropTypes.object,
    children: PropTypes.element
  },

  getChildContext() {
    return {
      location: this.props.location,
      params: this.props.params
    }
  },
  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    )
  }
})

export default Application
