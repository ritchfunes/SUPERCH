/**
 * Created by walter on 07-07-15.
 */
var pool = require('./conexion').pool;

var userModel ={};
userModel.getUser=function(user,pass,callback) {

    pool.getConnection(function (err, connection) {

        if (connection) {
            query = 'SELECT u.*,e.*,s.Logo,ta.View FROM Usuarios u inner join Empresas e on e.PK_EmpresaId=u.FK_EmpresasId INNER JOIN Socios s on e.FK_SocioId = s.PK_SocioId INNER JOIN TipoAplicacion ta on s.Tipo=ta.id WHERE usuario =' + connection.escape(user) + 'and clave =' + connection.escape(pass);
          console.log(query);
          connection.query(query, function (error, row) {
                connection.release();
                if (error) {
                    console.log(error);
                    callback(error, null);
                } else {
                     callback(null, row);
                }

            });
        }
    });
}

userModel.addUser= function(info,callback)
{
    pool.getConnection(function (err, connection) {
        if(connection)
        {
            query = "insert into Usuarios set ?";
            connection.query(query,info, function (err, data) {
              connection.release();
              if(err){
                    callback(err,null);
                }else{
                    callback(null,data);
                }
            });
        }
    });

}

userModel.get= function(empresa,callback)
{
  pool.getConnection(function(error,connection){
    if(connection){
      query="select U.Usuario,U.FK_RolesId rol, U.Vigencia, e.Nombre Empresa from(select * from Usuarios u where Fk_EmpresasId="+empresa+")U inner join Empresas e on U.Fk_EmpresasId = e.Pk_EmpresaId ";
       connection.query(query,function(err,data){
         connection.release();
         if(err){
          callback(err,null);
        }else
        {
          callback(null,data);
        }
      });
    }
  });
}

userModel.put=function(id,data,callback)
{
  pool.getConnection(function(error,connection){
    if(connection){
      query="update Usuarios set ? where PK_UsuariosId="+id;
      connection.query(query,data,function(err,data){
        connection.release();
        if(err){
          console.log(err);
          callback(err,null);
        }else
        {
          callback(null,data);
        }
      });
    }
  });
}

userModel.reset=function(id,pass,data,callback)
{
  pool.getConnection(function(error,connection){
    if(connection){
      query="update Usuarios set ? where PK_UsuariosId="+id+" and clave='"+pass+"'";
      connection.query(query,data,function(err,data){
        connection.release();
        if(err){
          console.log(err);
          callback(err,null);
        }else
        {
          callback(null,data);
        }
      });
    }
  });
}


module.exports = userModel;
