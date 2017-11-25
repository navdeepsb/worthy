/**
 *   @desc A logger module for debugging
 * @author Navdeep
 * @usage  let myAwesomeLogger = new Logger( "awesome-logger" );
 *         myAwesomeLogger.info( "Started..." );
 *         myAwesomeLogger.error( "Whoah!" );
 *         myAwesomeLogger.debug( "Just checkin'" );
 * #proud #gooddev #happydev #highdev
 **/


// Config constants:
const LOG_TYPES  = [ "info", "error", "debug" ];
const IS_ENABLED = true;

// Le classe:
export default class Logger {
    constructor( moduleName ) {
        this.moduleName = moduleName;

        // Bind dynamic functions to the instance:
        LOG_TYPES.forEach( ( type ) => {
            this[ type ] = ( message ) => {
                return this._baseFn.bind( this, type )( message );
            }
        });
    }

    _baseFn( logType, message ) {
        // Date format:
        const d = new Date();
        const t = d.getFullYear() + "/" + ( d.getMonth() + 1 ) + "/" + d.getDate() + " " + d.toTimeString().substr( 0, 8 );

        // Check and log:
        if( IS_ENABLED && message ) {
            // Handle JSON objects:
            message = typeof message === "object" ? JSON.stringify( message, null, 4 ) : message;

            // #LOG
            console.log( `${ t } [${ this.moduleName }/${ logType }] ${ message }` );
        }
    }
}

// #awesome