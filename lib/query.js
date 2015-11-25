'use strict';

var pg = require( 'pg' );
var DB = process.env.DATABASE_URL;

module.exports = function query( q, values, cb ){
    pg.connect( DB, function ( error, client, done ){
        if( error ){
            console.error( 'Error running query ', q, values, error );
            return cb( error ); 
        }
        client.query( q, values, function( err, result ){
            done();

            if( err ){
                console.error( 'Error running query ', q, values, err );
                return cb( err );
            }
            else{
                return cb( null, result );
            }
        } );
    } );
};