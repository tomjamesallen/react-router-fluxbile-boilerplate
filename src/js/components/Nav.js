/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import {Link} from 'react-router';

class Nav extends React.Component {
    static contextTypes = {
        history: React.PropTypes.object.isRequired,
        location: React.PropTypes.object.isRequired
    };
    render() {
        return (
            <ul className="pure-menu pure-menu-open pure-menu-horizontal">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about?test=something'>About</Link></li>
                <li><Link to='/round/1'>Round 1</Link></li>
                <li><Link to='/round/1/index'>Round index</Link></li>
            </ul>
        );
    }
}

export default Nav;
