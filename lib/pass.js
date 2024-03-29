'use strict';

var crypto = require('crypto');

var len = 128;

var iterations = 12000;

exports.hash = function( pass, salt, fn ){
    if( arguments.length === 3 ){
        crypto.pbkdf2( pass, salt, iterations, len, function( err, hash ){
            fn( err, hash.toString( 'base64' ));
        } );
    }
    else{
        fn = salt;
        crypto.randomBytes( len, function( err, salt ){
            if( err ){
                return fn( err );
            }
            salt = salt.toString( 'base64');
            crypto.pbkdf2( pass, salt, iterations, len, function( err, hash ){
                if( err ){
                    return fn( err );
                }
                fn( null, salt, hash.toString( 'base64' ) );
            } );
        } );
    }
};