/**
 * Created by walter on 07-07-15.
 */
var pool = require('./conexion').pool;

var geocercasModel ={};

geocercasModel.listarGeocercas= function(empresa,callback)
{
    pool.getConnection(function(err,connection)
    {
        if (connection) {
            //connection.query('Select Nombre,Descripcion,ColorGeocerca Color,PK_GeocercaId id ,CONVERT(Posiciones USING utf8)  pos from Geocerca where FK_EmpresaId = ? order by PK_GeocercaId', empresa, function (error, rows) {
            connection.query('Select PK_GeocercaId id ,CONVERT(Posiciones USING utf8)  pos,CONVERT(Puntos USING utf8)puntos,Visible from Geocerca where FK_EmpresaId = ? and Visible = 1 order by PK_GeocercaId', empresa, function (error, rows) {
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
geocercasModel.listarGeocercasTodas= function(empresa,callback)
{
    pool.getConnection(function(err,connection)
    {
        if (connection) {
            //connection.query('Select Nombre,Descripcion,ColorGeocerca Color,PK_GeocercaId id ,CONVERT(Posiciones USING utf8)  pos from Geocerca where FK_EmpresaId = ? order by PK_GeocercaId', empresa, function (error, rows) {
            connection.query('Select "" marcado,PK_GeocercaId id ,CONVERT(Posiciones USING utf8)  pos,CONVERT(Puntos USING utf8)puntos,Visible from Geocerca where FK_EmpresaId = ? order by PK_GeocercaId', empresa, function (error, rows) {
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


geocercasModel.guardarGeocercas=function(geoData,callback)
{
    pool.getConnection(function(err,connection){
        if(connection) {

            connection.query("Insert into Geocerca set ?", geoData, function (error, result) {
                connection.release();
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, {"insertId": result.insertId});
                }

            });
        }
    });
}


geocercasModel.modificarGeocercas=function(id,posiciones,callback)
{
    pool.getConnection(function(err,connection){
        if(connection) {
            var query = "update Geocerca set ? where PK_GeocercaId= " + id

            connection.query(query, posiciones, function (error, result) {
                connection.release();
                if (error) {
                    console.log(error);
                    callback(error, null);
                } else {
                    callback(null, {"insertId": result.insertId});
                }
             //
            });
        }
    });
}


geocercasModel.eliminarGeocercas= function(id,callback)
{
    pool.getConnection(function(err,connection)
    {
        if (connection) {
            connection.query('Delete from Geocerca where PK_GeocercaId = ? ', id, function (error, rows) {
                connection.release();
                if (error) {
                    console.log(error);
                    callback(error, null);
                } else {
                    console.log(rows);
                    callback(null, rows);
                }
            });
        }
    });
}

geocercasModel.unidadesPorGeocerca = function (data,callback) {
    pool.getConnection(function (err, connection) {
        if(connection){
            query="SELECT\
            u.Nombre_Vehiculo,\
                Rastra(u.imei) Rastra,\
                ges.FechaEntrada,\
                TIMEDIFF(\
                    '"+data.fecha+"',\
                    ges.FechaEntrada\
                ) TiempoEnGeocerca,\
                CONVERT (geo.Posiciones USING utf8) Posiciones\
            FROM\
            GeocercaES ges\
            INNER JOIN Geocerca geo ON geo.PK_GeocercaId = ges.FK_GeoId\
            INNER JOIN Unidades u ON u.PK_Unidades = ges.FK_UnidadId\
            WHERE\
            ges.FechaSalida IS NULL\
            AND ges.FechaEntrada BETWEEN '"+data.fecha+"' - INTERVAL 48 HOUR\
            AND '"+data.fecha+"'\
            ORDER BY ges.FK_GeoId, FechaEntrada;";

            console.log(query);
            connection.query(query,function(error, res){
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

module.exports= geocercasModel;
