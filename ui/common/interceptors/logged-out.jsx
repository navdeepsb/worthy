// Import dependencies:
import React from "react";
import { Redirect } from "react-router-dom";
import NAV_LINKS from "ui/common/web-links.json";
import BACKEND_API from "db/apis";


export default class LoggedOutUserInterceptor extends React.Component {
    constructor() {
        super();

        this.state = {
            isUserLoggedIn: BACKEND_API.users.isUserLoggedIn()
        };
    }

    render() {
        if( this.state.isUserLoggedIn ) {
            return this.props.children;
        }
        else {
            return <Redirect push to={ NAV_LINKS.LOGIN } />;
        }
    };
}