'use strict';

var express = require('express');
var router = express.Router();

var marked = require( 'marked' );

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
            //var md = [];
            for( var i = 0; i < result.length; i++ ){
                var md =  marked( result[i].text );
                result[i].push( md );
                console.log( result[i] );
            }
            data.entries = result;
            data.marked = marked;
            //data.md = md;
            res.render( 'index', data );
        }
        else{
            data.error = true;
            res.render( 'index', data );
        }
    } );
}