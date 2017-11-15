// Import dependencies:
import React from "react";

// Import styles:
import "./style.scss";


export default class Footer extends React.Component {
    constructor() {
        super();
        this.state = { currYear: ( new Date() ).getFullYear() };
    }

    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <p className="text--small">
                        Copyright &copy; <span className="currYear">{ this.state.currYear }</span> Navdeep Singh Bagga | www.navdeepsb.com
                    </p>
                </div>
            </footer>
        );
    }
}
