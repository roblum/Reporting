var express         = require('express');
var app             = express();
var sql_connect     = require('./controllers/sql_connection.js');
var DB              = require('./controllers/db_queries.js');
var cors            = require('cors');

// var forceSsl = function(req, res, next) {
//    if (req.headers['x-forwarded-proto'] !== 'https') {
//        return res.redirect(['https://', req.get('Host'), req.url].join(''));
//    }
//    return next();
// };

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(cors());
// app.use(forceSsl);

app.get('/', function(req, res){
     res.send('Opop');
});

app.post('/report', function(request, response) {
     response.send('Hello World!');

     var connection = sql_connect.connect();
     var reqDomain  = request.query.domain
     var version    = request.query.version

     DB.searchDB(reqDomain, connection, version);
});

app.listen(app.get('port'), function() {
     console.log("Node app is running at localhost:" + app.get('port'));
});

