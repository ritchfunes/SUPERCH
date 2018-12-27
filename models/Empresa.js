/**
 * Created by Walter Suazo on 04/01/2016.
 */
var pool = require('./conexion').pool;
var empresasModel ={};


empresasModel.listar= function(socio,callback)
{
  pool.getConnection(function(err,connection)
  {
    var query = 'SELECT PK_EmpresaId id_empresa,Nombre,Descripcion,FK_SocioId id_socio,Activo FROM \
                             Empresas ref \
                              where ref.FK_SocioId = '+socio;
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

empresasModel.guardar=function(Data,callback)
{
  pool.getConnection(function(err,connection){
    if(connection) {
      connection.query("Insert into Empresas set ?", Data, function (error, result) {
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

empresasModel.eliminar = function(id,callback)
{
  pool.getConnection(function(err,connection){
    if(connection) {
      connection.query("Delete from Empresas where PK_EmpresaId = ?", id , function (error, result) {
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

empresasModel.update=function(id,Data,callback)
{
  pool.getConnection(function(err,connection){
    if(connection) {
      connection.query("update Empresas set ? where PK_EmpresaId ="+ id,Data , function (error, result) {
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

module.exports= empresasModel;
