// Import dependencies:
import React from "react";
import { NavLink as Link } from "react-router-dom";
import NAV_LINKS from "ui/common/web-links.json";

// Import style:
import "ui/screens/user/style";


// Use this component inside the
// "logged-out user" interceptor component.
export default class UserInfo extends React.Component {
    _formatDate( _long ) {
        const _dt = new Date( _long );
        return `${ _dt.getFullYear() }.${ _dt.getMonth() + 1 }.${ _dt.getDate() } ${ _dt.toTimeString().substr( 0, 8 ) }`;
    }

    render() {
        const _active = { borderBottom: "1px solid" };

        return (
            <div>
                <p className="text--small">
                    <span dangerouslySetInnerHTML={{ __html: ( this.props.name ? this.props.name + " &bull; " : "" ) + "<strong>@" + this.props.username + "</strong> &bull; " }} />
                    <span className="text--disabled">Member since { this._formatDate( this.props.createdOn ) }</span>
                </p>
                <p className="user__nav text--small">
                    <Link to={ NAV_LINKS.MANAGE_TRANSACTIONS } activeStyle={ _active }>Manage transactions</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={ NAV_LINKS.TRANSACTIONS } activeStyle={ _active }>View transactions</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={ NAV_LINKS.SETTINGS } activeStyle={ _active }>Account settings</Link>
                </p>
            </div>
        );
    }
}
