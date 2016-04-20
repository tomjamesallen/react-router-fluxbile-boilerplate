import React, { PropTypes } from 'react'
// import { connectToStores, provideContext } from 'fluxible-addons-react'

var AsyncDemoComponent = React.createClass({
  contextTypes: {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
  },

  render() {
    return (
      <div>
        <h2>AsyncDemoComponent</h2>
      </div>
    )
  }
})

// css: ./src/scss/_components.async-demo-component.scss

export default AsyncDemoComponent
