'use strict';

var express = require('express');
var router = express.Router();

var users = require( '../lib/users' );
var diary = require( '../lib/entries' );

var ensureLoggedIn = require( '../middleware/ensureLoggedIn' );

router.get( '/index'/*, ensureLoggedIn*/, indexGet );
router.get( '/'/*, ensureLoggedIn*/, indexGet );

module.exports = router;

function index( req, res ){
    var data = { title: 'Forsíða' };    
    if( req.session.user ){
        data.user = req.session.user;
        res.render( 'index', data );
    }
    else{
        res.render( 'index', data );
    }
}

function indexGet( req, res ){
    var data = { title: 'Forsíða' };
    if( req.session.user ){
        data.user = req.session.user;
    }    
    diary.getPublicEntries( function ( err, result ){
        if( result ){
            data.entries = result;
            res.render( 'index', data );
        }
        else{
            data.error = true;
            res.render( 'index', data    )
        }
    } );
}