// Import dependencies:
import React from "react"

// Import styles:
import "./style"


export default class Form extends React.Component {
    constructor() {
        super();
        this._handleSubmit = this._handleSubmit.bind( this );

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

    render() {
        return (
            <form ref="form" className="form" onSubmit={ this._handleSubmit } method="POST" action="#">
                { this.props.data.fields.map( ( field, idx ) => {
                    return <InputGroup { ...field } key={ idx } ref={ inp => this[ "inp" + idx ] = inp } />;
                })}
                <div>
                    <label />
                    <button>{ this.props.data.buttonText }</button>
                </div>
                <p className="err">{ this.props.error }</p>
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

        return (
            <div>
                <label htmlFor={ name }>{ this.props.label || name }</label>
                <input id={ name } { ...this.props } onChange={ this._handleChange } value={ this.state.inputValue } />
            </div>
        );
    }
}