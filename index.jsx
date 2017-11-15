// Import dependencies:
import React from "react";
import { render as ReactDOMRender } from "react-dom";
import { HashRouter, Switch, Route, IndexRoute } from "react-router-dom";
// import { Router, Route, IndexRoute } from "react-router";
// import useScroll from "react-router-scroll/lib/useScroll";

// Import components:
import Header from "./ui/components/header/main.jsx";
import Footer from "./ui/components/footer/main.jsx";
import HomeScreen from "./ui/screens/home/main.jsx";
import LoginScreen from "./ui/screens/login/main.jsx";
import SignupScreen from "./ui/screens/signup/main.jsx";
import NotFoundScreen from "./ui/screens/404/main.jsx";

// Import styles:
import "./ui/common/reset.scss";
import "./ui/common/util.scss";

// Import data:
import NAV_LINKS from "./ui/common/web-links.json";


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
                        <Route path="*" component={ NotFoundScreen } />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}


ReactDOMRender(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById( "content" )
);