'use strict';

var query = require( './query' );


var pg = require('pg');
var DB = process.env.DATABASE_URL;


module.exports.addEntry = function addEntry ( userID, title, text, cb ){
    /*var val = [ userID, title, text, new Date() ];
    var q = 'INSERT INTO diary ( "userID", title, text, date ) VALUES ( $1, $2, $3 )';

    query( q, val, function( err, result ){
        if( err ){
            return cb( err );
        }
        else{
            return cb( null, result );
        }
    } );*/
    pg.connect( DB, function ( error, client, done ){
        if( error ){
            console.error( 'Error running query ', q, val, error );
            return cb( error ); 
        }
        var val = [ userID, title, text, new Date() ];
        var q = 'INSERT INTO diary ( "userID", title, text, date ) VALUES ( $1, $2, $3, $4 )';
        client.query( q, val, function( err, result ){
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
};

module.exports.getEntries = function getEntries( limit, userID, cb ){
    //var val = [ limit ];
    //var q = 'SELECT text, date FROM diary LIMIT %1';
    /*var q = 'SELECT text, date FROM diary';
    query( q, , function ( err, result ){
        if (err) {
            return cb(err);
        }
        else {
            return cb( null, result.rows );
        }
    } );*/  
    pg.connect(DB, function (error, client, done) {
        if (error) {
          return cb(error);
        }
        var val = [ userID ];
        var q = 'SELECT * FROM diary WHERE "userID" = $1';
        client.query(q, val, function (err, result) {
            done();
            if (err) {
                return cb(err);
            } 
            else {
                return cb(null, result.rows);
            }
        });
    });
};

module.exports.getEntry = function getEntry( userID, postID, cb ){
    pg.connect( DB, function ( error, client, done ){
        if (error) {
          return cb(error);
        }
        var val = [ postID, userID ];
        var q = 'SELECT * FROM diary WHERE id = $1 AND "userID" = $2';
        client.query( q, val, function ( err, result ) {
            done();
            if( err ){
                return cb( err );
            }
            else{
                return cb( null, result.rows );
            }
        });
    });
};

module.exports.deleteEntry = function deleteEntry( userID, postID, cb ){
    pg.connect( DB, function ( error, client, done ){
        if( error ) {
            return cb( error );
        }
        // þarf að hafa userID, postID
        var val = [ postID ];
        var q = 'DELETE FROM diary WHERE id = $1';
        client.query( q, val, function ( err, result ) {            
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
};

module.exports.updateEntry = function updateEntry( userID, postID, title, text, cb ){
    pg.connect( DB, function ( error, client, done ){
        if( error ) {
            return cb( error );
        }
        // þarf að hafa userID, postID
        var val = [ title, text, new Date(), postID ];
        var q = 'UPDATE diary SET title = $1, text = $2, date = $3 WHERE id = $4'; 
        client.query( q, val, function( err, result ){
            done();
            if( err ){
                return cb( err );
            }
            else{
                return cb( null, result );
            }
        } );
    } );
};