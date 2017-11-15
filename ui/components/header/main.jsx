// Import dependencies:
import React from "react";
import { Link } from "react-router-dom";

// Import styles:
import "./style.scss";

// Import links:
import NAV_LINKS from "../../common/web-links.json";


export default class Header extends React.Component {
    constructor() {
        super();
        this.state = { appName: "Worthy" };
    }

    render() {
        return (
            <header className="header">
                <div className="container">
                    <Link to={ NAV_LINKS.HOME } className="home-link">{ this.state.appName }</Link>
                </div>
            </header>
        );
    }
}
