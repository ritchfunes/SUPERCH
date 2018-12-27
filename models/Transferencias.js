/**
 * Created by Jeffry Romero on 08/09/2016.
 */
var pool = require('./conexion').pool;
var transferenciasModel={};

transferenciasModel.postTransferencia= function (data,callback) {
    pool.getConnection(function (err,connection) {
        if(connection){
            query=connection.format("CALL sp_transferencias("+data.Imei+",'"+data.Transferencia+"',"+data.FK_ViajeCompletoId+",'"+data.Rastra+"','"+data.FechaHora+"','"+data.VentanaAtencion+"','"+data.VentanaRetorno+"','"+data.Observacion+"'," +
                "getConductorById("+data.FK_ConductoresId+"),'"+data.FK_ConductoresId+"');");
            console.log(query);
            connection.query(query, function (error,result) {
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
};


transferenciasModel.getTransferencias= function (data,callback) {
    pool.getConnection(function (err,connection) {
        if(connection){
            query="SELECT t.PK_TransferenciaId TransferenciaId, t.Transferencia," +
                " t.FechaHora, t.Imei,VehiculoFull(t.Imei) Vehiculo, t.Rastra," +
                " t.FK_ViajeCompletoId ViajeCompletoId, vc.Nombre Viaje," +
                " t.VentanaAtencion, t.VentanaRetorno, getConductorById(t.FK_ConductoresId) Conductor," +
                " fnEstadoViaje(t.Estado) Estado" +
                " FROM Transferencias t INNER JOIN ViajeCompleto vc" +
                " ON vc.PK_ViajeCompletoId = t.FK_ViajeCompletoId" +
                " WHERE t.FechaHora > NOW() - INTERVAL 5 DAY" +
                " AND t.Estado < 5" +
                " ORDER BY t.FechaHora DESC";
            console.log(query);
            connection.query(query, function (error,result) {
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
};

transferenciasModel.getTransferenciasTerminadas= function (data,callback) {
    pool.getConnection(function (err,connection) {
        if(connection){
            query="SELECT t.PK_TransferenciaId TransferenciaId, t.Transferencia," +
                " t.Imei,VehiculoFull(t.Imei) Vehiculo,VehiculoFull(t.Imei) Vehiculo, " +
                " t.Rastra,getConductorById(t.FK_ConductoresId) Conductor,vc.Nombre Viaje," +
                " t.FK_ViajeCompletoId ViajeCompletoId,t.FechaHora,t.VentanaAtencion, t.VentanaRetorno," +
                " fnEstadoViaje(t.Estado) Estado" +
                " FROM Transferencias t INNER JOIN ViajeCompleto vc" +
                " ON vc.PK_ViajeCompletoId = t.FK_ViajeCompletoId" +
                " WHERE t.FechaHora > NOW() - INTERVAL 5 DAY" +
                " AND t.Estado BETWEEN 4 AND 5" +
                " ORDER BY t.FechaHora DESC";
            console.log(query);
            connection.query(query, function (error,result) {
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
};

transferenciasModel.putTransferencia= function (id,data,callback) {
    pool.getConnection(function (err,connection) {
        if(connection){
            //query="UPDATE Transferencias SET ? WHERE PK_TransferenciaId="+id;
            query="CALL sp_transferenciaEdit("+id+","+data.Imei+",'"+data.Transferencia+"','"+data.FechaHora+"','"
                +data.VentanaAtencion+"','"+data.VentanaRetorno+"','"+data.Rastra+"','"+data.Observacion+"',"
                +data.FK_ViajeCompletoId+");";
            //sql=connection.format(query,data);
            console.log(query);
            connection.query(query, function (error,result) {
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
};

transferenciasModel.getOrigines=function(callback){
    pool.getConnection(function (err,connection) {
        if(connection){
            query="SELECT * FROM Origenes";
            console.log(query);
            connection.query(query, function (error,result) {
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
};

transferenciasModel.getDestinos=function(callback){
    pool.getConnection(function (err,connection) {
        if(connection){
            query="SELECT * FROM Destinos";
            console.log(query);
            connection.query(query, function (error,result) {
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
};

transferenciasModel.checkTransferencia=function(data,callback){
    pool.getConnection(function (err, connection) {
        if(connection){
            query="SELECT checkTransferencia("+data.imei+") Termino;";
            console.log(query);
            connection.query(query, function(error, result){
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
};

transferenciasModel.getImeiByCodigo = function(data, callback){
    pool.getConnection(function (err, connection) {
        if(connection){
            query=connection.format("SELECT GetImeiByCodUnidad(?) Imei;", data);
            console.log(query);
            connection.query(query, function(error, result){
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

transferenciasModel.getViajeByCodigo = function(data, callback){
    pool.getConnection(function (err, connection) {
        if(connection){
            query=connection.format("CALL GetViajeByDestino(?);", data);
            console.log(query);
            connection.query(query, function(error, result){
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

transferenciasModel.postSAT= function (data,callback) {
    pool.getConnection(function (err,connection) {
        if(connection){
            query=connection.format("CALL sp_transferencias(" + data.Imei + ",'" + data.Transferencia + "'," + 
                data.FK_ViajeCompletoId + ",'" + data.Rastra + "','" + 
                data.FechaHora + "','" + data.VentanaAtencion + "','" + data.VentanaRetorno + "','SAT1','" + 
                data.Conductor + "'," + "getConductorIdByCodigo('"+data.Conductor+"'));");
            console.log(query);
            connection.query(query, function (error,result) {
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
};

module.exports=transferenciasModel;