// Import dependencies:
import React from "react";
import BACKEND_API from "db/apis.jsx";


export default class AuthInterceptor extends React.Component {
    constructor() {
        super();

        this.state = {
            isUserLoggedIn: !!BACKEND_API.users.getCurrentUserDisplayNameFromSession()
        };
    }

    render() {
        if( this.state.isUserLoggedIn ) {
            return <p>User is already logged in...</p>;
        }
        else {
            return this.props.children;
        }
    };
}