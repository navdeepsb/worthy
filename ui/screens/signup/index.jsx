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
const _logger = new Logger( "signup.view" );


export default class Signup extends React.Component {
    _handleFormSubmit( data ) {
        BACKEND_API.users.signup( data.email, data.password )
            .then( ( resp ) => {
                _logger.info( resp );
            });
    }

    render() {
        const formData = {
            fields: [{
                name: "email",
                placeholder: "Ex. rick.sanchez@example.com",
                spellCheck: false
            },{
                name: "password",
                placeholder: "*************",
                type: "password"
            }],
            buttonText: "Signup",
            onFormSubmit: this._handleFormSubmit
        };

        return (
            <LoggedInUserInterceptor>
                <section>
                    <h2>Signup</h2>
                    <Form data={ formData } />
                    <p>Already a member? <Link to={ NAV_LINKS.LOGIN }>Login</Link></p>
                </section>
            </LoggedInUserInterceptor>
        );

    }
}