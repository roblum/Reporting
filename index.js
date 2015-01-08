var express         = require('express');
var app             = express();
var sql_connect     = require('./controllers/sql_connection.js');
var DB              = require('./controllers/db_queries.js');
var cors            = require('cors');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.post('/report', cors(), function(request, response) {
     response.send('Hello World!');

     var connection = sql_connect.connect();
     var reqDomain  = request.query.domain

     DB.searchDB(reqDomain, connection);
});

app.listen(app.get('port'), function() {
     console.log("Node app is running at localhost:" + app.get('port'));
});


