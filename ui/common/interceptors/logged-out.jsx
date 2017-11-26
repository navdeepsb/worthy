// Import dependencies:
import React from "react";
import NAV_LINKS from "ui/common/web-links.json";
import BACKEND_API from "db/apis";


export default class LoggedOutUserInterceptor extends React.Component {
    constructor() {
        super();

        this.state = {
            isUserLoggedIn: !!BACKEND_API.users.getCurrentUserDisplayNameFromSession()
        };
    }

    render() {
        if( this.state.isUserLoggedIn ) {
            return this.props.children;
        }
        else {
            window.location.href = "#" + NAV_LINKS.LOGIN;
            return null;
        }
    };
}