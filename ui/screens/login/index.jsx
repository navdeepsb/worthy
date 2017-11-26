// Import dependencies:
import React from "react";
import { Link } from "react-router-dom";
import LoggedInUserInterceptor from "ui/common/interceptors/logged-in";
import NAV_LINKS from "ui/common/web-links.json";
import BACKEND_API from "db/apis";

// Import components:
import Form from "ui/components/form";

// Import logging:
import Logger from "_/logger";

// Set up logging:
const _logger = new Logger( "login.view" );


export default class Login extends React.Component {
    _handleFormSubmit( data ) {
        BACKEND_API.users.login( data.email, data.password )
            .then( ( resp ) => {
                _logger.info( resp );
            });
    }

    render() {
        const formData = {
            fields: [{
                name: "email",
                placeholder: "Ex. rick@example.com",
                spellCheck: false
            },{
                name: "password",
                placeholder: "*************",
                type: "password"
            }],
            buttonText: "Login",
            onFormSubmit: this._handleFormSubmit
        };

        return (
            <LoggedInUserInterceptor>
                <section>
                    <h2>Login</h2>
                    <Form data={ formData } />
                    <p>New member? <Link to={ NAV_LINKS.SIGNUP }>Signup</Link></p>
                </section>
            </LoggedInUserInterceptor>
        );
    }
}