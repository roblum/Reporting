var AWS             = require('aws-sdk');
var S3_key          = process.env.S3_KEY;
var S3_secret       = process.env.S3_SECRET;
var S3_bucket       = process.env.S3_BUCKET;
var sql_connect     = require('./modules/sql_connection.js');
var DB              = require('./modules/db_queries.js');

AWS.config.update({
               accessKeyId: S3_key,
               secretAccessKey: S3_secret,
          });

var s3              = new AWS.S3();
var date            = new Date().toDateString().replace(/\s/g, '_');

var connection = sql_connect.connect();
// DB.reportsDB(connection, 'version1', s3Upload)
DB.reportsDB(connection, 'version2', s3Upload)

function s3Upload(result){
     var body = JSON.stringify(result);

     var params = {
          Bucket: S3_bucket,
          Body: body,
          Key: 'roblum/Content_API/reports/' + date + '.json',
     }

     s3.upload(params, function(err, data){
          if (err){
               console.log(err);
          } else{
               console.log(data);
          }
     });
}




