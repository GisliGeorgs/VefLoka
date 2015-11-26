'use strict';

var express = require('express');
var router = express.Router();

var users = require( '../lib/users' );
var diary = require( '../lib/entries' );
var validate = require( '../lib/validate' );

var ensureLoggedIn = require( '../middleware/ensureLoggedIn' );

router.get( '/login', redirectIfLoggedIn, login );
router.post( '/login', loginHandler );
router.get( '/logout', logout );
router.get( '/register', createForm );
router.post( '/register', createHandler );
/*
router.get( '/index', ensureLoggedIn, index );
router.get( '/', ensureLoggedIn, index );
*/
/*
router.get( '/diary', ensureLoggedIn, diaryGet );
router.post( '/diary', ensureLoggedIn, diaryPost );*/
/*
router.get( '/entry', ensureLoggedIn, entry );
router.post( '/delete', ensureLoggedIn, entryDelete );
router.post( '/update', ensureLoggedIn, entryUpdate );*/
/*
router.get( '/user', ensureLoggedIn, userGet );
router.post( '/user', ensureLoggedIn, userPost );
*/

module.exports = router;

function createForm( req, res, next ){
    var data = { title: 'Nýskráning' };
    res.render( 'register', data );
}

function createHandler( req, res, next ){
    var user = req.body.user;
    var pass = req.body.pass;
    
    var results = [];
    var errors = [];
    
    results.push( { 
        name: 'Notendanafn',
        value: user,
        result: validate.isLength( user, 3 ) &&
                validate.isRequired( user )
    } );
    results.push( {
        name: 'Lykilorð',
        value: pass,
        result: validate.isLength( pass, 5 ) &&
                validate.isRequired( pass )        
    } );
    for( var i = 0; i < results.length; i++ ) {
        if( !results[ i ].result ){
            errors.push( results[ i ] );
        }
    }
    var data = { title: 'Nýskráning' };
    
    if( errors.length ){        
        // hér vantar villumeðhöndlun
        users.createUser( user, pass, function( err, status ){
            if( err ){
                console.error( err );
            }
            var success = true;
            if( err || !status ){
                success = false;
            }
            var data = { title: 'Nýskráning', post: true, success: success };
            res.render( 'register', data );
        } );
    }
    else{
        data.errors = errors;
        res.render( 'register', data );
    }
}

function redirectIfLoggedIn( req, res, next ){
    if( req.session.user ){
        res.redirect( '/diary' );
    }
    else{
        next();
    }
} 

function login( req, res, next ){
    var data = { title: 'Innskráning' };
    res.render( 'login', data );
}

function loginHandler( req, res, next ){
    var username = req.body.user;
    var password = req.body.pass;
    console.log('Userinn er ', username);
    
    var results = [];
    var errors = [];
    results.push( {
        name: 'Notendanafn',
        value: username,
        result: validate.isLength( username, 3 ) && 
                validate.isRequired( username )
    } );
    results.push( {
        name: 'Lykilorð',
        value: password,
        result: validate.isLength( password, 5 ) &&
                validate.isRequired( password )
    } );
    
    for( var i = 0; i < results.length; i++ ){
        if( !results[ i ].result ){
            errors.push( results[ i ] );
        } 
    }
    var data = { title: 'Innskráning', username: username };

    if( errors.length ){
        users.auth(username, password, function (err, user) {
            if ( user ) {
                req.session.regenerate(function (){
                    req.session.user = user;
                    res.redirect( '/index' );
                });
            } 
            else {
                data.error = true;
                res.render('login', data);
            }
        });        
    }
    else{
        data.errors = errors;
        data.error = true;
        res.render( 'login', data );        
    }
}

function logout( req, res, next ){
    req.session.destroy( function(){
        res.redirect( '/' );
    } );
}