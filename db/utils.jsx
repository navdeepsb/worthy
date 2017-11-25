/**
 *   @desc A utility module containing various functions
 * @author Navdeep
 **/


export default class Utils {
    // Encrypts password into base64 format:
    encrypt( str ) {
        return window.btoa( str );
    }

    // Decrypts base64-encoded password:
    decrypt( str ) {
        return window.atob( str );
    }

    // Formats email address as a key:
    // formatEmailAsKey( "navdeepsb@example.com" ) = "navdeepsb(at)example(dot)com"
    formatEmailAsKey( email ) {
        return email.replace( new RegExp( /@/, "g" ), "(at)" ).replace( new RegExp( /\./, "g" ), "(dot)" );
    }

    // Extracts email from a model location:
    // getKeyFromModelLocation( "/users/navdeepsb(at)example(dot)com/username" ) =
    //     "navdeepsb(at)example(dot)com"
    getKeyFromModelLocation( modelLocation ) {
        var i1 = modelLocation.indexOf( '/' );
        var i2 = modelLocation.lastIndexOf( '/' );
        return modelLocation.substr( i1 + 1, i2 - i1 - 1 );
    }

    // Generates 11-character long unique identifier:
    getUniqueIdentifier() {
        return Date.now().toString( 16 );
    }

    // Returns the username from the email:
    getUsernameFromEmail( email ) {
        return email.split( "@" )[ 0 ];
    }
}