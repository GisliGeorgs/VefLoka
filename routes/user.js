'use strict';

var express = require('express');
var router = express.Router();

var users = require( '../lib/users' );
var diary = require( '../lib/entries' );

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
    if( nPass !== nPass2 ){
        var data = { title: 'Notnadi', success: false };  
        res.render( 'user', data );
    }  
    else{/*
        users.changePass( user, oPass, nPass, function ( err, status ){
            if( err ){
                console.log( err );
            }
            var success = true;
            if(  err || !success ){
                success = false;
            }
            var data = { title: 'User', success: success, user: user };
            res.render( 'user', data );
        } );*/
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
                    var data = { title: 'Notandi', success: success, user: user };
                    res.render('user', data);
                });
            }
            else{
                var data = { title: 'Notnadi', success: false, user: req.session.user };
                res.render( 'user', data );
            }
        } );
    }
}