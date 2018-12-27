/**
 * Created by GMG on 21/03/2016.
 */
var pool=require('./conexion').pool;

var conductoresModel={};

conductoresModel.crear= function (data,callback)
{
    pool.getConnection(function(err,connection){
        if(connection){
            var query="Insert into Conductores set ?";
            connection.query(query,data, function (error,result) {
                connection.release();
                if(error){
                    console.log(error)
                    callback(error,null);
                }
                else{
                    callback(null,result);
                }
            });
        }
    });
}


conductoresModel.listar= function (id, callback) {
    pool.getConnection(function (err,connection) {
        var query="SELECT PK_ConductoresId IdConductor,   Nombre, Apellido, Telefono, "+
            " Direccion, Identidad, FechaExpLicencia FechaExp, IdFicha Ficha, FK_EmpresaId EmpresaId, CodigoSAT Codigo, Estado FROM Conductores where " +
            " FK_EmpresaId ="+id+" or PK_ConductoresId = 1";
        if(connection){
            connection.query(query, function (error,rows) {
                connection.release();
                if(error){
                    console.log(error);
                    callback(error,null);
                }else{
                    callback(null,rows);
                }
            });
        }
    });
}

conductoresModel.conductoresDisponibles = function ( callback ) {
    pool.getConnection(function (err,connection) {
        var query=`Select Pk_ConductoresId as ID,CONCAT(Nombre," ", Apellido) AS Conductor, CodigoSAT Codigo from Conductores where Estado=0`;
        if(connection){
            connection.query(query, function (error,rows) {
                connection.release();
                if(error){
                    console.log(error);
                    callback(error,null);
                }else{
                    callback(null,rows);
                }
            });
        }
    });
}

conductoresModel.eliminar=function(id,callback){
    pool.getConnection(function(err,connection){
        if(connection){
            query="UPDATE Conductores SET Estado = 2 WHERE PK_ConductoresID="+id+";";
            console.log(query);
            connection.query(query,function(error,result){
               connection.release();
                if(error){
                    console.log(error);
                    callback(error,null);
                }else{
                    callback(null,{result:result});
                }
            });
        }
    });
}


conductoresModel.actualizar= function (id,Data,callback)
{
    pool.getConnection(function(err,connection){
        if(connection){
            var query="update Conductores set ? where PK_ConductoresId="+id+";";
            connection.query(query,Data, function (error,result) {
                connection.release();
                if(error){
                    console.log(error);
                    callback(error,null);
                }else{
                    callback(null,result);
                }
            });
        }
    });
}
conductoresModel.sinViaje = function(callback){
    pool.getConnection(function(error, connection){
       // let query = "SELECT PK_ConductoresId idConductor, Nombre, Apellido FROM Conductores WHERE Estado = 0";
        var query = "SELECT PK_ConductoresId idConductor, CONCAT(Nombre,\" \", Apellido) as Motorista, CodigoSAT Codigo FROM Conductores WHERE Estado = 0 order by FK_EmpresaId ASC\n";
        console.log(query);

        if(connection){
            connection.query(query, function (error,rows) {
                connection.release();
                if(error){
                    console.log(error);
                    callback(error,null);
                }else{
                    callback(null,rows);
                }
            });
        }else{
            callback(err, null);
        }
    });
}

conductoresModel.listarTodos = function(id, callback){
    pool.getConnection(function (err,connection) {
        var query="SELECT PK_ConductoresId IdConductor, Nombre, Apellido, Telefono, "+
            " Direccion, Identidad, FechaExpLicencia FechaExp, IdFicha Ficha," +
            " FK_EmpresaId EmpresaId, CodigoSAT Codigo, Estado FROM Conductores " +
            " ORDER BY CodigoSAT DESC";
        if(connection){
            connection.query(query, function (error,rows) {
                connection.release();
                if(error){
                    console.log(error);
                    callback(error,null);
                }else{
                    callback(null,rows);
                }
            });
        }
    });
}

module.exports=conductoresModel;
