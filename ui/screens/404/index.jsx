// Import dependencies:
import React from "react";


export default class NotFound extends React.Component {
    render() {
        return (
            <section>
                <h2>These aren't the Droids you're looking for</h2>
                <p>Resource not found, try going back to <a href="/" title="Home page for this website">home</a> and start over again.</p>
            </section>
        );
    }
}