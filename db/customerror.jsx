export default class CustomError extends Error {
    constructor( errCode, ...params ) {
        super( ...params );

        if( Error.captureStackTrace ) {
            Error.captureStackTrace( this, CustomError );
        }

        this.code = errCode;
    }
}