// Import dependencies:
import React from "react";
import { Link } from "react-router-dom";

// Import links:
import NAV_LINKS from "ui/common/web-links.json";

// Import components:
import Form from "ui/components/form/main.jsx";


export default class Signup extends React.Component {
    _handleFormSubmit( data ) {
        console.log( "This is the data from the form, yeah:", data );
    }

    render() {
        const formData = {
            fields: [{
                name: "email",
                placeholder: "Ex. rick.sanchez@example.com"
            },{
                name: "username",
                placeholder: "Ex. r1ck_"
            },{
                name: "password",
                placeholder: "*************",
                type: "password"
            }],
            buttonText: "Signup",
            onFormSubmit: this._handleFormSubmit
        };

        return (
            <section>
                <h2>Signup</h2>
                <Form data={ formData } />
                <p>Already a member? <Link to={ NAV_LINKS.LOGIN }>Login</Link></p>
            </section>
        );
    }
}