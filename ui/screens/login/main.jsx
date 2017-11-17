// Import dependencies:
import React from "react";
import { Link } from "react-router-dom";

// Import styles:
// import "./style.scss"

// Import links:
import NAV_LINKS from "ui/common/web-links.json";

// Import components:
import Form from "ui/components/form/main.jsx";


export default class Login extends React.Component {
    render() {
        const formData = {
            fields: [{
                name: "username",
                placeholder: "Ex. r1ck_"
            },{
                name: "password",
                placeholder: "*************",
                type: "password"
            }],
            buttonText: "Login"
        };

        return (
            <section>
                <h2>Login</h2>
                <Form data={ formData } />
                <p>New member? <Link to={ NAV_LINKS.SIGNUP }>Signup</Link></p>
            </section>
        );
    }
}