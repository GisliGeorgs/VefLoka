'use strict';

var express = require( 'express' );
var router = express.Router();

var users = require( '../lib/users' );
var diary = require( '../lib/entries' );

var ensureLoggedIn = require( '../middleware/ensureLoggedIn' );

router.get( '/diary', ensureLoggedIn, diaryGet );
router.post( '/diary', ensureLoggedIn, diaryPost );

module.exports = router;

function diaryPost( req, res ){
    var userID = req.session.user.id;
    var title = req.body.title;
    var text = req.body.text;
    var publicEntry = req.body.public;
    var user = req.session.user;
    //var data = [ userID, title, text, user ];
    //console.log( data );
    diary.addEntry( userID, title, text, publicEntry, function ( err, result ){
        if( result ){
            res.redirect( '/diary' );
        }
        else{
            var data = { title: 'Dagbók', user: user, error: true };
            res.render( 'diary', data );
        }
    } );
}

function diaryGet( req, res ){
    var user = req.session.user;
    diary.getEntries( 10, user.id, function ( err, result ){
        var data = { title: 'Dagbók', user: user, entries: result };
        res.render( 'diary', data );
    } );
} 