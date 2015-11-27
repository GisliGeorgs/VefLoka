'use strict';

var express = require('express');
var router = express.Router();

var users = require( '../lib/users' );
var diary = require( '../lib/entries' );
var validate = require( '../lib/validate' );

var ensureLoggedIn = require( '../middleware/ensureLoggedIn' );

router.get( '/user', ensureLoggedIn, userGet );
router.post( '/user', ensureLoggedIn, userPost );

module.exports = router;

function userGet( req, res ){
    var user = req.session.user;
    var data = { title: 'User', user: user };
    res.render( 'user', data );
}

function userPost( req, res ){    
    var username = req.session.user.username;
    var oPass = req.body.oPass;
    var nPass = req.body.pass;
    var nPass2 = req.body.pass2;
    var data = { title: 'Notandi', user: req.session.user };

    var results = [];
    var errors = [];
    var isRequired = validate.isRequired( oPass ) && 
                     validate.isRequired( nPass ) &&
                     validate.isRequired( nPass2 );
    var isLength = validate.isLength( nPass, 5 );
    results.push( {
        name: 'nýju lykilorðiðin eru ekki þau sömu eða þá að lengd þeirra er ekki næg.',
        result: isRequired && validate.isSame( nPass, nPass2 ) && isLength
    } );

    for( var i = 0; i < results.length; i++ ){
        console.log( results[i] );
        if( !results[ i ].result ){
            errors.push( results[ i ] );
        } 
    }                
    
    
    if( !errors.length ){
        users.auth( username, oPass, function ( err, user ){
            if( user ){
                users.changePass(username, nPass, function (err, status) {
                    if (err) {
                        console.log(err);
                    }
                    var success = true;
                    if (err || !success) {
                        success = false;
                    }
                    data.error = success
                    if( success ){
                        data.changed = true;
                    }
                    res.render('user', data);
                });
            }
            else{
                data.error = false;
                res.render( 'user', data );
            }
        } );            
    }
    else{
        data.errors = errors;
        data.error = false;
        res.render( 'user', data );
    }
}