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

  _onClick() {
    const title = 'A new title'
    this.context.executeAction(appActions.SET_TITLE, { title })
  },

  render() {
    let context = this.context
    // console.log(this.props)
    
    return (
      <div>
        <h1>Route aware component.</h1>
        <p>Route: {this.context.location.pathname}</p>
        <button onClick={this._onClick}>Update title</button>: {this.props.title}
      </div>
    )
  }
})

TestComponent = connectToStores(TestComponent, [ApplicationStore], (context) => {
  const title = context.getStore(ApplicationStore).getPageTitle()
  return { title }
})

export default TestComponent
