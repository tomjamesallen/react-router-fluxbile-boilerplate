/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import RouteStore from '../stores/RouteStore'
import { connectToStores } from 'fluxible-addons-react';

class TestComponent extends React.Component {
    render() {
      // console.log(this)
        return <p>Test component</p>;
    }
}

TestComponent = connectToStores(TestComponent, [RouteStore], (context) => context.getStore(RouteStore).getState());


export default TestComponent;
