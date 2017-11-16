// Import dependencies:
import React from "react";
import { Link } from "react-router-dom";

// Import styles:
// import "./style.scss"

// Import links:
import NAV_LINKS from "ui/common/web-links.json";
import DB_CONFIG from "db/config.jsx";

export default class Home extends React.Component {
    render() {
        console.log( "#", DB_CONFIG );
        return (
            <div>
                <section>
                    <h2>Welcome to Worthy!</h2>
                    <p><strong>Thank you for stopping by and trying this out.</strong></p>

                    <br />
                    <br />

                    <p><Link to={ NAV_LINKS.LOGIN }>Login</Link> or <Link to={ NAV_LINKS.SIGNUP }>Create an account</Link></p>

                    <p className="hide"><a href="/logout">Logout</a></p>
               </section>
                <section>
                    <p style={{ color: "#F85F73" }}>#workinprogress</p>
               </section>
           </div>
        );
    }
}