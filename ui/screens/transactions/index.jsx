// Import dependencies:
import React from "react";
import LoggedOutUserInterceptor from "ui/common/interceptors/logged-out";
import BACKEND_API from "db/apis";

// Import logging:
import Logger from "_/logger";

// Set up logging:
const _logger = new Logger( "transactions.view" );


export default class Transactions extends React.Component {
    render() {
        return (
            <LoggedOutUserInterceptor>
                <p>Transactions will be listed here...</p>
            </LoggedOutUserInterceptor>
        );
    }
}