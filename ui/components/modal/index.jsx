// Import dependencies:
import React from "react";

// Import style:
import "./style";


export default class Transactions extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Attention!",
            show: false
        };
    }

    componentWillMount() {
        this.setState({ title: this.props.title || this.state.title });
    }

    render() {
      return (
            <div className={ this.props.show ? "modal" : "hide" }>
                <div className="modal__overlay" />
                <div className="modal__main">
                    <p className="modal__title">
                        <span className="ion ion-android-warning" />
                        <span>{ this.state.title }</span>
                    </p>
                    { this.props.children }
                </div>
            </div>
        );
    }
}