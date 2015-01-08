var mysql      = require('mysql');

exports.connect = function(){
     var connection = mysql.createConnection({
          host     : 'us-cdbr-iron-east-01.cleardb.net',
          user     : 'b1d6e2f45de4e9',
          password : 'ee212855',
          database : 'heroku_b060aa6180054ee'
     });

     return connection;
};