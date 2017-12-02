// Import dependencies:
import React from "react";
import Loader from "ui/common/loader";
import LoggedOutUserInterceptor from "ui/common/interceptors/logged-out";
import Form from "ui/components/form";
import UserInfo from "ui/components/userinfo";
import BACKEND_API from "db/apis";

// Import style:
import "ui/screens/user/style";

// Import logging:
import Logger from "_/logger";

// Set up logging:
const _logger = new Logger( "manage.view" );


export default class Transactions extends React.Component {
    constructor() {
        super();
        this._handleSourceUpdate = this._handleSourceUpdate.bind( this );
        this.state = {
            user: {},
            currentSource: {},
            isLoaded: false
        };
    }

    componentWillMount() {
        BACKEND_API.users.getCurrentUserInfoFromDb().then( ( data ) => {
            this.setState({ user: data, isLoaded: true });
        });
    }

    _handleSourceUpdate( data ) {
        this.setState({ isLoaded: false });
        _logger.info( data );
    }

    render() {
        if( !this.state.isLoaded ) return <Loader />;

        const sourceFormData = {
            fields: [{
                label: "Name",
                name: "title",
                value: this.state.currentSource.title || "",
                placeholder: "Ex. PNC Checking Account",
                gridAllocation: 1 / 3,
                spellCheck: false
            },{
                label: "Current amount (USD)",
                name: "amount",
                disabled: "disabled",
                value: this.state.currentSource.amount || 0.00,
                placeholder: "Ex. 2000.00",
                type: "number",
                gridAllocation: 1 / 3,
                spellCheck: false
            }],
            button: {
                text: "Add source",
                gridAllocation: 1 / 3
            },
            onFormSubmit: this._handleSourceUpdate
        };

        return (
            <LoggedOutUserInterceptor>
                <div className="user__content">
                    <h3>Manage transactions</h3>
                    <UserInfo { ...this.state.user } />
                    <br />
                    <br />
                    <div className="grid grid no-gutter-on-sides">
                        <div className="col col-6">
                            <strong>Worth Sources</strong>
                            <Form data={ sourceFormData } error={ this.state.sourceUpdateRep } />
                        </div>
                    </div>
                </div>
            </LoggedOutUserInterceptor>
        );
    }
}