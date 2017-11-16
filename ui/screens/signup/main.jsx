// Import dependencies:
import React from "react";
import { Link } from "react-router-dom";

// Import styles:
import "ui/screens/login/style.scss"

// Import links:
import NAV_LINKS from "ui/common/web-links.json";


export default class Signup extends React.Component {
    render() {
        return (
            <section>
                <h2>Signup</h2>
                <form action="SignupHandler" method="POST" className="form">
                    <div>
                        <label htmlFor="email">Email address</label>
                        <input type="text" id="email" name="email" spellCheck="false" autoComplete="off" placeholder="Ex. rick.sanchez@example.com" />
                    </div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" spellCheck="false" autoComplete="off" placeholder="Ex. r1ck_" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="*************" />
                    </div>
                    <div>
                        <label htmlFor="btnSignup"></label>
                        <button id="btnSignup">Signup</button>
                    </div>
                </form>
                <p>Already a member? <Link to={ NAV_LINKS.LOGIN }>Login</Link></p>
            </section>
        );
    }
}