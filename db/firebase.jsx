/**
 *   @desc This module controls the app's Firebase instance
 * @author Navdeep
 **/


// Import dependencies:
import DB_CONFIG from "db/_config";
import firebase from "firebase";

// Import logger:
import Logger from "_/logger";

// Some class variables:
let app  = null;
let db   = null;
let auth = null;
let isInitialized = false;

export default class Firebase {
    init( cb ) {
        this._logger = new Logger( "firebase.init" );

        if( !isInitialized ) {
            // Set up logging:

            app  = firebase.initializeApp( DB_CONFIG );
            db   = app.database();
            auth = app.auth();

            // Set up the auth persistence:
            const PERSISTENCE_TYPE = firebase.auth.Auth.Persistence.SESSION; // SESSION, LOCAL, NONE
            auth.setPersistence( PERSISTENCE_TYPE );
            this._logger.info( "Setting-up auth persistence as '" + PERSISTENCE_TYPE + "'" );

            // Set up the callback fn to auth state changed event:
            if( cb && typeof cb === "function" ) {
                auth.onAuthStateChanged( cb );
            }

            isInitialized = true;
            this._logger.info( "Firebase initialized..." );
        }
    }

    getFirebaseApp() {
        return app;
    }

    getFirebaseAuth() {
        return auth;
    }

    getFirebaseDB() {
        return db;
    }
}