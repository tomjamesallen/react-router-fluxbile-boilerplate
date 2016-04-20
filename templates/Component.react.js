import React from 'react'
// import React, { PropTypes } from 'react'
// import { connectToStores, provideContext } from 'fluxible-addons-react'

var {{COMPONENT}} = React.createClass({
  contextTypes: {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
  },

  render() {
    return (
      <div className='{{COMPONENT_DASHED}}'>
        <h2>{{COMPONENT}}</h2>
      </div>
    )
  }
})

{{CSS_FILE_COMMENT}}

export default {{COMPONENT}}
