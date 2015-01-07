var express = require('express');
var app = express();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-01.cleardb.net',
  user     : 'b1d6e2f45de4e9',
  password : 'ee212855',
  database : 'heroku_b060aa6180054ee'
});

connection.connect();

connection.query('SELECT * FROM heroku_b060aa6180054ee.test', function(err, result) {
     if (err) throw err;

     console.log(result);
});

connection.end();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
