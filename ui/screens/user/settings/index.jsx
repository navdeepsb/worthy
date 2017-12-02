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
    REMOVE_ACCT: "remove-account",
    EMAIL_UPDATE: "email-update"
};


export default class Transactions extends React.Component {
    constructor() {
        super();
        this._context = "";
        this._handleInfoUpdate = this._handleInfoUpdate.bind( this );
        this._handleRemoveAccount = this._handleRemoveAccount.bind( this );
        this._handlePasswordModalCancel = this._handlePasswordModalCancel.bind( this );
        this._handlePasswordVerification = this._handlePasswordVerification.bind( this );
        this.state = {
            user: {},
            isLoaded: false,
            showPasswordModal: false,
            basicInfoUpdateRep: "",
            passwordUpdateResp: ""
        };
    }

    componentWillMount() {
        BACKEND_API.users.getCurrentUserInfoFromDb().then( ( data ) => {
            this.setState({ user: data, isLoaded: true });
        });
    }

    _handleInfoUpdate( data ) {
        this._context = CONTEXT.EMAIL_UPDATE;
        this.setState({ isLoaded: false });

        BACKEND_API.users.modifyCurrentUser( data )
            .then( ( resp ) => {
                if( resp.code && resp.message ) {
                    this.setState({ basicInfoUpdateRep: ERROR_MAP[ resp.code ] || ERROR_MAP.generic, isLoaded: true });
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

    _handleRemoveAccount( e ) {
        if( e ) {
            e.preventDefault();
        }

        this._context = CONTEXT.REMOVE_ACCT;

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
        _logger.info( "yo!" );
        BACKEND_API.users.login( this.state.user.email, data.password )
            .then( ( resp ) => {
                if( resp.code && resp.message ) {
                    this.setState({ passwordUpdateResp: ERROR_MAP[ resp.code ] || ERROR_MAP.generic });
                }
                else if( this._context === CONTEXT.EMAIL_UPDATE ) {
                    _logger.info( this._context );
                    this._handleInfoUpdate({ email: this.state.user.email });
                }
                else if( this._context === CONTEXT.REMOVE_ACCT ) {
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
            onFormSubmit: this._handleInfoUpdate
        };
        const emailUpdateFormData = {
            fields: [{
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
                    <Form data={ passwordFormData } error={ this.state.passwordUpdateResp } />
                </Modal>

                <div className="user__content">
                    <h3>Account settings</h3>
                    <UserInfo { ...this.state.user } />
                    <br />
                    <br />
                    <Form data={ basicInfoFormData } error={ this.state.basicInfoUpdateRep } />
                    <br />
                    <br />
                    <Form data={ emailUpdateFormData } error={ this.state.basicInfoUpdateRep } />
                    <div className="hide">
                    <br />
                    <br />
                    <Form data={ pwdUpdateFormData } /*error={ this.state.acctRemoveRep }*/ />
                    </div>
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