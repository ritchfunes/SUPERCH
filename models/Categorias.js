/**
 * Created by Walter Suazo on 30/12/2015.
 */

var pool = require('./conexion').pool;
db=require("./ConexionMongo");
var categoriasModel ={};


categoriasModel.listar= function(empresa,callback)
{
  pool.getConnection(function(err,connection)
  {
    var query = 'SELECT PK_CategoriaId id, Categoria,Descripcion,FK_EmpresaID EmpresaId FROM \
                             CategoriasReferencia ref \
                              where ref.FK_EmpresaId in (0,'+empresa+')';


    if (connection) {
      connection.query(query, function (error, rows) {
        connection.release();
        if (error) {
          console.log(error);
          callback(error, null);
        } else {
          callback(null, rows);
        }
      });
    }
  });
}



categoriasModel.guardar=function(Data,callback)
{
  pool.getConnection(function(err,connection){
    if(connection) {
      connection.query("Insert into CategoriasReferencia set ?", Data, function (error, result) {
        connection.release();
        if (error) {
          callback(error, null);
        } else {
          callback(null,result);
        }
      });
    }
  });
}


categoriasModel.eliminar = function(id,callback)
{
  pool.getConnection(function(err,connection){
    if(connection) {

      query="Delete from CategoriasReferencia where PK_CategoriaId = "+id 
      connection.query(query , function (error, result) {
        connection.release();
        if (error) {

          callback(error, null);

        } else {
          callback(null, {result : result});
        }

      });
    }
  });
}


categoriasModel.update=function(id,Data,callback)
{
  pool.getConnection(function(err,connection){
    if(connection) {
      connection.query("update CategoriasReferencia set ? where PK_CategoriaId ="+ id,Data , function (error, result) {
        connection.release();
        if (error) {
          console.log(error)
          callback(error, null);

        } else {
          callback(null, result);
        }

      });
    }
  });
}

module.exports= categoriasModel;


