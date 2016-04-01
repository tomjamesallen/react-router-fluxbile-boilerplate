import React from 'react';
import RouteStore from '../stores/RouteStore'
import {connectToStores, provideContext} from 'fluxible-addons-react';

class TestComponent extends React.Component {
  static contextTypes = {
    // getStore: React.PropTypes.func,
    // executeAction: React.PropTypes.func,
    // history: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  }

  // static childContextTypes: {
  //   location: React.PropTypes.object
  // }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let context = this.context
    // console.log('TestComponent', this)
    console.log(this.context.location.pathname)
    return <p>Test component</p>;
  }
}

// TestComponent = provideContext(TestComponent)

// TestComponent = connectToStores(TestComponent, [RouteStore], (context) => context.getStore(RouteStore).getState());


export default TestComponent;
