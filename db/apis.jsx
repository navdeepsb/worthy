/**
 *   @desc The backend API interface
 * @author Navdeep
 *  @usage window.BACKEND_API.users.login( "navdeepsb@example.com", "abc@123" )
 *             .then( function( response ) {
 *                 console.log( resoponse );
 *             });
 **/


// Import dependencies:
import Utils from "db/utils";
import DatabaseOperations from "db/ops";
import AuthenticationOperations from "db/authops";
import CustomError from "db/customerror";

// Import logging:
import Logger from "_/logger";

// Variables:
const _obj = {};
const _logger  = new Logger( "API" );
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
    getCurrentUserDisplayNameFromSession: () => {
        /**
         * Returns the email address of the user currently logged-in, otherwise undefined
         **/
        _logger.info( "users.getCurrentUserDisplayNameFromSession" );
        return AUTH_OPS.getCurrentUserDisplayName();
    },
    isUserLoggedIn: () => {
        /**
         * Returns true/false depending on if a user is logged in or not
         **/
        _logger.info( "users.isUserLoggedIn" );
        return !!AUTH_OPS.getCurrentUserDisplayName();
    },
    getCurrentUserInfoFromDb: () => {
        /**
         * Returns the user info of currently logged-in user
         **/
        _logger.info( "users.getCurrentUserInfoFromDb" );

        let currentUserDisplayName = _obj.users.getCurrentUserDisplayNameFromSession();

        if( !currentUserDisplayName ) {
            _logger.info( "The user is not logged in" );
            return window.Promise.resolve( { message: "The user is not logged in" } );
        }

        _logger.info( "currentUserDisplayName: " + currentUserDisplayName );

        return DB_OPS.get( "users/" + currentUserDisplayName );
    },
    getByDisplayName: ( displayName ) => {
        /**
         * Returns the user info by matching the display name
         **/
        _logger.info( "users.getByDisplayName " + displayName );

        return DB_OPS.get( "users/" + displayName );
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

        let _chain = window.Promise.resolve( {} );
        let currentUserDisplayName = _obj.users.getCurrentUserDisplayNameFromSession();

        if( !currentUserDisplayName ) {
            _logger.info( "User info not found in session, could not modify user" );

            return _chain.then( () => {
                return { message: "User info not in session, could not modify" };
            });
         }

        _logger.info( "updateObj: " + JSON.stringify( updateObj, null, 4 ) );

        // Handle email update
        // This is a sensitive operation which requires recent login
        // #firebase
        if( updateObj.email ) {
            _chain = _chain.then( () => {
                _logger.info( "Updating email in auth to " + updateObj[ k ] );
                return AUTH_OPS.updateCurrentUserEmail( updateObj[ k ] );
            })
            .catch( ( err ) => {
                _logger.info( "Recent authentication required!" );
                throw new CustomError( err.code, "Recent authentication required!" );
            });
        }

        Object.keys( updateObj ).forEach( ( k ) => {

            // Handle password update:
            if( k === "password" ) {
                return AUTH_OPS.updateCurrentUserPassword( updateObj[ k ] );
            }

            _chain = _chain.then( () => {
                let _p = window.Promise.resolve( {} );

                // Handle email update:
                if( k === "username" ) {
                    _p = _p.then( () => {
                        _logger.info( "Updating username in auth to " + updateObj[ k ] );
                        return AUTH_OPS.updateCurrentUserDisplaName( updateObj[ k ] );
                    });
                }

                return _p.then( () => {
                    return DB_OPS.updateValue( "users/" + currentUserDisplayName + "/" + k, updateObj[ k ] );
                });
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

window.BACKEND_API = _obj;
export default _obj