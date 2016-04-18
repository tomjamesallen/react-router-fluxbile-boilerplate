/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React, { PropTypes } from 'react'
// import ApplicationStore from '../stores/ApplicationStore'

class HtmlComponent extends React.Component {

  static propTypes = {
    markup: PropTypes.string,
    state: PropTypes.string,
    clientFile: PropTypes.string
  }

  render() {
    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <title>React Router Example</title>
          <meta name='viewport' content='width=device-width, user-scalable=no' />
          <link rel='stylesheet' href='http://yui.yahooapis.com/pure/0.5.0/pure-min.css' />
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
          <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
          <script src={'/public/js/' + this.props.clientFile}></script>
        </body>
      </html>
    )
  }
}

export default HtmlComponent
