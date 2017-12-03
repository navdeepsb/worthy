/**
 *   @desc The module for various database operations.
 *         This module interacts directly with Firebase database
 *         and is not intended to be used directly, rather only through
 *         the API interface.
 * @author Navdeep
 **/


// Import dependencies:
import Utils from "db/utils";
import SchemaFactory from "db/schemas";
import FirebaseInterface from "db/firebase";

// Import logger:
import Logger from "_/logger";

// Init classes:
const _utils = new Utils();
const _firebase = new FirebaseInterface();

// Variables:
let _cache = {};

// DB ops class:
export default class DatabaseOperations {
    get( modelLocation ) {
        const _logger = new Logger( "DatabaseOperations.get" );
        const _cached = _cache[ modelLocation ];

        _logger.info( "modelLocation: " + modelLocation );

        if( _cached ) {
            _logger.debug( "Found this model in the cache, preventing DB call." );
            return window.Promise.resolve( _cached );
        }

        return _firebase.getFirebaseDB().ref( modelLocation ).once( "value" )
            .then( ( snapshot ) => {
                const fromDb = snapshot.val();
                _logger.info( "Found this data: " + JSON.stringify( fromDb, null, 4 ) );
                _logger.info( "Caching `" + modelLocation + "`" );
                _cache[ modelLocation ] = fromDb;
                return fromDb;
            })
            .catch( ( err ) => {
                _logger.error( "[" + err.code + "] " + err.message );
                return err;
            });
    }

    upsert( modelStore, data, modelSchema ) {
        const _logger = new Logger( "DatabaseOperations.upsert" );

        return _firebase.getFirebaseDB().ref( modelStore ).once( "value" )
            .then( ( snapshot ) => {
                let oldData    = snapshot.val(); // will be `null` if not found
                let isUpdateOp = !!oldData;      // if data is present, it is an update operation
                let dataToSend = SchemaFactory.get( modelSchema );

                // Inherit schema attributes:
                Object.keys( dataToSend ).forEach( ( k ) => {
                    if( data[ k ] ) {
                        dataToSend[ k ] = data[ k ];
                    }
                });

                // Modify the lastModifiedOn attribute:
                if( isUpdateOp ) {
                    dataToSend.lastModifiedOn = Date.now();
                }

                _logger.info( "type: " + ( isUpdateOp ? "update" : "insert" ) + "; modelStore: " + modelStore + "; modelSchema: " + modelSchema + "; dataToSend:\n" + JSON.stringify( dataToSend, null, 4 ) );

                // db_operation:
                _firebase.getFirebaseDB().ref( modelStore )[ isUpdateOp ? "update" : "set" ]( dataToSend );

                return {
                    newData: dataToSend,
                    oldData: oldData,
                    isUpdateOp: isUpdateOp
                };
            })
            .catch( ( err ) => {
                _logger.error( "[" + err.code + "] " + err.message + " Email: " + data.email );
                return err;
            });
    }

    updateValue( modelLocation, newValue ) {
        let   _chain  = window.Promise.resolve( modelLocation );
        const _logger = new Logger( "DatabaseOperations.updateValue" );

        _logger.info( "modelLocation: " + modelLocation );

        // Handle username update:
        if( modelLocation.endsWith( "username") ) {
            _logger.info( "Username update detected, proceeding to update the root key" );

            let _usersRef = _firebase.getFirebaseDB().ref( "users/" );
            let _childRef = _usersRef.child( _utils.getKeyFromModelLocation( modelLocation ) );
            let _snapshot = null;

            _chain = _chain
                .then( () => {
                    _logger.info( "Chaining child ref update" );
                    return _childRef.once( "value" );
                })
                .then( ( snapshot ) => {
                    _snapshot = snapshot.val();

                    if( _snapshot.username === newValue ) {
                        _logger.info( "No update required since it is the same username" )
                        return modelLocation;
                    }

                    _logger.info( "Found this snapshot: " + JSON.stringify( _snapshot, null, 4 ) );
                    _logger.info( "New key: " + newValue );
                    _usersRef.child( newValue ).set( _snapshot );
                    _childRef.remove();
                    _logger.info( "Old modelLocation: " + modelLocation );
                    modelLocation = "users/" + newValue + "/username";
                    _logger.info( "New modelLocation: " + modelLocation );
                    return modelLocation;
                });
        }

        _logger.info( "Updating w/ val: " + newValue );

        return _chain
            .then( ( modelLocation ) => {
                _logger.info( "Updating at modelLocation: " + modelLocation );
                let _updates = {};
                _updates[ modelLocation ] = newValue;
                _updates[ modelLocation.substr( 0, modelLocation.lastIndexOf( "/" ) ) + "/lastModifiedOn" ] = Date.now();
                return _firebase.getFirebaseDB().ref().update( _updates );
            })
            .then( () => {
                _logger.info( "Updated successfully" );
                return { message: "success" };
            })
            .catch( ( err ) => {
                _logger.error( "[" + err.code + "] " + err.message );
                return err;
            });
    }

    remove( modelLocation ) {
        const _logger = new Logger( "DatabaseOperations.remove" );

        _logger.info( "modelLocation: " + modelLocation );

        return _firebase.getFirebaseDB().ref( modelLocation ).remove()
            .then( ()  => {
                _logger.info( "Removed data successfully" );
            })
            .catch( ( err ) => {
                _logger.error( "[" + err.code + "] " + err.message );
                return err;
            });
    }
}