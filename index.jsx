// Import dependencies:
import React from "react";
import { render as ReactDOMRender } from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";

// Import components:
import Header from "ui/components/header";
import Footer from "ui/components/footer";
import HomeScreen from "ui/screens/home";
import LoginScreen from "ui/screens/login";
import SignupScreen from "ui/screens/signup";
import TransactionsScreen from "ui/screens/transactions";
import SettingsScreen from "ui/screens/settings";
import NotFoundScreen from "ui/screens/404";

// Import Firebase interface:
import FirebaseInterface from "db/firebase.jsx";

// Import logger:
import Logger from "_/logger.jsx";

// Import styles:
import "ui/common/styles/reset";
import "ui/common/styles/util";
import "ui/common/styles/grid";

// Import data:
import NAV_LINKS from "ui/common/web-links.json";

// Set up variables:
const _logger = new Logger( "index.view" );


class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <Switch>
                        <Route exact path={ NAV_LINKS.HOME } component={ HomeScreen } />
                        <Route exact path={ NAV_LINKS.LOGIN } component={ LoginScreen } />
                        <Route exact path={ NAV_LINKS.SIGNUP } component={ SignupScreen } />
                        <Route exact path={ NAV_LINKS.TRANSACTIONS } component={ TransactionsScreen } />
                        <Route exact path={ NAV_LINKS.SETTINGS } component={ SettingsScreen } />
                        <Route path="*" component={ NotFoundScreen } />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}


// Initialize Firebase:
const dbInitCallback = ( currentUser ) => {
    ReactDOMRender(
        <HashRouter>
            <App />
        </HashRouter>,
        document.getElementById( "content" )
    );
    _logger.info( "React app loaded..." );
};

( new FirebaseInterface() ).init( dbInitCallback );
_logger.info( "DB initialized..." );