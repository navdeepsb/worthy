// Import dependencies:
import React from "react"

// Import styles:
import "./style"


export default class Form extends React.Component {
    constructor() {
        super();
        this._handleSubmit = this._handleSubmit.bind( this );
        this._handleCancelClick = this._handleCancelClick.bind( this );

        this.state = {};
    }

    componentWillMount() {
        this.props.data.fields.forEach( field => this.state[ field.name ] = "" );
    }

    _handleSubmit( e ) {
        e.preventDefault();

        let _formData = {};

        Object.keys( this.state ).forEach( ( propName, idx ) => {
            _formData[ propName ] = this[ "inp" + idx ].state.inputValue;
        });

        this.setState( _formData );
        this.props.data.onFormSubmit( _formData );
    }

    _handleCancelClick( e ) {
        e.preventDefault();
        this.props.data.onCancel();
    }

    render() {
        let btnGroup = null;
        if( this.props.data.hasCancel ) {
            btnGroup = (
                <div className="grid no-gutter-on-sides">
                    <div className="col col-5">
                        <button className="btn--cancel" onClick={ this._handleCancelClick }>Cancel</button>
                    </div>
                    <div className="col col-7">
                        <button>{ this.props.data.buttonText }</button>
                    </div>
                </div>
            );
        }
        else {
            btnGroup = (
                <button>{ this.props.data.buttonText }</button>
            );
        }

        return (
            <form ref="form" className={ "form" + ( this.props.data.isFullWidth ? " form--full-width" : "" ) } onSubmit={ this._handleSubmit } method="POST" action="#">
                { this.props.data.fields.map( ( field, idx ) => {
                    return <InputGroup { ...field } key={ idx } ref={ inp => this[ "inp" + idx ] = inp } />;
                })}
                <p className="err">{ this.props.error }</p>
                { btnGroup }
            </form>
        );
    }
}

class InputGroup extends React.Component {
    constructor() {
        super();
        this._handleChange = this._handleChange.bind( this );

        this.state = { inputValue: "" };
    }

    componentWillMount() {
        this.setState({ inputValue: this.props.value || "" });
    }

    _handleChange( e ) {
        this.setState({ inputValue: e.target.value });
    }

    render() {
        const name = this.props.name;
        const label = this.props.label ? <label htmlFor={ name }>{ this.props.label }</label> : null;

        return (
            <div>
                { label }
                <input id={ name } { ...this.props } onChange={ this._handleChange } value={ this.state.inputValue } />
            </div>
        );
    }
}