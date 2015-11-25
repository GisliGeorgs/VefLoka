'use strict';

var express = require('express');
var router = express.Router();

var users = require( '../lib/users' );
var diary = require( '../lib/entries' );

var ensureLoggedIn = require( '../middleware/ensureLoggedIn' );

router.get( '/entry', ensureLoggedIn, entry );
router.post( '/delete', ensureLoggedIn, entryDelete );
router.post( '/update', ensureLoggedIn, entryUpdate );



module.exports = router;

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
}
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
}

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
}