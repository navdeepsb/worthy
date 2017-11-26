/**
 *   @desc The module for various authentication operations.
 *         This module is used in the APIs module and is not
 *         intended to be used directly, rather only through
 *         the API interface.
 * @author Navdeep
 **/


// Import dependencies:
import Utils from "db/utils";
import FirebaseInterface from "db/firebase";
import DatabaseOperations from "db/ops";

// Import logger:
import Logger from "_/logger";

// Init classes:
const _utils    = new Utils();
const DB_OPS    = new DatabaseOperations();
const _firebase = new FirebaseInterface();

// Auth ops class:
export default class AuthenticationOperations {
    loginUser( data ) {
        const _logger = new Logger( "AuthenticationOperations.loginUser" );

        return _firebase.getFirebaseAuth().signInWithEmailAndPassword( data.email, data.password )
            .then( ( firebaseUser ) => {
                if( firebaseUser ) {
                    const username = firebaseUser.displayName;
                    _logger.info( "Proceeding to fetch user info from db w/ username: " + username );

                    // Get this user from the db:
                    return DB_OPS.get( "users/" + username );
                }
                return { message: "Invalid credentials!" };
            })
            .catch( ( err ) => {
                _logger.error( "[" + err.code + "] " + err.message + " Email: " + data.email );
                return err;
            });
    }

    signupUser( data ) {
        const _logger = new Logger( "AuthenticationOperations.signupUser" );

        return _firebase.getFirebaseAuth().createUserWithEmailAndPassword( data.email, data.password )
            .then( ( firebaseUser ) => {
                if( firebaseUser ) {
                    data.uid      = firebaseUser.uid;
                    data.username = _utils.getUsernameFromEmail( data.email );

                    _logger.info( "Proceeding to update displayName in Auth for " + data.email );
                    return firebaseUser.updateProfile({ displayName: data.username });
                }
            })
            .then( () => {
                _logger.info( "Proceeding to add this user to database w/ email: " + data.email );
                return DB_OPS.upsert( "/users/" + data.username, data, "user" );
            })
            .then( ( fromDb ) => {
                _logger.info( "Successfully added user to DB: " + JSON.stringify( fromDb, null, 4 ) );
                return fromDb.newData;
            })
            .catch( ( err ) => {
                _logger.error( "[" + err.code + "] " + err.message + " Email: " + data.email );
                return err;
            });
    }

    logoutUser() {
        const _logger = new Logger( "AuthenticationOperations.logoutUser" );

        _logger.info( "Log out request for '" + ( _firebase.getFirebaseAuth().currentUser && _firebase.getFirebaseAuth().currentUser.email ) + "' started" );

        return _firebase.getFirebaseAuth().signOut()
            .then( () => {
                _logger.info( "User logged out successfully" );
                return { message: "success" };
            })
            .catch( ( err ) => {
                _logger.error( "[" + err.code + "] " + err.message );
                return err;
            });
    }

    removeUser() {
        const _logger = new Logger( "AuthenticationOperations.removeUser" );

        if( _firebase.getFirebaseAuth().currentUser ) {
            const currentUserEmail = _firebase.getFirebaseAuth().currentUser.email;

            _logger.info( "Delete request for '" + currentUserEmail + "' started" );

            return _firebase.getFirebaseAuth().currentUser.delete()
                .then( () => {
                    _logger.info( "User removed from auth table, proceeding to remove from database" );

                    return DB_OPS.remove( "users/" + _firebase.getFirebaseAuth().currentUser.displayName );
                })
                .then( () => {
                    _logger.info( "User removed from database successfully too" );
                    return { message: "success" };
                })
                .catch( ( err ) => {
                    _logger.info( "[" + err.code + "] " + err.message );
                    return err;
                });
        }
        else {
            _logger.info( "User info not found in session, could not delete user" );
        }
    }

    isUserLoggedIn( userEmail ) {
        const _logger          = new Logger( "AuthenticationOperations.isUserLoggedIn" );
        const currentUserEmail = _firebase.getFirebaseAuth() && _firebase.getFirebaseAuth().currentUser && _firebase.getFirebaseAuth().currentUser.email;
        _logger.info( "In session: " + currentUserEmail + "; To match: " + userEmail );
        return currentUserEmail === userEmail;
    }

    getCurrentUserEmail() {
        const _logger          = new Logger( "AuthenticationOperations.getCurrentUserEmail" );
        const currentUserEmail = _firebase.getFirebaseAuth() && _firebase.getFirebaseAuth().currentUser && _firebase.getFirebaseAuth().currentUser.email;
        _logger.info( "In session: " + currentUserEmail );
        return currentUserEmail;
    }

    getCurrentUserDisplayName() {
        const _logger     = new Logger( "AuthenticationOperations.getCurrentUserDisplayName" );
        const displayName = _firebase.getFirebaseAuth() && _firebase.getFirebaseAuth().currentUser && _firebase.getFirebaseAuth().currentUser.displayName;
        _logger.info( "In session: " + displayName );
        return displayName;
    }

    updateCurrentUserEmail( newUserEmail ) {
        const _logger = new Logger( "AuthenticationOperations.updateCurrentUserEmail" );

        return _firebase.getFirebaseAuth().currentUser.updateEmail( newUserEmail )
            .then( () => {
                _logger.info( "User email updated successfully" );
                return { message: "success" };
            })
            .catch( ( err ) => {
                _logger.info( "[" + err.code + "] " + err.message );
                return err;
            });
    }

    updateCurrentUserDisplaName( newUsername ) {
        const _logger = new Logger( "AuthenticationOperations.updateCurrentUserDisplaName" );

        return _firebase.getFirebaseAuth().currentUser.updateProfile({ displayName: newUsername })
            .then( () => {
                _logger.info( "Display name updated successfully" );
                return { message: "success" };
            })
            .catch( ( err ) => {
                _logger.info( "[" + err.code + "] " + err.message );
                return err;
            });
    }

    updateCurrentUserPassword( newUserPassword ) {
        const _logger = new Logger( "AuthenticationOperations.updateCurrentUserPassword" );

        return _firebase.getFirebaseAuth().currentUser.updatePassword( newUserPassword )
            .then( () => {
                _logger.info( "User password updated successfully" );
                return { message: "success" };
            })
            .catch( ( err ) => {
                _logger.info( "[error" + err.code + "] " + err.message );
                return err;
            });
    }
}