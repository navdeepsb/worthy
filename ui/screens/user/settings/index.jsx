// Import dependencies:
import React from "react";
import { Link } from "react-router-dom";
import Loader from "ui/common/loader";
import NAV_LINKS from "ui/common/web-links.json";
import ERROR_MAP from "ui/common/serverror-map.json";
import LoggedOutUserInterceptor from "ui/common/interceptors/logged-out";
import Form from "ui/components/form";
import UserInfo from "ui/components/userinfo";
import Modal from "ui/components/modal";
import BACKEND_API from "db/apis";

// Import style:
import "ui/screens/user/style";

// Import logging:
import Logger from "_/logger";

// Set up logging:
const _logger = new Logger( "settings.view" );
const CONTEXT = {
    BASIC_INFO_UPDATE: "BASIC_INFO_UPDATE",
    EMAIL_UPDATE: "EMAIL_UPDATE",
    PASSWORD_UPDATE: "PASSWORD_UPDATE",
    REMOVE_ACCOUNT: "REMOVE_ACCOUNT"
};


export default class Transactions extends React.Component {
    constructor() {
        super();
        this._context = "";
        this._handleInfoUpdate = this._handleInfoUpdate.bind( this );
        this._handleRemoveAccount = this._handleRemoveAccount.bind( this );
        this._handlePasswordModalCancel = this._handlePasswordModalCancel.bind( this );
        this._handlePasswordVerification = this._handlePasswordVerification.bind( this );
        this._updateResponseMessage = this._updateResponseMessage.bind( this );

        let _obj = {
            user: {},
            isLoaded: false,
            showPasswordModal: false,
            passwordVerificationResp: "",
            resp: {}
        };

        // Add context specific server response message keys:
        Object.keys( CONTEXT ).forEach( ctx => {
            _obj.resp[ ctx ] = "";
        });

        this.state = _obj;
    }

    componentWillMount() {
        BACKEND_API.users.getCurrentUserInfoFromDb().then( ( data ) => {
            this.setState({ user: data, isLoaded: true });
        });
    }

    _updateResponseMessage( context, message, isLoaded ) {
        let _resp = this.state.resp;
        _resp[ context ] = message;
        this.setState({ resp: _resp, isLoaded: !!isLoaded });
    }

    _handleInfoUpdate( typeOfUpdate, data ) {
        if( !Object.keys( data ).length ) {
            this._updateResponseMessage( typeOfUpdate, "No update detected!", true );
            _logger.info( typeOfUpdate );
            return;
        }

        this._updateResponseMessage( typeOfUpdate, "Loading..." );
        this._context = CONTEXT.EMAIL_UPDATE;

        if( typeOfUpdate === CONTEXT.PASSWORD_UPDATE ) {
            if( !data.password || !data.newPassword || !data.newPassword2 ) {
                _logger.info( data );
                this._updateResponseMessage( typeOfUpdate, "Incomplete form", true );
                return;
            }
            if( data.newPassword !== data.newPassword2 ) {
                _logger.info( data );
                this._updateResponseMessage( typeOfUpdate, "New password values do not match", true );
                return;
            }
        }
        _logger.info( "### Form passed!" );
        _logger.info( data );

        BACKEND_API.users.modifyCurrentUser( data )
            .then( ( resp ) => {
                if( resp.code && resp.message ) {
                    this._updateResponseMessage( typeOfUpdate, ERROR_MAP[ resp.code ] || ERROR_MAP.generic, true );
                }
                else {
                    window.location.reload();
                }
            })
            .catch( ( err ) => {
                _logger.info( err );
                if( err.code === "auth/requires-recent-login" ) {
                    this.setState({ showPasswordModal: true, isLoaded: true });
                }
                else {
                    this._updateResponseMessage( typeOfUpdate, ERROR_MAP[ err.code ] || ERROR_MAP.generic, true );
                }
            });
    }

    _handleRemoveAccount( e ) {
        if( e ) {
            e.preventDefault();
        }

        this._context = CONTEXT.REMOVE_ACCOUNT;

        BACKEND_API.users.removeCurrentUser()
            .then( ( resp ) => {
                if( resp.code && resp.message ) {
                    this.setState({ isLoaded: true });
                }
                else {
                    window.location.reload();
                }
            })
            .catch( ( err ) => {
                _logger.info( err );
                this.setState({ showPasswordModal: true, isLoaded: true });
            });
    }

    _handlePasswordModalCancel() {
        this.setState({ showPasswordModal: false });
    }

    _handlePasswordVerification( data ) {
        BACKEND_API.users.login( this.state.user.email, data.password )
            .then( ( resp ) => {
                if( resp.code && resp.message ) {
                    this.setState({ passwordVerificationResp: ERROR_MAP[ resp.code ] || ERROR_MAP.generic });
                }
                else if( this._context === CONTEXT.EMAIL_UPDATE ) {
                    _logger.info( this._context );
                    this._handleInfoUpdate({ email: this.state.user.email });
                }
                else if( this._context === CONTEXT.REMOVE_ACCOUNT ) {
                    _logger.info( this._context );
                    this._handleRemoveAccount();
                }
            });
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
                label: "Username",
                name: "username",
                value: this.state.user.username,
                spellCheck: false
            }],
            buttonText: "Update Basic Info",
            onFormSubmit: this._handleInfoUpdate.bind( this, CONTEXT.BASIC_INFO_UPDATE )
        };
        const emailUpdateFormData = {
            fields: [{
                label: "Email",
                name: "email",
                value: this.state.user.email,
                spellCheck: false
            }],
            buttonText: "Update Email",
            onFormSubmit: this._handleInfoUpdate.bind( this, CONTEXT.EMAIL_UPDATE )
        };
        const pwdUpdateFormData = {
            fields: [{
                label: "Current password",
                name: "password",
                placeholder: "*************",
                type: "password"
            },{
                label: "New password",
                name: "newPassword",
                placeholder: "*************",
                type: "password"
            },{
                label: "Confirm new password",
                name: "newPassword2",
                placeholder: "*************",
                type: "password"
            }],
            buttonText: "Update Password",
            onFormSubmit: this._handleInfoUpdate.bind( this, CONTEXT.PASSWORD_UPDATE )
        };
        const passwordFormData = {
            fields: [{
                name: "password",
                placeholder: "*************",
                type: "password"
            }],
            buttonText: "Verify Password",
            isFullWidth: true,
            hasCancel: true,
            onCancel: this._handlePasswordModalCancel,
            onFormSubmit: this._handlePasswordVerification
        };

        return (
            <LoggedOutUserInterceptor>
                <Modal title="Please verify your password" show={ this.state.showPasswordModal }>
                    <Form data={ passwordFormData } error={ this.state.passwordVerificationResp } />
                </Modal>

                <div className="user__content">
                    <h3>Account settings</h3>
                    <UserInfo { ...this.state.user } />
                    <br />
                    <br />
                    <Form data={ basicInfoFormData } error={ this.state.resp.BASIC_INFO_UPDATE } />
                    <br />
                    <br />
                    <Form data={ emailUpdateFormData } error={ this.state.resp.EMAIL_UPDATE } />
                    <br />
                    <br />
                    <Form data={ pwdUpdateFormData } error={ this.state.resp.PASSWORD_UPDATE } />
                    <br />
                    <br />
                    <div className="form">
                        <button className="btn--danger" onClick={ this._handleRemoveAccount }>Remove account</button>
                    </div>
                </div>
            </LoggedOutUserInterceptor>
        );
    }
}