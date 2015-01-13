var mysql      = require('mysql');
var SQL_HOST   = process.env.SQL_HOST;
var SQL_USER   = process.env.SQL_USER;
var SQL_PASS   = process.env.SQL_PASS;
var SQL_DB     = process.env.SQL_DB;

exports.connect = function(){
     var connection = mysql.createConnection({
          host     : SQL_HOST,
          user     : SQL_USER,
          password : SQL_PASS,
          database : SQL_DB
     });

     return connection;
};
