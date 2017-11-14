$( "#title" ).text( "Worthy" );

// Initialize Firebase
firebase.initializeApp( window.FIREBASE_CONFIG ); // from `_dbconfig.js`
window.firebaseDb = firebase.database(); // Cache the db reference

var auth = window.firebaseAuth = firebase.auth();

var eml = "navdeep@example.com";
var pwd = "pass@1234";
var promise = null;
var promise2 = null;

// promise = auth.signInWithEmailAndPassword( eml, pwd ); // returns a user in a promise
// promise.catch( function( e ) { console.log( e.message );});

// promise2 = auth.createUserWithEmailAndPassword( eml, pwd ); // also logs the user in, resolves only one time, firebase doesn't validate the email format
// promise2.then( function( obj ) { console.log( obj );} );
// promise2.catch( function( e ) { console.log( e.message );});

var cb = function( firebaseUser ) {
    // `firebaseUser` will be null if user logs out
    // todo...
    if( firebaseUser ) {
        console.log( firebaseUser );
    }
    else {
        console.log( "User logged out!" );
    }
};
// auth.onAuthStateChanged( cb ); // cb calls every time the auth state changes


// window.firebase.auth().onAuthStateChanged( cb )


var modelStore = "users/";
var usersRef = window.firebaseDb.ref( modelStore );
var data = {
    _key: "",
    fname: "Navdeep",
    lname: "Bagga",
    username: "navdeepsb",
    email: "navdeepsb@example.com",
    password: "abc@1234"
};
var childRef   = usersRef.child( data._key || "-empty-" );
// var oldData    = childRef.val(); // will be `null` if not found
// var isUpdateOp = childRef.exists();

data._key = usersRef.push().key;
// data._key = isUpdateOp ? data._key : usersRef.push().key;

window.firebaseDb.ref( modelStore + "/" + data._key ).update( data );

// var retVal = {
//     newData: data,
//     oldData: oldData,
//     isUpdateOp: isUpdateOp
// };
console.log( "[$]", JSON.stringify( data, null, 4 ) );