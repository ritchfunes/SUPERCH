/**
 * Created by Walter Suazo on 29/07/2015.
 */
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

//var server = new mongodb.Server("131.161.52.171", 27017, {});
//exports.dbTest = new mongodb.Db('data', server, {});
var mongoUrl="mongodb://super:sabueso@ds035385.mlab.com:35385/sarnoso";
var db;

exports.connect = function(callback) {
  MongoClient.connect(mongoUrl, function(err, database) {
    if( err )
    {
      console.log(err);
      throw err;
    }
    db = database.db('sarnoso');
    callback();
  });
}

exports.collection = function(){
  // this is using the same db connection
  var collection = db.collection('Lugares');
  return collection;
};

/*var mongoose = require( 'mongoose' );
var uri= "ds035385.mlab.com:35385/sarnoso"
var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  user: 'usuario',
  pass: 'sarnoso'
}
mongoose.connect(uri, options);
*/
