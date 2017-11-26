// Import dependencies:
import React from "react";
import { Link } from "react-router-dom";
import LoggedOutUserInterceptor from "ui/common/interceptors/logged-out";
import Loader from "ui/common/loader";
import Form from "ui/components/form";
import NAV_LINKS from "ui/common/web-links.json";
import ERROR_MAP from "ui/common/serverror-map.json";
import BACKEND_API from "db/apis";

// Import logging:
import Logger from "_/logger";

// Set up logging:
const _logger = new Logger( "settings.view" );


export default class Transactions extends React.Component {
    constructor() {
        super();
        this._serverResponseCb = this._serverResponseCb.bind( this );
        this._handleInfoUpdate = this._handleInfoUpdate.bind( this );
        this._handleRemoveAccount = this._handleRemoveAccount.bind( this );
        this.state = {
            user: {},
            isLoaded: false
        };
    }

    componentWillMount() {
        BACKEND_API.users.getCurrentUserInfoFromDb().then( ( data ) => {
            this.setState({ user: data, isLoaded: true });
        });
    }

    _formatDate( _long ) {
        const _dt = new Date( _long );
        return `${ _dt.getFullYear() }.${ _dt.getMonth() + 1 }.${ _dt.getDate() } ${ _dt.toTimeString().substr( 0, 8 ) }`;
    }

    _serverResponseCb( resp ) {
        if( resp.code && resp.message ) {
            this.setState({ respMessage: ERROR_MAP[ resp.code ] || ERROR_MAP.generic });
        }
        else {
            window.location.reload();
        }
    }

    _handleInfoUpdate( data ) {
        this.setState({ isLoaded: false });
        BACKEND_API.users.modifyCurrentUser( data ).then( ( this._serverResponseCb ) );
    }

    _handleRemoveAccount( e ) {
        e.preventDefault();
        BACKEND_API.users.removeCurrentUser().then( ( this._serverResponseCb ) );
    }

    render() {
        if( !this.state.isLoaded ) return <Loader />;

        const basicInfoFormData = {
            fields: [{
                label: "Full name",
                name: "name",
                value: this.state.user.name,
                spellCheck: false
            },{
                name: "username",
                value: this.state.user.username,
                spellCheck: false
            }],
            buttonText: "Update Basic Info",
            onFormSubmit: this._handleInfoUpdate
        };
        const emailUpdateFormData = {
            fields: [{
            //     label: "Current password",
            //     name: "password",
            //     placeholder: "*************",
            //     type: "password"
            // },{
                label: "Email",
                name: "email",
                value: this.state.user.email,
                spellCheck: false
            }],
            buttonText: "Update Email",
            onFormSubmit: this._handleInfoUpdate
        };
        const pwdUpdateFormData = {
            fields: [{
                label: "Current password",
                name: "password",
                placeholder: "*************",
                type: "password"
            },{
                label: "New password",
                name: "newpassword",
                placeholder: "*************",
                type: "password"
            },{
                label: "Confirm new password",
                name: "newpassword2",
                placeholder: "*************",
                type: "password"
            }],
            buttonText: "Update Password",
            onFormSubmit: this._handleInfoUpdate
        };

        const name = this.state.user.name ? this.state.user.name + " | " : null;

        return (
            <LoggedOutUserInterceptor>
                <h3>{ this.state.user.username }'s settings</h3>
                <p className="text--small">
                    { name }
                    <span className="text--disabled">Member since { this._formatDate( this.state.user.createdOn ) }</span>
                </p>
                <p>
                    <Link to={ NAV_LINKS.MANAGE_TRANSACTIONS }>Manage transactions</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={ NAV_LINKS.TRANSACTIONS }>View transactions</Link>
                </p>
                <br />
                <br />
                <Form data={ basicInfoFormData } /*error={ this.state.respMessage }*/ />
                <br />
                <br />
                <Form data={ emailUpdateFormData } /*error={ this.state.respMessage }*/ />
                <div className="hide">
                <br />
                <br />
                <Form data={ pwdUpdateFormData } /*error={ this.state.respMessage }*/ />
                </div>
                <br />
                <br />
                <div className="form">
                    <button className="btn--danger" onClick={ this._handleRemoveAccount }>Remove account</button>
                </div>
            </LoggedOutUserInterceptor>
        );
    }
}