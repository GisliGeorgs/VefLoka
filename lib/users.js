'use strict';

var hash = require( '../lib/pass' ).hash;
//var query = require( './query' );

var pg = require( 'pg' );
var DB = process.env.DATABASE_URL;

function createUserWithHashSalt( user, salt, hash, cb ){  
    //Breyta þessu?
    /*query( q, val, function( err ){
        if( err ){
            return cb( err );
        }
        else{
            return cb( null, true );
        }
    } );*/
    pg.connect( DB, function ( error, client, done ){
        if( error ) {
            return cb( error );
        }
        var val = [ user, salt, hash, new Date()];
        var q = 'INSERT INTO users ( username, salt, hash, date ) VALUES ($1, $2, $3, $4)';
        client.query( q, val, function ( err, result ){
            done();
            if( err ){
                console.error( 'Error running query ', q, val, err );
                return cb( err );
            }
            else{
                return cb( null, result );
            }
        } );
    } );
}

function findUser( user, cb ){
    /*query( q, val, function( err, result ){
        if( err ){
            return cb( err ); 
        }
        else{
            return cb( null, result.rows );
        }
    })*/
    /*console.log( 'finduser 1' );
    pg.connect( DB, function ( error, client, done ){
        if( error ) {
            return cb( error );
        }
        var val = [ user ];
        console.log( 'finduser 2' );
        var q = 'SELECT id, username, salt, hash FROM users WHERE username = $1';
        client.query( q, val, function ( err, result ){
            done();
            console.log( 'finduser 3' );
            if( err ){
                console.error( 'Error running query ', q, val, err );
                return cb( err );
            }
            else{
                console.log( 'finduser 4' );
                return cb( null, result );
            }
        } );
    } );*/
    pg.connect(DB, function (error, client, done) {
        if (error) {
            return cb(error);
        }
        var values = [ user ];
        var query = 'SELECT id, username, salt, hash FROM users WHERE username = $1';
        client.query(query, values, function (err, result) {
            done();
            if (err) {
                return cb(error);
            } 
            else {
                return cb(null, result.rows);
            }
        });
    });    
}

module.exports.createUser = function createUser( user, pass, cb ){
    hash( pass, function ( err, salt, hash ){
        if( err ){
            return cb( err );
        }
        createUserWithHashSalt( user, salt, hash, cb );
    } );
};

module.exports.auth = function auth (name, pass, fn) {
    findUser(name, function (err, result) {
        var user = null;
        if (result.length === 1) {
            user = result[0];
        }
        if (!user) {
            return fn(new Error('cannot find user'));
        }
        hash(pass, user.salt, function (err, hash){
            if (err) {
                return fn(err);
            }
      
            if (hash === user.hash) {
                return fn(null, user);
            }

            fn(new Error('invalid password'));
        });
    });
};

module.exports.changePass = function changePass( name, newP, cb ){
    hash( newP, function ( err, salt, hash ){
        if( err ){
            return cb( err );
        }
        changeUserWithHashSalt( name, salt, hash, cb );
    } );
    /*findUser( name, function ( err, result ){
        var user = null;
        if( result.length === 1 ){
            user = result[0];
        }
        if( !user ){
            return fn( new Error( 'cannot find user' ) );
        }
        hash( oldP, user.salt, function ( err, hash ){
            if( err ){
                return fn( err );
            }
            if( hash === user.hash ){
                hash( newP, function( err, salt, hash ){
                    if( err ){
                        return cb( err );
                    }
                    changeUserWithHashSalt( user, salt, hash, cb );
                } );          
            }
            fn( new Error( 'invalid password' ) );
        } );
    } );*/
};

function changeUserWithHashSalt( user, salt, hash, cb ){
    pg.connect( DB, function ( error, client, done ){     
        if( error ){
            return cb( error );
        }
        var val = [ salt, hash, user ];
        var q = 'UPDATE users SET salt = $1, hash = $2 WHERE username = $3';   
        client.query( q, val, function ( err, result ){
            done();
            if( err ){
                return cb( err );
            }
            else{
                return cb( null, result );
            }
        } );
    } );
}
