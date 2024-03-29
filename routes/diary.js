'use strict';

var express = require( 'express' );
var router = express.Router();

var xss = require( 'xss' );

//var users = require( '../lib/users' );
var diary = require( '../lib/entries' );

var ensureLoggedIn = require( '../middleware/ensureLoggedIn' );

router.get( '/diary', ensureLoggedIn, diaryGet );
router.post( '/diary', ensureLoggedIn, diaryPost );

module.exports = router;

function diaryPost( req, res ){
    var userID = req.session.user.id;
    var title = xss(req.body.title);
    var text = xss(req.body.text);
    var publicEntry = req.body.public;
    var user = req.session.user;
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
        result.reverse();
        var data = { title: 'Dagbók', user: user, entries: result };
        res.render( 'diary', data );
    } );
} 