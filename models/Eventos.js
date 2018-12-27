/**
 * Created by Walter Suazo on 10/11/2015.
 */

var pool = require('./conexion').pool;

Eventos = {}


Eventos.getEventos=function(callback)
{
    pool.getConnection(function(err,connection)
    {
        if (connection) {
            query = "select * from Eventos;"
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

Eventos.getEvento=function(data,callback)
{


    pool.getConnection(function(err,connection)
    {
        if (connection) {
            //este query no devuelve nada
            query ="select FechaHora,FechaHora,Longitud,Latitud,Velocidad,Direccion,Entradas, Evento" +
                "  from Posiciones po INNER JOIN EventosGps eg ON po.FK_ModeloGpsId = eg.FK_Modelo and po.Evento = eg.Codigo where po. Imei="+data.Imei+" and eg.FK_EventoId="+data.evento+" " +
                "and fechahora between '"+data.fecha+"' and '"+data.fechafin+ "' "

            connection.query(query,data, function (error, row) {
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


Eventos.getAllEventos=function(data,callback)
{
    pool.getConnection(function(err,connection)
    {
        if (connection) {
          query = " SELECT f.*,ev.nombre FROM	( " +
            " SELECT p.*,U.Nombre_Vehiculo vehiculo,e.FK_EventoId EventoId FROM ( "+
            " SELECT po.PK_PosicionesId,po.FechaHora,po.Latitud,po.Longitud,po.Velocidad,po.Direccion,po.Entradas,po.Imei,po.Evento,po.FK_ModeloGpsId modelo "+
            " FROM Posiciones po WHERE Imei IN ( "+
            " SELECT Imei(ue.FK_UnidadId) FROM UnidadesEmpresas ue WHERE ue.FK_EmpresaId = "+data.empresa+" ) AND po.FechaHora > NOW() - INTERVAL 30 HOUR limit 30000) p "+
            " INNER JOIN EventosGps e ON p.modelo = e.FK_Modelo AND p.Evento = e.Codigo "+
            " INNER JOIN Unidades U ON U.imei = p.Imei) f "+
            " INNER JOIN Eventos ev ON ev.PK_EventoId = f.EventoId ORDER BY f.PK_PosicionesId DESC LIMIT 40 ";
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

Eventos.Alertas=function(data,callback)
{
    pool.getConnection(function(err,connection)
    {
        if (connection) {
            query="SELECT VehiculoFull(imei) Vehiculo,Hora,CONCAT('Limite de Velocidad en Geocerca ',filtro,' A ' ,Velocidad,' Km/H ') Evento from LimiteVelocidad " +
                " WHERE Hora >  CONVERT_TZ(NOW(),'America/Tegucigalpa','UTC') - interval 1 minute AND Imei IN " +
                " (SELECT Imei(ue.FK_UnidadId) FROM UnidadesEmpresas ue WHERE ue.FK_EmpresaId = "+data.empresa+") " +
                " UNION SELECT f.Vehiculo,f.FechaHora,ev.nombre Evento " +
                " FROM (SELECT p.*,U.Nombre_Vehiculo Vehiculo,e.FK_EventoId EventoId " +
                " FROM (SELECT po.FechaHora,po.Imei,po.Evento,po.FK_ModeloGpsId modelo " +
                " FROM Posiciones po WHERE Imei IN " +
                " (SELECT Imei(ue.FK_UnidadId)" +
                " FROM UnidadesEmpresas ue WHERE ue.FK_EmpresaId = "+data.empresa+")" +
                " AND po.FechaHora > CONVERT_TZ(NOW(),'America/Tegucigalpa','UTC') - INTERVAL 1 minute ) p" +
                " INNER JOIN EventosGps e ON p.modelo = e.FK_Modelo AND p.Evento = e.Codigo" +
                " INNER JOIN Unidades U ON U.imei = p.Imei) f" +
                " INNER JOIN (select * from Eventos where PK_EventoId in (3,5,6,51)) ev ON ev.PK_EventoId = f.EventoId";
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

};

Eventos.Detenidos= function (data,callback) {
    pool.getConnection(function(err,connection) {
        if(connection){
            query = "SELECT ev.IdDetenido DetenidoId, VehiculoFull(ev.Imei) as Vehiculo, ev.Fecha Hora, CONCAT('Detencion: ',ev.Ubicacion) Evento, ev.Comentario FROM" +
                " (SELECT de.*, GeoCodingParadas(de.Latitud,de.Longitud) Autorizado FROM Detenidos de" +
                " INNER JOIN Unidades u ON de.Imei=u.imei" +
                " INNER JOIN UnidadesEmpresas ue ON ue.FK_UnidadId=u.PK_Unidades" +
                " WHERE ue.FK_EmpresaId=" + data.empresa + ") ev WHERE ev.Autorizado=0 " +
                " AND ev.Fecha >= CONVERT_TZ(NOW(),'America/Tegucigalpa','UTC') - INTERVAL 4 HOUR AND ev.Fecha <= CONVERT_TZ(NOW(),'America/Tegucigalpa','UTC') - INTERVAL 10 minute" +
                " ORDER BY ev.Fecha desc;";
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
};

Eventos.DetenidosAutorizados30= function (empresa,callback) {
    pool.getConnection(function(err,connection) {
        if(connection){
            query = "SELECT ev.IdDetenido DetenidoId, VehiculoFull(ev.Imei) as Vehiculo, ev.Fecha Hora, CONCAT('Detencion: ',ev.Ubicacion) Evento, ev.Comentario FROM" +
                " (SELECT de.*, GeoCodingParadas(de.Latitud,de.Longitud) Autorizado FROM Detenidos de" +
                " INNER JOIN Unidades u ON de.Imei=u.imei" +
                " INNER JOIN UnidadesEmpresas ue ON ue.FK_UnidadId=u.PK_Unidades" +
                " WHERE ue.FK_EmpresaId=" + empresa + ") ev WHERE ev.Autorizado=1 " +
                " AND ev.Fecha >= CONVERT_TZ(NOW(),'America/Tegucigalpa','UTC') - INTERVAL 48 HOUR AND ev.Fecha <= CONVERT_TZ(NOW(),'America/Tegucigalpa','UTC') - INTERVAL 30 minute" +
                " ORDER BY ev.Fecha;";
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
};

Eventos.agregarComentarioAlerta = function(data, callback){
    pool.getConnection(function(error, connection){
        if(connection){
            query = "UPDATE Detenidos SET Comentario = '" + data.comentario + "'" +
                "WHERE IdDetenido = " + data.id;
            connection.query(query, function(err, res){
                connection.release();
                if(err){
                    callback(err, null);
                }else{
                    callback(null, res);
                }
            });
        } else{
            callback(error, null);
        }
    });
}


Eventos.sinReportar= function (data,callback) {
  pool.getConnection(function(err,connection) {
    if(connection){
        var query= "call SPAlertaSinReportar("+data.empresa+")"
        connection.query(query, function (error, row) {
        connection.release();
        if (error) {
          callback(error, null)
        } else {
          callback(null, row[0]);

        }
      });
    }
  });
};


Eventos.unidadesSinReportar=function (data,callback) {
  pool.getConnection(function (err,connection) {
    if(connection){
      query = "SELECT * from (" +
        "      select '' marcado,Vehiculo(u.PK_Unidades) Rastra,Nombre_Vehiculo Vehiculo,VehiculoFull(u.Imei) NombreCompleto ,u.PK_Unidades UnidadId,u.Imei,cn.PK_ConductoresId IdConductor, cn.Nombre Conductor,cn.Apellido apellido," +
        " u.FechaCreacion,up.Velocidad,up.Direccion,up.Entradas,up.FechaHora,up.Latitud,up.Longitud," +
        " arrow(u.FK_IconoId,ui.url,up.Direccion%360) url,m.Nombre Modelo,up.TramaExtendida,up.Kilometraje km FROM Unidades u INNER JOIN UnidadesIcono ui on u.FK_IconoId = ui.PK_UnidadesIconoId" +
        " INNER JOIN UnidadesEmpresas ue ON u.PK_Unidades = ue.FK_UnidadId" +
        " INNER JOIN UltimasPosiciones up ON up.imei = u.imei" +
        " INNER JOIN ModeloGPS m on u.FK_ModeloId = m.PK_ModeloId" +
        " INNER JOIN Conductores cn on cn.PK_ConductoresId=u.FK_ConductoresId" +
        " WHERE ue.FK_EmpresaId = 66 and up.FechaHora< UTC_TIMESTAMP() -INTERVAL 10 MINUTE and u.Activo=1 order by u.Nombre_Vehiculo)a where" +
        " GeoCodingParadas(a.Latitud,a.Longitud)=0"
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
  })
}


module.exports= Eventos;
