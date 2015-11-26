'use strict';

var validate = module.exports;

validate.isEmail = function ( email ){
    // a@b.c
    // 01234
    if ( email.indexOf( '@' ) > 0 ) {
        if ( email.indexOf( '.' ) > 2 ) {
            return true;
        }
    }
    return false;	
}

validate.isRequired = function ( s ) {
    return ( s ) ? true : false;
};

validate.isLength = function ( s, n ) {
    return ( s.length >= n ) ? true : false;
};

validate.isSame = function( a, b ){
    return a.localeCompare( b );
};