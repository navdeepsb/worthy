// Import dependencies:
import React from "react";
import { Link } from "react-router-dom";
import LoggedOutUserInterceptor from "ui/common/interceptors/logged-out";
import Loader from "ui/common/loader";
import NAV_LINKS from "ui/common/web-links.json";
import BACKEND_API from "db/apis";

// Import logging:
import Logger from "_/logger";

// Set up logging:
const _logger = new Logger( "transactions.view" );


export default class Transactions extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {},
            isLoaded: false
        };
    }

    componentWillMount() {
        BACKEND_API.users.getCurrentUserInfoFromDb().then( ( data ) => {
            this.setState({ user: data, isLoaded: true });
        });
    }

    _formatDate( _long ) {
        const _dt = new Date( _long );
        return `${ _dt.getFullYear() }.${ _dt.getMonth() + 1 }.${ _dt.getDate() } ${ _dt.toTimeString().substr( 0, 8 ) }`;
    }

    render() {
        if( !this.state.isLoaded ) return <Loader />;

        return (
            <LoggedOutUserInterceptor>
                <h3>{ this.state.user.username }'s transactions</h3>
                <p className="text--small text--disabled">Member since { this._formatDate( this.state.user.createdOn ) }</p>
                <p>
                    <Link to={ NAV_LINKS.MANAGE_TRANSACTIONS }>Manage transactions</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={ NAV_LINKS.SETTINGS }>Account settings</Link>
                </p>
            </LoggedOutUserInterceptor>
        );
    }
}