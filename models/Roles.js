/**
 * Created by Walter Suazo on 07/01/2016.
 */
var pool = require('./conexion').pool;

Roles = {}


Roles.get=function(callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query = "select PK_RolesId rol_id,Descripcion from Roles"
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

Roles.post=function(data,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query ="insert into Roles set ?"
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

Roles.delete=function(id,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query ="delete from Roles where PK_RolesId=?"
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

Roles.put=function(id,data,callback)
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
module.exports= Roles;
