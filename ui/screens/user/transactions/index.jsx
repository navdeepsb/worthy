// Import dependencies:
import React from "react";
import Loader from "ui/common/loader";
import LoggedOutUserInterceptor from "ui/common/interceptors/logged-out";
import UserInfo from "ui/components/userinfo";
import BACKEND_API from "db/apis";

// Import style:
import "ui/screens/user/style";

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

    render() {
        if( !this.state.isLoaded ) return <Loader />;

        return (
            <LoggedOutUserInterceptor>
                <div className="user__content">
                    <h3>View transactions</h3>
                    <UserInfo { ...this.state.user } />
                    <br />
                    <br />
                    <p>Coming soon...</p>
                </div>
            </LoggedOutUserInterceptor>
        );
    }
}