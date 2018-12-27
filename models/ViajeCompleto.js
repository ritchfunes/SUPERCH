/**
 * Created by Jeffry Romero on 2016-11-14.
 */
var pool=require('./conexion').pool;
var viajesCompletosModel={};

viajesCompletosModel.get= function (callback) {
    pool.getConnection(function (err,connection) {
        if(connection){
            query="select vc.PK_ViajeCompletoId ViajeCompletoId, vc.Nombre," +
              " (select s.ClaveCHSA from Viajes v inner JOIN Sitios s on v.origen =s.PK_SitioId where v.id_Viaje = vc.FK_IdViajeIda) Origen," +
              " (select s.ClaveCHSA from Viajes v inner JOIN Sitios s on v.Destino =s.PK_SitioId where v.id_Viaje = vc.FK_IdViajeIda) Destino," +
              " vc.Retorno from ViajeCompleto vc ";
            console.log(query);
            connection.query(query, function (error, res) {
                connection.release();
                if(error){
                    console.log(error);
                    callback(error,null);
                }else{
                    callback(null,res);
                }
            });
        }
    });
};

module.exports=viajesCompletosModel;
