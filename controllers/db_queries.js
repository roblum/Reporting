exports.searchDB = function(reqDomain, connection, table){
     var select = 'SELECT id FROM heroku_b060aa6180054ee.' + table + ' WHERE Domain = "' + reqDomain + '"'

     connection.query(select, function(err, result) {
          if (err) throw err;
          console.log('result', result);

          if (!result[0]){
               console.log('no results');
               writeToDB(reqDomain, connection, table);
          } else {
               var id = result[0].id;
               console.log('increment result');
               increment(reqDomain, connection, table, id);
          }
     });
}

function writeToDB(reqDomain, connection, table){
     var insertion = 'INSERT into heroku_b060aa6180054ee.' + table + ' (domain, count) VALUES ("' + reqDomain + '", 1)';

     connection.query(insertion, function(err, result){
          if (err) throw err;

          connection.end();
     });
}

function increment(reqDomain, connection, table, id){
     var update = 'UPDATE ' + table + ' SET Count = Count + 1 WHERE id = ' + id

     connection.query(update, function(err, result){
          if (err) throw err;

          connection.end();
     });
}