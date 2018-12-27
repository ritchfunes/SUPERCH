/**
 * Created by Walter Suazo on 28/10/2015.
 */


var pool = require('./conexion').pool;

var bitacoraModel ={};

bitacoraModel.addUser=function(data,callback)
{
    pool.getConnection(function (err,connection) {
        if(connection){

            connection.query('insert into BitacoraUsuarios set ?',data, function (error,result) {
                connection.release();
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, {"insertId": result.insertId});
                }

            })
        }
    })
}

bitacoraModel.UltimaSesion = function(data,callback)
{
    pool.getConnection(function(err,connection){
        if(connection){

        connection.query('select * from BitacoraUsuarios where IdUsuario='+data.IdUsuario+' and ' +
            'IdEvento=1 order by fecha desc limit 2',function(error,result){
            connection.release();
            if(error){
                callback(error,null);
            }else{
                callback(null,result);
            }
        } )
        }
    });
}

bitacoraModel.ultimosEventosUsuario = function(data,callback)
{
    pool.getConnection(function(err,connection){
        if(connection){
            //connection.query('select SUBSTRING_INDEX(Mensaje,":",1) Vehiculo ,SUBSTRING_INDEX(Mensaje,":",-1) Comando, fecha,respuesta from BitacoraUsuarios where IdUsuario ='+data.IdUsuario+' and idEvento <> 1 order ' +
            connection.query('select mensaje, fecha,respuesta from BitacoraUsuarios where IdUsuario ='+data.IdUsuario+' and idEvento =2  order ' +
                'by fecha desc limit 20',function(error,result){
                connection.release();
                if(error){

                    callback(error,null);
                }else{
                    callback(null,result);
                }
            });
        }
    });
}

bitacoraModel.comandoEnviado = function(data, callback)
{
    pool.getConnection(function (err,connection) {
        if (connection) {
            connection.query('insert into BitacoraUsuarios set ?', data, function (err, result) {
                connection.release();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } });
}

bitacoraModel.updateComando = function (data,callback) {
    pool.getConnection(function(err,connection){
       if(connection){

        connection.query('Update BitacoraUsuarios set Respuesta="OK" where idBitacora =?',data,function(err,data){
            connection.release();
           if(err)
           {
               callback(err,null);
           }else
           {
               callback(null,data);
           }
        });}
    });
}

module.exports=bitacoraModel
