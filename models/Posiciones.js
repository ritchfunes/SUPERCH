/**
 * Created by Walter Suazo on 12/08/2015.
 */

var pool = require('./conexion').pool;

Posiciones = {}


Posiciones.getLastPosiciones=function(imei,cantidad,callback)
{
    pool.getConnection(function(err,connection)
    {
        if (connection) {
            query = "select FechaHora, Velocidad, Latitud, Longitud from Posiciones where Imei ="+imei+" order by FechaHora desc limit 200";

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



Posiciones.getListado=function(unidad,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query = "SELECT * FROM (SELECT	u.PK_Unidades UnidadId,	u.Imei,	u.Conductor,	u.Nombre_Vehiculo Vehiculo,	p.Velocidad,	p.Direccion,	p.Entradas,	p.FechaHora,	p.Latitud,	p.Longitud,	p.Kilometraje" +
        " FROM	Unidades u INNER JOIN Posiciones p ON u.imei = p.Imei WHERE	u.PK_Unidades = "+unidad+" AND p.FechaHora > NOW() - INTERVAL 2 HOUR  order by p.FechaHora desc LIMIT 350) posiciones order by posiciones.FechaHora asc"

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

Posiciones.getPosicion=function(unidad,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query = "select '' marcado,u.PK_Unidades UnidadId,u.Imei,u.Conductor,u.Nombre_Vehiculo Vehiculo,VehiculoFull(u.Imei) VehiculoFull,u.FechaCreacion,up.Velocidad,up.Direccion,up.Entradas,up.FechaHora,up.Latitud,up.Longitud,ui.url,up.Kilometraje km FROM Unidades u INNER JOIN UnidadesIcono ui on u.FK_IconoId = ui.PK_UnidadesIconoId INNER JOIN UltimasPosiciones up ON up.imei = u.imei WHERE PK_Unidades = " + unidad;
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

module.exports= Posiciones;
