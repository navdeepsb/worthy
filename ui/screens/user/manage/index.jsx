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

// Set up logging and other things:
const _logger = new Logger( "manage.view" );
const getUniqueId  = () => { return Date.now().toString( 16 ).substr( 4 ) };
const formatAmount = ( amt ) => { return amt.toString().split( "." ).length === 2 ? amt : amt + ".00" };


export default class Transactions extends React.Component {
    constructor() {
        super();
        this._handleSourceUpdate = this._handleSourceUpdate.bind( this );
        this.state = {
            user: {},
            currentSource: {},
            sourceUpdateRep: "",
            isLoaded: false
        };
    }

    componentWillMount() {
        BACKEND_API.users.getCurrentUserInfoFromDb().then( ( resp ) => {
            this.setState({ user: resp, isLoaded: true });
        });
    }

    _handleSourceUpdate( data ) {
        this.setState({ isLoaded: false });
        BACKEND_API.sources.update( getUniqueId(), data.title, window.parseFloat( data.amount, 10 ) ).then( ( resp ) => {
            _logger.info( "Added source successfully!" );
            this.setState({ currentSource: resp, sourceUpdateRep: "Added!", isLoaded: true });
        });
    }

    render() {
        if( !this.state.isLoaded ) return <Loader />;

        const sourceFormData = {
            fields: [{
                label: "Name",
                name: "title",
                value: this.state.currentSource.title || "",
                placeholder: "Ex. PNC Checking Account",
                gridallocation: 1 / 3,
                spellCheck: false
            },{
                label: "Current amount (USD)",
                name: "amount",
                value: this.state.currentSource.amount || 0.00,
                placeholder: "Ex. 2000.00",
                type: "number",
                step: "any",
                gridallocation: 1 / 3,
                spellCheck: false
            }],
            button: {
                text: "Add source",
                gridallocation: 1 / 3
            },
            onFormSubmit: this._handleSourceUpdate
        };

        const userSources = this.state.user.sources || {};
        const sourcesElem = Object.keys( userSources ).map( ( _k ) => {
            const src = userSources[ _k ];
            return (
                <div className="grid no-gutter-on-sides">
                    <div className="col col-4">
                        { src.title }
                    </div>
                    <div className="col col-4">
                        $ { formatAmount( src.amount ) }
                    </div>
                </div>
            );
        });

        return (
            <LoggedOutUserInterceptor>
                <div className="user__content">
                    <h3>Manage transactions</h3>
                    <UserInfo { ...this.state.user } />
                    <br />
                    <br />
                    <div className="grid no-gutter-on-sides">
                        <div className="col col-6">
                            <strong>Worth Sources</strong>
                            <Form data={ sourceFormData } error={ this.state.sourceUpdateRep } />
                            { sourcesElem }
                        </div>
                    </div>
                </div>
            </LoggedOutUserInterceptor>
        );
    }
}