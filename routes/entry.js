'use strict';

var express = require('express');
var router = express.Router();

var xss = require( 'xss' ); 

//var users = require( '../lib/users' );
var diary = require( '../lib/entries' );

var ensureLoggedIn = require( '../middleware/ensureLoggedIn' );

router.get( '/entry', ensureLoggedIn, entry );
router.post( '/delete', ensureLoggedIn, entryDelete );
router.post( '/update', ensureLoggedIn, entryUpdate );

module.exports = router;

function entry( req, res ){
    var user = req.session.user;
    var id = req.query.id;
    var data = { title: id, user: user, id: id };
    if( Object.keys(req.query).length === 2 ){
           data.errorUp = true;
    }
    diary.getEntry( user.id, id, function ( err, result ){
        if( result ){
            data.entry = result[0];
            res.render( 'entry', data );
        }
        else{
            res.redirect( '/diary' );
        }
    } );
}
function entryDelete( req, res ){
    var user = req.session.user;
    var id = req.query.id;
    diary.deleteEntry( user.id, id, function ( err, result ){
        if( result ){
            res.redirect( '/diary' );
        }
        else{
            var data = { title: 'Færsla', errorDel: true };
            res.redirect( '/entry?id=' + id, data );
        }
    } );
}

function entryUpdate( req, res ){
    var user = req.session.user;
    var id = req.query.id;
    var title = xss(req.body.title);
    var text = xss(req.body.text);
    var publicEntry = req.body.publicC;
    diary.updateEntry( user.id, id, title, 
                       text, publicEntry, 
                       function ( err, result ){
        if( result ){
            res.redirect( '/diary' );
        }
        else{       
            res.redirect( '/entry?id=' + id + '&uperror=true' );
        }
    } );
}
