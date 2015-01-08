var express         = require('express');
var app             = express();
var sql_connect     = require('./sql_connection.js');
var cors            = require('cors');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.post('/report', cors(), function(request, response) {
     response.send('Hello World!');

     var connection = sql_connect.connect();
     var reqDomain = request.query.domain

     searchDB(reqDomain, connection);
});

function searchDB(reqDomain, connection){
     var select = 'SELECT id FROM heroku_b060aa6180054ee.reporting WHERE Domain = "' + reqDomain + '"'

     connection.query(select, function(err, result) {
          if (err) throw err;
          console.log('result', result);

          if (!result[0]){
               console.log('no results');
               writeToDB(reqDomain, connection);
          } else {
               var id = result[0].id;
               console.log('increment result');
               increment(reqDomain, connection, id);
          }
     });
}

function writeToDB(reqDomain, connection){
     var insertion = 'INSERT into heroku_b060aa6180054ee.reporting(domain, count) VALUES ("' + reqDomain + '", 1)';

     connection.query(insertion, function(err, result){
          if (err) throw err;

          connection.end();
     });
}

function increment(reqDomain, connection, id){
     var update = 'UPDATE reporting SET Count = Count + 1 WHERE id = ' + id

     connection.query(update, function(err, result){
          if (err) throw err;

          connection.end();
     });
}

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


