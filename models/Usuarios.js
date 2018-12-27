/**
 * Created by Walter Suazo on 18/01/2016.
 */
var pool = require('./conexion').pool;

var userModel ={};
userModel.getUser=function(user,pass,callback) {

    pool.getConnection(function (err, connection) {

        if (connection) {
            query = 'SELECT * FROM Usuarios u inner join Empresas e on e.PK_EmpresaId=u.FK_EmpresasId  WHERE usuario =' + connection.escape(user) + 'and clave =' + connection.escape(pass);
            console.log(query);
            connection.query(query, function (error, row) {
                connection.release();
                if (error) {
                    console.log('error');
                    callback(error, null);
                } else {
                    console.log('result');
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

userModel.get= function(empresaId,callback)
{
    pool.getConnection(function(error,connection){
        if(connection){
            query="SELECT  U.PK_UsuariosId usuario_id,	U.Usuario,	U.FK_RolesId rol_id,	U.Vigencia,	"+
            " e.Nombre Empresa,e.Pk_EmpresaId empresa_id,  r.Descripcion Rol FROM	Usuarios U "+
            " INNER JOIN Empresas e ON U.Fk_EmpresasId = e.Pk_EmpresaId "+
            " INNER JOIN Roles r on r.PK_RolesId = U.FK_RolesId "+
                " WHERE  e.PK_EmpresaId ="+ empresaId;


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
module.exports = userModel;
