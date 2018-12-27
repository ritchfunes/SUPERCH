/**
 * Created by Walter Suazo on 07/03/2016.
 */

var pool = require('./conexion').pool;

var notificacionesModel ={};


notificacionesModel.listar= function(usuario,callback)
{
  pool.getConnection(function(err,connection)
  {
    var query = 'select noti.PK_NotificacionesId Id, noti.nombre, noti.correo, unit.Nombre_Vehiculo from Notificaciones noti '+
    'inner join NotificacionesUnidades nunit on noti.PK_NotificacionesId=nunit.FK_NotificacionesId '+
    'inner join Unidades unit on nunit.FK_UnidadesId=unit.PK_Unidades '+
    'where noti.FK_UsuarioId='+usuario;
    //console.log(query);

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

notificacionesModel.guardar=function(Data,callback)
{
  pool.getConnection(function(err,connection){
    if(connection) {
      var query="Insert into Notificaciones set ?;";
        connection.query(query,Data, function (error, row) {
          connection.release();
          if (error) {
            callback(error, null)
          } else {
            callback(null, row);

          }

        });
    }
  });
}

notificacionesModel.Unidades=function(data,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query ="insert into NotificacionesUnidades (FK_NotificacionesId,FK_UnidadesId) values "+data
          +" on duplicate key update FK_NotificacionesId=FK_NotificacionesId;";

      connection.query(query, function (error, row) {
        connection.release();
        if (error) {
          callback(error, null)
        } else {
          callback(null, row);

        }

      });
    }
  });
}

notificacionesModel.Evento=function(data,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query ="insert into NotificacionesEventos (FK_NotificacionesId,FK_EventoId) values "+data
          +" on duplicate key update FK_NotificacionesId=FK_NotificacionesId;";

      connection.query(query, function (error, row) {
        connection.release();
        if (error) {
          callback(error, null)
        } else {
          callback(null, row);

        }

      });
    }
  });
}

notificacionesModel.eliminar = function(id,callback)
{
  pool.getConnection(function(err,connection){
    if(connection) {
      query="Delete from Notificaciones where PK_NotificacionesId = "+id;

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

notificacionesModel.update=function(id,Data,callback)
{
  pool.getConnection(function(err,connection){
    if(connection) {
      console.log("update Notificaciones set "+ Data +" where PK_NotificacionesId="+ id);
      connection.query("update Notificaciones set ? where PK_NotificacionesId="+ id,Data , function (error, result) {
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

notificacionesModel.deleteUnidades=function(dataDelete,callback){
  pool.getConnection(function(err,connection){
    if(connection){
      var query="delete from NotificacionesUnidades where (FK_NotificacionesId,FK_UnidadesId) in ("+dataDelete+");";

      connection.query(query, function (error, result) {
        connection.release();
        if(error){
          console.log(error)
          callback(error, null);
        } else {
          callback(null, result);
        }
      });
    }
  });
}

notificacionesModel.deleteEventos=function(dataDelete,callback){
  pool.getConnection(function(err,connection){
    if(connection){
      var query="delete from NotificacionesEventos where (FK_NotificacionesId,FK_EventoId) in ("+dataDelete+");";

      connection.query(query, function (error, result) {
        connection.release();
        if(error){
          console.log(error)
          callback(error, null);
        } else {
          callback(null, result);
        }
      });
    }
  });
}

module.exports= notificacionesModel;
