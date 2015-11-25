'use strict';

var express = require('express');
var router = express.Router();

var users = require( '../lib/users' );
var diary = require( '../lib/entries' );

var ensureLoggedIn = require( '../middleware/ensureLoggedIn' );

router.get( '/index', ensureLoggedIn, index );
router.get( '/', ensureLoggedIn, index );

module.exports = router;

function index( req, res ){    
    if( req.session.user ){
        var data = { title: 'Forsíða', user: req.session.user };
        res.render( 'index', data );
    }
    else{
        res.redirect( '/login' );
    }
}