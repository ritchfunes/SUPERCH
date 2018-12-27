/**
 * Created by Walter Suazo on 13/11/2015.
 */

var pool = require('./conexion').pool;

iconosModel= {};

iconosModel.add = function (data, callback) {
    pool.getConnection(function(err,connection)
    {
       if(connection)
       {
           q=connection.format("insert into UnidadesIcono values (0,?)",data.url)
           console.log(q);
           connection.query(q,function(err,row){
               if(err){
                   callback(err,null);
               }else{
                   callback(null,row);
               }
           });
       }
    });
}

iconosModel.get = function (data, callback) {
    pool.getConnection(function(err,connection)
    {
        if(connection)
        {
            query = 'select PK_UnidadesIconoId id, url from UnidadesIcono '+data;
            connection.query(query,function(er,row){
                if(er){
                    callback(er,null);
                }else{
                    callback(null,row);
                }
            });
        }
    });
}
module.exports= iconosModel;