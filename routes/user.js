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
        
    results.push( {
        name: 'nýju lykilorðiðin eru ekki þau sömu',
        result: isRequired && validate.isSame( nPass, nPass2 )
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
                    data.success = success;
                    res.render('user', data);
                });
            }
            else{
                data.success = false;
                res.render( 'user', data );
            }
        } );            
    }
    else{
        data.errors = errors;
        data.success = false;
        res.render( 'user', data );
    }
}