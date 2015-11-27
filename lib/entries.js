'use strict';

var pg = require('pg');
var DB = process.env.DATABASE_URL;

module.exports.addEntry = function addEntry ( userID, title, text, publicEntry, cb ){
    pg.connect( DB, function ( error, client, done ){
        if( error ){
            console.error( 'Error running query ', q, val, error );
            return cb( error ); 
        }
        var val = [ userID, title, text, publicEntry, getCorrectTimeFormat() ];
        var q = 'INSERT INTO diary ( "userID", title, text, public, date ) VALUES ( $1, $2, $3, $4, $5 )';
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
        // þarf að hafa userID, postID?
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

module.exports.updateEntry = function updateEntry( userID, postID, title, text, publicEntry, cb ){
    pg.connect( DB, function ( error, client, done ){
        if( error ) {
            return cb( error );
        }
        // þarf að hafa userID, postID?
        var val = [ title, text, publicEntry, new Date(), postID ];
        var q = 'UPDATE diary SET title = $1, text = $2, public = $3, date = $4 WHERE id = $5'; 
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

module.exports.getPublicEntries = function getPublicEntries( cb ){
    pg.connect( DB, function( error, client, done ){
        if( error ){
            return cb( error );
        }
        var limit = 10;
        var val = [ limit ];
        var q = 'SELECT * FROM diary WHERE public = TRUE LIMIT $1';
        client.query( q, val, function( err, result ){
            done();
            if( err ){
                return cb( err );
            }
            else{
                console.log( 'public entries: ' + result.rows );
                return cb( null, result.rows );
            }
        } );
    } ) ; 
};

function getCorrectTimeFormat() {
    var dagsetning = new Date();
    var dagur;
    var manudur;
    var klst;
    var min;
    if (dagsetning.getDate() < 10) {
        dagur = "0" + dagsetning.getDate();
    }
    else {
        dagur = dagsetning.getDate();
    }
    if (dagsetning.getMonth() < 10) {
        manudur = "0" + dagsetning.getMonth();
    }
    else {
        manudur = dagsetning.getMonth();
    }
    if (dagsetning.getHours() < 10) {
        klst = "0" + dagsetning.getHours();
    }
    else {
        klst = dagsetning.getHours();
    }
    if (dagsetning.getMinutes() < 10) {
        min = "0" + dagsetning.getMinutes();
    }
    else {
        min = dagsetning.getMinutes();
    }
    var ar = dagsetning.getFullYear();
    var temp = parseInt(manudur);
    temp += 1;
    manudur = temp.toString();
    return dagur + "." + manudur + "." + ar + " " + klst + ":" + min;
}