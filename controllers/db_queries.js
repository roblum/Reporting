exports.searchDB = function(reqDomain, connection){
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