var express    = require('express');
var app        = express();
var mysql      = require('mysql');
var url        = require('url');

var connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-01.cleardb.net',
  user     : 'b1d6e2f45de4e9',
  password : 'ee212855',
  database : 'heroku_b060aa6180054ee'
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.post('/report', function(request, response) {
  response.send('Hello World!');
  // response.send(request);
  // console.log(request.query);
  // console.log(request.query);
  // response.send(url);
     connection.connect();
     var reqDomain = request.query.domain
     var insertion = 'INSERT into heroku_b060aa6180054ee.reporting(id, domain, count)' +
                    'VALUES (1,' + reqDomain + ', 2)';

     connection.query(insertion, function(err, result) {
          if (err) throw err;

     });

     connection.end();
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
