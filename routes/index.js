'use strict';

var express = require('express');
var router = express.Router();

var marked = require( 'marked' );

//var users = require( '../lib/users' );
var diary = require( '../lib/entries' );

//var ensureLoggedIn = require( '../middleware/ensureLoggedIn' );

router.get( '/index', indexGet );
router.get( '/', indexGet );

module.exports = router;

function indexGet( req, res ){
    var data = { title: 'Forsíða' };
    if( req.session.user ){
        data.user = req.session.user;
    }    
    diary.getPublicEntries( function ( err, result ){
        if( result ){
            result.reverse();
            for( var i = 0; i < result.length; i++ ){
                var md = marked( result[i].text );
                result[i].md = md;
            }
            data.entries = result;
            data.marked = marked;
            res.render( 'index', data );
        }
        else{
            data.error = true;
            res.render( 'index', data );
        }
    } );
}