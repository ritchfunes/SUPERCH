/**
 * Created by Walter Suazo on 05/01/2016.
 */
var pool = require('./conexion').pool;
var privilegiosRolModel ={};


privilegiosRolModel.listar= function(ruta,accion,callback)
{
  pool.getConnection(function(err,connection)
  {
    var query =
      "select FK_RolesId rol from (" +
      " select * from Privilegios p where p.FK_RutaId=" +
      "(select PK_RutaId from Path where Descripcion ='"+ruta+"') " +
      " and p.FK_AccionId= (select PK_AccionId from Acciones where Descripcion='"+accion+"') )" +
      " p INNER JOIN PrivilegiosPorRol pr ON pr.FK_PrivilegiosId=p.PK_PrivilegiosId"
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

privilegiosRolModel.get=function(rol,callback)
{
  pool.getConnection(function(err,connection)
  {
    var query =
    "SELECT PPr.PK_PrivilegiosPorRolId Privilegio_Por_Rol_Id,PR.*,r.PK_RolesId Rol_Id,r.Descripcion Rol from ( "+
    "select P.PK_PrivilegiosId Privilegio_Id,R.Descripcion Ruta,a.Descripcion Accion from Path R " +
    "INNER JOIN Privilegios P on R.PK_RutaId = P.FK_RutaId INNER JOIN Acciones a on " +
    "a.PK_AccionId = P.FK_AccionId) PR INNER JOIN PrivilegiosPorRol PPr on PR.Privilegio_Id = " +
    " PPr.FK_PrivilegiosId INNER JOIN Roles r on PPr.FK_RolesId = r.PK_RolesId "+
    " where r.PK_RolesId="+rol+" order by PPr.PK_PrivilegiosPorRolId "
    var query =
      "SELECT Ruta,Accion from ( "+
      "select P.PK_PrivilegiosId Privilegio_Id,R.Descripcion Ruta,a.Descripcion Accion from Path R " +
      "INNER JOIN Privilegios P on R.PK_RutaId = P.FK_RutaId INNER JOIN Acciones a on " +
      "a.PK_AccionId = P.FK_AccionId) PR INNER JOIN PrivilegiosPorRol PPr on PR.Privilegio_Id = " +
      " PPr.FK_PrivilegiosId INNER JOIN Roles r on PPr.FK_RolesId = r.PK_RolesId "+
      " where r.PK_RolesId="+rol+" order by PPr.PK_PrivilegiosPorRolId "
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


privilegiosRolModel.guardar=function(Data,callback)
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

privilegiosRolModel.eliminar = function(id,callback)
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

privilegiosRolModel.update=function(id,Data,callback)
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

module.exports= privilegiosRolModel;
