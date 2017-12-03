// Import dependencies:
import React from "react"

// Import styles:
import "./style"

// Variables:
let _initValues = {};
const GRID_COLUMNS = 12;


export default class Form extends React.Component {
    constructor() {
        super();
        this._handleSubmit = this._handleSubmit.bind( this );
        this._handleCancelClick = this._handleCancelClick.bind( this );

        this.state = {};
    }

    componentWillMount() {
        this.props.data.fields.forEach( field => {
            this.state[ field.name ] = field.value || "";
            _initValues[ field.name ] = field.value || "";
        });
    }

    _handleSubmit( e ) {
        e.preventDefault();

        let _formData = {};
        let _newValue = null;

        Object.keys( this.state ).forEach( ( propName, idx ) => {
            _newValue = this[ "inp" + idx ].state.inputValue;

            if( _newValue != _initValues[ propName ] ) {
                _formData[ propName ] = _newValue;
            }
        });

        this.setState( _formData );
        this.props.data.onFormSubmit( _formData );
    }

    _handleCancelClick( e ) {
        e.preventDefault();
        this.props.data.onCancel();
    }

    render() {
        let btnGroup  = null;
        const btnData = this.props.data.button || {};
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
                <div className={ btnData.gridAllocation ? "col col-" + btnData.gridAllocation * GRID_COLUMNS : "" }>
                    <label htmlFor="" />
                    <button>{ this.props.data.buttonText || btnData.text }</button>
                </div>
            );
        }

        return (
            <div>
                <form ref="form" className={ "form grid no-gutter-on-sides" + ( this.props.data.isFullWidth ? " form--full-width" : "" ) } onSubmit={ this._handleSubmit } method="POST" action="#">
                    { this.props.data.fields.map( ( field, idx ) => {
                        return <InputGroup data={ field } key={ idx } ref={ inp => this[ "inp" + idx ] = inp } />;
                    })}
                    { btnGroup }
                </form>
                <p className="err">{ this.props.error }</p>
            </div>
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
        this.setState({ inputValue: this.props.data.value || "" });
    }

    _handleChange( e ) {
        this.setState({ inputValue: e.target.value || "" });
    }

    render() {
        const data  = this.props.data;
        const name  = data.name;
        const label = data.label ? <label htmlFor={ name }>{ data.label }</label> : null;
        const gridAllocation = data.gridAllocation;

        delete data.gridAllocation;

        return (
            <div className={ gridAllocation ? "col col-" + gridAllocation * GRID_COLUMNS : "" }>
                { label }
                <input id={ name } { ...data } onChange={ this._handleChange } value={ this.state.inputValue } />
            </div>
        );
    }
}