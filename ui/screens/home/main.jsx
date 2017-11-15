// Import dependencies:
import React from "react";
import { Link } from "react-router-dom";

// Import styles:
// import "./style.scss"

// Import links:
import NAV_LINKS from "../../common/web-links.json";


export default class Home extends React.Component {
    render() {
        return (
            <section>
                <h2>Welcome to Worthy!</h2>
                <p><strong>Thank you for stopping by and trying this out</strong></p>

                <p><Link to={ NAV_LINKS.LOGIN }>Login</Link> or <Link to={ NAV_LINKS.SIGNUP }>Create an account</Link></p>

                <p className="hide"><a href="/logout">Logout</a></p>
           </section>
        );
    }
}