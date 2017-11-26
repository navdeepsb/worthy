// Import dependencies:
import React from "react";
import NAV_LINKS from "ui/common/web-links.json";
import BACKEND_API from "db/apis";


export default class AuthInterceptor extends React.Component {
    constructor() {
        super();

        this.state = {
            isUserLoggedIn: !!BACKEND_API.users.getCurrentUserDisplayNameFromSession()
        };
    }

    render() {
        if( this.state.isUserLoggedIn ) {
            window.location.href = "#" + NAV_LINKS.TRANSACTIONS;
            return null;
        }
        else {
            return this.props.children;
        }
    };
}