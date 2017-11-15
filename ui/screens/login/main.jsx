// Import dependencies:
import React from "react";
import { Link } from "react-router-dom";

// Import styles:
import "./style.scss"

// Import links:
import NAV_LINKS from "../../common/web-links.json";


export default class Login extends React.Component {
    render() {
        return (
            <section>
                <h2>Login</h2>
                <form action="LoginHandler" method="POST" className="form">
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" spellCheck="false" autoComplete="off" placeholder="Ex. r1ck_" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="*************" />
                    </div>
                    <div>
                        <label htmlFor="btnLogin"></label>
                        <button id="btnLogin">Login</button>
                    </div>
                </form>
                <p>New member? <Link to={ NAV_LINKS.SIGNUP }>Signup</Link></p>
            </section>
        );
    }
}