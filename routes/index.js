var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/error', function(req, res){
  // Caught and passed down to the errorHandler middleware
  throw new Error('borked!');
});
/*
var diary = require('../lib/diary');

router.get( '/', checkAuth, diaryIndex );


function diaryIndex( req, res ){
    //data = get data...
    diary.getEntries
    data = {}
    res.render( 'diary', data )
}

router.post( 'login', function( req, res ){
    var post = req.body;
} )
*/

module.exports = router;
