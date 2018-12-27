/**
 * Created by GMG on 20/04/2016.
 */
var pool = require('./conexion').pool;

Reportes={};

Reportes.getReporteAcceso= function (empresa, callback) {
    pool.getConnection(function (err,connection) {
        if(connection){
            query="select bu.IdUsuario, us.Usuario, bu.fecha, bu.cantidad CantidadAcceso from Desarrollo.Usuarios us " +
                "inner join (" +
                "select IdUsuario, max(fecha) fecha, count(*) cantidad from Desarrollo.BitacoraUsuarios " +
                "where Mensaje like 'inicio sesion' " +
                "group by IdUsuario) bu " +
                "on us.PK_UsuariosId=bu.IdUsuario " +
                "where us.FK_EmpresasId="+empresa+ " "+
                "order by bu.fecha desc";
            console.log(query);
            connection.query(query, function (error,result) {
                connection.release();
                if(error){
                    callback(error, null);
                }else{
                    callback(null,result);
                }
            });
        }
    });
}

Reportes.getReporteAccesoFecha= function (empresa, data, callback) {
    pool.getConnection(function (err, connection) {
        if(connection){
            query="select bu.IdUsuario, us.Usuario, bu.fecha, bu.cantidad CantidadAcceso from Desarrollo.Usuarios us " +
                "inner join (select IdUsuario, max(fecha) fecha, count(*) cantidad from Desarrollo.BitacoraUsuarios " +
                "where Mensaje like 'inicio sesion' " +
                "and (Date(fecha) between '"+data.fechaInicio+"' and '"+data.fechaFin+"') " +
                "group by IdUsuario) bu " +
                "on us.PK_UsuariosId=bu.IdUsuario " +
                "where us.FK_EmpresasId=" + empresa + " " +
                "order by bu.fecha desc";
            console.log(query);
            connection.query(query, function (error,result) {
                connection.release();
                if(error){
                    callback(error, null);
                }else{
                    callback(null,result);
                }
            });
        }
    });
}

module.exports=Reportes;