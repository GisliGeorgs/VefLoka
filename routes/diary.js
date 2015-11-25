'use strict';

var express = require( 'express' );
var router = express.Router();

var diary = require( '../lib/diary' );

var ensureLoggedIn = require( '../middleware/ensureLoggedIn' );

router.get( '/', ensureLoggedIn, diaryIndex );
router.post( '/post', ensureLoggedIn, diaryPost );

function diaryIndex( req, res ){
    diary.getEntries( 10, function( err, result ){
        var error = err;
        var items = result.rows;
        var data = { items: items,
                     error: error,
                     form: diaryPost
                   };
        res.render( 'diary', data );
    } );
} 

function diaryPost( req, res ){
    var i = 0;
}

module.exports = router;