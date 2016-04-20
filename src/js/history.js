import { browserHistory } from 'react-router'

// Create appropriate history.
const history = browserHistory

// Import transitionManager.
import transitionManager from './transitionManager'

// Call transitionManager before transitioning to allow for hooks to delay
// transition.
history.listenBefore(function(transition, callback) {
  transitionManager.makeCall(callback, {
    payload: {
      transition: transition
    }
  })
})

// Add method to update just the query string.
require('./helpers/UpdateQueryString')(history)

export default history
