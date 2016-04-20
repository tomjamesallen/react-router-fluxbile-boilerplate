import React, { PropTypes } from 'react'
import { connectToStores } from 'fluxible-addons-react'
import ApplicationStore from '../stores/ApplicationStore'
import appActions from '../actions/appActions'

var TestComponent = React.createClass({
  contextTypes: {
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    executeAction: PropTypes.func.isRequired
  },

  propTypes: {
    title: PropTypes.string
  },

  getInitialState() {
    return {
      AsyncDemoComponent: null
    }
  },

  _onClick() {
    const title = 'A new title'
    this.context.executeAction(appActions.SET_TITLE, { title })
  },

  componentDidMount() {
    require(['./AsyncDemoComponent.react'], (AsyncDemoComponent) => {
      this.setState({
        AsyncDemoComponent
      })
    })
  },

  render() {
    let context = this.context
    let asyncDemoComponent

    if (this.state.AsyncDemoComponent) {
      let AsyncDemoComponent = this.state.AsyncDemoComponent
      asyncDemoComponent = <AsyncDemoComponent />
    }

    return (
      <div>
        <h1>Route aware component.</h1>
        <p>Route: {context.location.pathname}</p>
        <button onClick={this._onClick}>Update title</button>: {this.props.title}
        {asyncDemoComponent}
      </div>
    )
  }
})

TestComponent = connectToStores(TestComponent, [ApplicationStore], (context) => {
  const title = context.getStore(ApplicationStore).getPageTitle()
  return { title }
})

export default TestComponent
