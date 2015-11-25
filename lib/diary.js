'use strict';

module.exports.add = function addEntry( user, title, text /* eh meira */ ){
    var val = [ user, title, text ];
    // vantar töflunöfn og schema fyrir töflurnar.
    var query = 'INSERT INTO entries( "userID", title, text, date ) ' +
            'VALUES ( $1, $2, $3, $4)' ;
    
};