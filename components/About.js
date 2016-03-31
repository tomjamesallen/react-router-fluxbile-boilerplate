/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import transitionManager from '../transitionManager'

var _transitionHookId = null

function transitionHook(call) {
  setTimeout(call.resolve, 0)
}

class About extends React.Component {
    render() {
        return <p>This is a description of the site.</p>;
    }

    componentDidMount() {
      _transitionHookId = transitionManager.registerHook(transitionHook)
    }

    componentWillUnmount() {
      transitionManager.unregisterHook(_transitionHookId)
    }
}

export default About;
