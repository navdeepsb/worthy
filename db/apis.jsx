/**
 *   @desc The backend API interface
 * @author Navdeep
 *  @usage window.BACKEND_API.users.login( "navdeepsb@example.com", "abc@123" )
 *             .then( function( response ) {
 *                 console.log( resoponse );
 *             });
 **/


// Import dependencies:
import Utils from "db/utils.jsx";
import DatabaseOperations from "db/ops.jsx";
import AuthenticationOperations from "db/authops.jsx";

// Import logging:
import Logger from "_/logger.jsx";

// Variables:
const _obj = {};
const _logger  = new Logger( "app.worthy.API" );
const _utils   = new Utils();
const DB_OPS   = new DatabaseOperations();
const AUTH_OPS = new AuthenticationOperations();

// User operations:
_obj[ "users" ] = {
    login: ( email, password ) => {
        /**
         * Queries the email & password with the db:
         *     - Returns user db object if values are correct
         *     - Returns error object if values are incorrect
         *     - Adds user info to the current auth session
         **/
        _logger.info( "users.login" );
        return AUTH_OPS.loginUser({ email: email, password: password });
    },
    signup: ( email, password ) => {
        /**
         * Adds the user info in database:
         *     - Returns user db object
         *     - Returns error object if email is not unique
         *     - Adds user info to the current auth session
         **/
        _logger.info( "users.signup" );
        return AUTH_OPS.signupUser({ email: email, password: password });
    },
    logout: () => {
        /**
         * Logs the current user out
         *     - Returns success obj
         **/
        _logger.info( "users.logout" );
        return AUTH_OPS.logoutUser();
    },
    getCurrentUserEmailFromSession: () => {
        /**
         * Returns the email address of the user currently logged-in, otherwise undefined
         **/
        _logger.info( "users.getCurrentUserEmailFromSession" );
        return AUTH_OPS.getCurrentUserEmail();
    },
    getCurrentUserInfoFromDb: () => {
        /**
         * Returns the user info of currently logged-in user
         **/
        _logger.info( "users.getCurrentUserInfoFromDb" );

        var currentUserEmail = this.getCurrentUserEmailFromSession();

        if( !currentUserEmail ) {
            _logger.info( "The user is not logged in" );
            return window.Promise.resolve( { message: "The user is not logged in" } );
        }

        _logger.info( "currentUserEmail: " + currentUserEmail );

        return DB_OPS.get( "users/" + UTILS.formatEmailAsKey( currentUserEmail ) );
    },
    getByEmail: ( email ) => {
        /**
         * Returns the user info by matching the email address
         **/
        _logger.info( "users.getByEmail " + email );

        return DB_OPS.get( "users/" + UTILS.formatEmailAsKey( email ) );
    },
    getAll: () => {
        /**
         * Returns all users
         **/
        _logger.info( "users.getAll" );

        return DB_OPS.get( "users/" )
            .then( ( response ) => {
                return Object.keys( response ).map( function( k ) {
                    return response[ k ];
                });
            });
    },
    modifyCurrentUser: ( updateObj ) => {
        /**
         * Modifies the current user
         *     - Returns success obj
         **/
        _logger.info( "users.modifyCurrentUser" );

        var _chain = window.Promise.resolve( {} ).then( ( o ) => { return o; } );

        if( !AUTH_OPS.getCurrentUserEmail() ) {
            _logger.info( "User info not found in session, could not modify user" );

            return _chain.then( () => {
                return { message: "User info not in session, could not modify" };
            });
         }

        _logger.info( "updateObj: " + JSON.stringify( updateObj, null, 4 ) );

        Object.keys( updateObj ).forEach( ( k ) => {

            // Handle password update:
            if( k === "password" ) {
                AUTH_OPS.updateCurrentUserPassword( updateObj[ k ] );
            }

            _chain = _chain.then( function() {
                var _p = DB_OPS.updateValue( "users/" + AUTH_OPS.getCurrentUserDisplayName() + "/" + k, updateObj[ k ] );

                // Also update email in the session:
                if( k === "email" ) {
                    _p = _p.then( function() {
                        return AUTH_OPS.updateCurrentUserEmail( updateObj[ k ] );
                    });
                }

                return _p;
            });
        });

        return _chain;
    },
    removeCurrentUser: () => {
        /**
         * Removes the current user
         *     - Returns success obj
         **/
        return AUTH_OPS.removeUser();
    }
};

export default _obj