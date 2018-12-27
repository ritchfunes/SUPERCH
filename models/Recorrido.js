/**
 * Created by Walter Suazo on 19/11/2015.
 */

var pool = require('./conexion').pool;

Recorrido = {}


Recorrido.getPuntos=function(imei,desde,hasta,callback)
{
    pool.getConnection(function(err,connection)
    {
        if (connection) {
            query = "select FechaHora, Velocidad, Latitud, Longitud,Direccion,Ignicion from Posiciones where Imei ="+imei+" and FechaHora between '"+desde+"' and '"+hasta+"'  and Longitud < 0;";

            connection.query(query, function (error, row) {
                connection.release();
                if (error) {
                    callback(error, null)
                } else {
                    callback(null, row);

                }

            });
        }
    });
};

Recorrido.getRecHora= function (data,callback) {
    pool.getConnection(function (err,connection) {
        if(connection){
            query="select " +
                  " P.Imei, P.FechaHora, P.Latitud, P.Longitud, P.Velocidad " +
                  "     from " +
                  " Posiciones P " +
                  "    where P.imei in ("+ data.imeis.toString() +") " +
                  " and FechaHora between '"+data.fechaHora+"' - interval 60 minute and '"+data.fechaHora+"' order by FechaHora asc";
            console.log(query);
            connection.query(query, function (error, row) {
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

module.exports= Recorrido;
