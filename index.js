var express         = require('express');
var app             = express();
var sql_connect     = require('./modules/sql_connection.js');
var DB              = require('./modules/db_queries.js');
var cors            = require('cors');

app.use(cors());

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
     res.send('Opop');
});

app.post('/report', function(request, response) {
     response.send('Hello World!');

     var connection = sql_connect.connect();
     console.log("request");
     console.log(request);
     console.log("request headers");
     console.log(request.headers);
     var reqDomain  = (request.query.domain === 'offerpop.com') ? request.headers.referer : request.query.domain;
     var version    = request.query.version

     DB.searchDB(reqDomain, connection, version);
});

app.listen(app.get('port'), function() {
     console.log("Node app is running at localhost:" + app.get('port'));
});


