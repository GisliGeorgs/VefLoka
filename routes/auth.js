'use strict';

var express = require('express');
var router = express.Router();

var users = require( '../lib/users' );
var diary = require( '../lib/entries' );

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

    users.auth(username, password, function (err, user) {
        if ( user ) {
            req.session.regenerate(function (){
                req.session.user = user;
                res.redirect( '/index' );
            });
        } 
        else {
            var data = { title: 'Innskráning', 
                         username: username, 
                         error: true };
            res.render('login', data);
        }
    });
}

function logout( req, res, next ){
    req.session.destroy( function(){
        res.redirect( '/' );
    } );
}

/* Sjá /router/index.js
function index( req, res ){    
    if( req.session.user ){
        var data = { title: 'Forsíða', user: req.session.user };
        res.render( 'index', data );
    }
    else{
        res.redirect( '/login' );
    }
}
*/
/* Sjá /router/diary.js
function diaryPost( req, res ){
    var userID = req.session.user.id;
    var title = req.body.title;
    var text = req.body.text;
    var user = req.session.user;
    //var data = [ userID, title, text, user ];
    //console.log( data );
    diary.addEntry( userID, title, text, function ( err, result ){
        if( result ){
            res.redirect( '/diary' );
        }
        else{
            var data = { title: 'Dagbók', user: user, error: true };
            res.render( 'diary', data );
        }
    } );
}
*/
/* Sjá /router/diary.js
function diaryGet( req, res ){
    var user = req.session.user;
    diary.getEntries( 10, user.id, function ( err, result ){
        var data = { title: 'Dagbók', user: user, entries: result}
        res.render( 'diary', data );
    } );
} */
/* Sjá /routes/entry.js
function entry( req, res ){
    var user = req.session.user;
    var id = req.query.id;
    diary.getEntry( user.id, id, function ( err, result ){
        if( result ){
            var data = { title: id, user: user, id: id, entry: result[0] };
            res.render( 'entry', data );
        }
        else{
            res.redirect( '/diary' );
        }
    } );
}*/
/* Sjá /routes/entry.js
function entryDelete( req, res ){
    var user = req.session.user;
    var id = req.query.id;
    diary.deleteEntry( user.id, id, function ( err, result ){
        if( result ){
            console.log( 'Eyðing gagna tókst.' );
            res.redirect( '/diary' );
        }
        else{
            console.log( 'Villa kom upp við eyðingu gagnsins.' );
            var data = { title: 'Færsla', errorDel: true };
            res.redirect( '/entry?id=' + id, data );
        }
    } );
}*/
/* Sjá /routes/entry.js
function entryUpdate( req, res ){
    var user = req.session.user;
    var id = req.query.id;
    var title = req.body.title;
    var text = req.body.text;
    diary.updateEntry( user.id, id, title, text, function ( err, result ){
        if( result ){
            console.log( 'Breyting gagna tókst.' );
            res.redirect( '/diary' );
        }
        else{            
            var data = { title: 'Færsla', errorUp: true };
            res.render( '/entry?id=' + id, data );
        }
    } );
}*/
/* Sjá /routes/user.js
function userGet( req, res ){
    var user = req.session.user;
    var data = { title: 'User', user: user };
    res.render( 'user', data );
}
*/
/* Sjá /routes/user.js
function userPost( req, res ){    
    var username = req.session.user.username;
    var oPass = req.body.oPass;
    var nPass = req.body.pass;
    var nPass2 = req.body.pass2;
    if( nPass !== nPass2 ){
        var data = { title: 'Notnadi', success: false };  
        res.render( 'user', data );
    }  
    else{
*/
    /*
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
/*
        users.auth( username, oPass, function ( err, user ){
            if( user ){
                users.changePass( username, nPass, function ( err, status ){
                    if( err ){
                        console.log( err );
                    }
                    var success = true;
                    if(  err || !success ){
                        success = false;
                    }
                    var data = { title: 'Notandi', success: success, user: user };
                    res.render( 'user', data );
                } )
            }
            else{
                var data = { title: 'Notnadi', success: false, user: req.session.user };
                res.render( 'user', data );
            }
        } );
    }
}*/