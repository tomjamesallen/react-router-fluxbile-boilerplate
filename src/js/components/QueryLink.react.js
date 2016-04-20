import React, { PropTypes } from 'react'
import assign from 'object-assign'
import { Link } from 'react-router'

var QueryLink = React.createClass({

  propTypes: {
    // Optional `to` prop. If left blank this will default to the current path.
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

    // Object with query props.
    query: PropTypes.object,

    // Either `true`, or an array of keys to reset.
    resetQuery: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.array
    ])

    // This component will also accept any other props that react router's
    // `Link` accepts, these will not be modified.
  },

  contextTypes: {
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  },

  render() {
    let { ...props } = { ...this.props }
    const { context } = this

    if (!props.to) {
      if (context.location) {
        props.to = context.location.pathname
      }
      else {
        props.to = '/'
      }
    }

    if (context.location && context.location.query) {
      const inputQuery = props.query
      props.query = {}
      if (props.resetQuery !== true) {
        props.query = assign(props.query, context.location.query)
      }

      if (typeof props.resetQuery === 'object') {
        props.resetQuery.forEach(function(key) {
          delete props.query[key]
        })
      }

      props.query = assign(props.query, inputQuery)
    }

    if (typeof props.to === 'string') {
      props.to = {
        pathname: props.to
      }
    }

    props.to.query = props.query
    delete props.query

    return (
      <Link {...props}/>
    )
  }
})

export default QueryLink
