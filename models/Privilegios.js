/**
 * Created by Walter Suazo on 07/01/2016.
 */
var pool = require('./conexion').pool;

Privilegios = {}


Privilegios.get=function(callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query = " select p.PK_PrivilegiosId,p.FK_AccionId accion_id,p.FK_RutaId ruta_id ,(SELECT a.Descripcion FROM Acciones a where a.PK_AccionId = p.FK_AccionId) accion, " +
               " (SELECT r.Descripcion from Path r where r.PK_RutaId= p.FK_RutaId) ruta from Privilegios p;"
      connection.query(query, function (error, row) {
        connection.release();
        if (error) {
          callback(error, null);
        } else {
          callback(null, row);

        }

      });
    }
  });
};

Privilegios.post=function(data,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query ="insert into PrivilegiosPorRol set ?"
      connection.query(query,data, function (error, row) {
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

Privilegios.delete=function(id,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query ="delete from Privilegios where PK_PrivilegiosId=?"
      connection.query(query,id, function (error, row) {
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

Privilegios.put=function(id,data,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query ="update Roles set ? where PK_RolesId="+id
      connection.query(query,data, function (error, row) {
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


module.exports= Privilegios;
