// Import dependencies:
import React from "react";
import { Link } from "react-router-dom";
import BACKEND_API from "db/apis";
import NAV_LINKS from "ui/common/web-links.json";

// Import styles:
import "./style";


export default class Header extends React.Component {
    constructor() {
        super();

        const username = BACKEND_API.users.getCurrentUserDisplayNameFromSession();

        this._handleLogout = this._handleLogout.bind( this );
        this.state = {
            appName: "Worthy",
            username: username,
            isUserLoggedIn: !!username
        };
    }

    _handleLogout( e ) {
        e.preventDefault();
        BACKEND_API.users.logout()
            .then( ( resp ) => {
                if( resp.code && resp.message ) {
                    this.setState({ respMessage: ERROR_MAP[ resp.code ] || ERROR_MAP.generic });
                }
                else {
                    window.location.reload();
                }
            });
    }

    render() {
        const LogoutBtn = () => {
            if( this.state.isUserLoggedIn ) {
                return (
                    <div>
                        @{ this.state.username } &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="#logout" className="lighter" onClick={ this._handleLogout }>Logout</a>
                    </div>
                );
            }
            return null;
        };

        return (
            <header className="header">
                <div className="container grid">
                    <div className="col col-6 no-gutter">
                        <Link to={ NAV_LINKS.HOME } className="home-link">{ this.state.appName }</Link>
                    </div>
                    <div className="col col-6 no-gutter align--right">
                        <LogoutBtn />
                    </div>
                </div>
            </header>
        );
    }
}
