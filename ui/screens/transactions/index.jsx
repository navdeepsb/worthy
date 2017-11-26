// Import dependencies:
import React from "react";
import LoggedOutUserInterceptor from "ui/common/interceptors/logged-out";
import BACKEND_API from "db/apis";

// Import logging:
import Logger from "_/logger";

// Set up logging:
const _logger = new Logger( "transactions.view" );


export default class Transactions extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentWillMount() {
        BACKEND_API.users.getCurrentUserInfoFromDb().then( ( data ) => { this.setState( data ) } );
    }

    _formatDate( _long ) {
        const _dt = new Date( _long );
        return `${ _dt.getFullYear() }.${ _dt.getMonth() + 1 }.${ _dt.getDate() } ${ _dt.toTimeString().substr( 0, 8 ) }`;
    }

    render() {
        return (
            <LoggedOutUserInterceptor>
                <h3>Welcome, @{ this.state.username }!</h3>
                <p>Member since { this._formatDate( this.state.createdOn ) }</p>
                <p>Your transactions will be listed here...</p>
            </LoggedOutUserInterceptor>
        );
    }
}