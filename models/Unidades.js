/**
 * Created by Walter Suazo on 10/07/2015.
 */
var pool = require('./conexion').pool;

unidadesModel= {};

unidadesModel.getUltimasPosiciones=function(empresa,callback)
{
    pool.getConnection(function(err,connection)
    {
        if (connection) {
          query = "select '' marcado,Vehiculo(u.PK_Unidades) Rastra,Nombre_Vehiculo Vehiculo,VehiculoFull(u.Imei) NombreCompleto ,u.PK_Unidades UnidadId,u.Imei,cn.PK_ConductoresId IdConductor, cn.Nombre Conductor,cn.Apellido apellido,u.FechaCreacion,up.Velocidad,up.Direccion,up.Entradas,up.FechaHora,up.Latitud,up.Longitud,arrow(u.FK_IconoId,ui.url,up.Direccion%360) url,m.Nombre Modelo,up.TramaExtendida,up.Kilometraje km FROM Unidades u INNER JOIN UnidadesIcono ui on u.FK_IconoId = ui.PK_UnidadesIconoId INNER JOIN UnidadesEmpresas ue ON u.PK_Unidades = ue.FK_UnidadId INNER JOIN UltimasPosiciones up ON up.imei = u.imei INNER JOIN ModeloGPS m on u.FK_ModeloId = m.PK_ModeloId INNER JOIN Conductores cn on cn.PK_ConductoresId=u.FK_ConductoresId WHERE ue.FK_EmpresaId = " + (empresa)+" order by u.Nombre_Vehiculo  ";

          connection.query(query, function (error, row) {
                    connection.release();

                    if (error) {
                        callback(error, null)
                    } else {
                        callback(null, row);
                        console.log("unidades ultimas posiciones")

                    }
                });
            }
    });
};

unidadesModel.Update = function(data,imei,callback){
    pool.getConnection(function(err,con){

        if(con){
            query = "Update Unidades set ?  where imei="+imei
            sql = con.format(query,data);

            con.query(sql,function(error,row){
              con.release();
               if(error)
               {
                   callback(error,null);
               } else{
                   callback(null,row);
               }
            });
        }
    });

}


unidadesModel.getDetenidos=function(emp,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query = "select Imei,Fecha,VehiculoFull(Imei) Vehiculo,Ubicacion,Latitud,Longitud from Detenidos where LOCATE('"+emp+"',Empresas(Imei))>0 and GeoCodingParadas(Latitud,Longitud) != 1 and Fecha > CONVERT_TZ(NOW(),'America/Tegucigalpa','UTC')-INTERVAL 36 hour order by Fecha";
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

unidadesModel.crear=function(data,callback)
{
  pool.getConnection(function(err,con){

    if(con){
      query = "insert into Unidades set ? ";
      con.query(query,data,function(error,row){
        connection.release();
        if(error)
        {
            console.log(error);
            callback(error,null);
        } else{
            callback(null,row);
        }
      });
    }
  });
}


unidadesModel.limiteVelocidad= function(emp,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query = "SELECT	VehiculoFull (Imei) Vehiculo,	count(*) Cantidad FROM(select Imei,Hora from LimiteVelocidad lv INNER JOIN Geocerca g ON lv.Geocerca = g.PK_GeocercaId AND g.FK_EmpresaId = 66 where Date(CONVERT_TZ(Hora,'UTC',	'America/Tegucigalpa')) = Date(now()))l where LOCATE('"+emp+"', Empresas(Imei)) > 0 GROUP BY	Imei ORDER BY	Cantidad DESC"
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

unidadesModel.limiteVelocidadAll= function(emp,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query = "select VehiculoFull(Imei) Vehiculo ,l.filtro,l.Geocerca GeoId,l.Hora - interval 6 hour Hora,l.Latitud,l.Longitud,l.Velocidad," +
        "CONVERT (Posiciones USING utf8) Geocerca from (select Imei,Filtro,Hora,Latitud,Longitud,Velocidad,Geocerca from LimiteVelocidad " +
        "where	 Date(CONVERT_TZ(Hora,'UTC',	'America/Tegucigalpa')) = Date(now()))l left JOIN Geocerca g ON l.Geocerca = g.PK_GeocercaId  where  LOCATE('"+emp+"', Empresas(Imei)) > 0  ORDER BY 1 desc";

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


unidadesModel.delete=function(id,callback)
{
  pool.getConnection(function(err,con){

    if(con){
      query = "delete from Unidades where PK_Unidades="+id;
      con.query(query,function(error,row){
        connection.release();
        if(error)
        {
          callback(error,null);
        } else{
          callback(null,row);
        }
      });
    }
  });

}

unidadesModel.getConductores=function(id,callback){
    pool.getConnection(function(err,connection){
        if(connection){
            query="Select cn.PK_ConductoresId idConductor, cn.Nombre nombre, cn.Apellido apellido from Conductores cn where cn.FK_EmpresaId="+id;
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

unidadesModel.unidadesSinReportar= function(callback) {
    pool.getConnection(function (err, connection) {
        if (connection) {

            query="SELECT VehiculoFull(u.imei) Vehiculo, mo.Nombre ModeloGPS, up.FechaHora FROM Unidades u " +
                "left join UltimasPosiciones up on u.imei=up.imei " +
                "left join ModeloGPS mo on mo.PK_ModeloId=u.FK_ModeloId  " +
                "WHERE CONVERT_TZ(FechaHora,'UTC','America/Tegucigalpa') between now()-interval 7 day and now() -interval 15 minute " +
                "ORDER BY FechaHora asc;";

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



unidadesModel.getMayores75= function(emp,callback) {
    pool.getConnection(function (err, connection) {
        if (connection) {


            query="SELECT " +
                  " VEHICULOFULL(Imei) Vehiculo, COUNT(*) Cantidad " +
                  " FROM " +
                  " (SELECT " +
                  "Imei, Hora " +
                  " FROM " +
                  " LimiteVelocidad lv " +
                  " INNER JOIN Geocerca g ON lv.Geocerca = g.PK_GeocercaId " +
                  " AND g.FK_EmpresaId = 66 " +
                  " WHERE " +
                  " lv.Velocidad >= 75 " +
                  " AND DATE(CONVERT_TZ(Hora, 'UTC', 'America/Tegucigalpa')) = DATE(NOW())) l " +
                  " WHERE " +
                  " LOCATE('"+emp+"', EMPRESAS(Imei)) > 0 " +
                  " GROUP BY Imei " +
                  " ORDER BY Cantidad DESC;";


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

unidadesModel.getUnidadesCH=function(callback)
{
    pool.getConnection(function(err,connection)
    {
        if (connection) {
            query = "select '' marcado,Vehiculo(u.PK_Unidades) Rastra,Nombre_Vehiculo Vehiculo,VehiculoFull(u.Imei) NombreCompleto ,u.PK_Unidades UnidadId,u.Imei,cn.PK_ConductoresId IdConductor, cn.Nombre Conductor,cn.Apellido apellido,u.FechaCreacion,up.Velocidad,up.Direccion,up.Entradas,up.FechaHora,up.Latitud,up.Longitud,ui.url,m.Nombre Modelo,up.TramaExtendida,up.Kilometraje km FROM Unidades u INNER JOIN UnidadesIcono ui on u.FK_IconoId = ui.PK_UnidadesIconoId INNER JOIN UnidadesEmpresas ue ON u.PK_Unidades = ue.FK_UnidadId INNER JOIN UltimasPosiciones up ON up.imei = u.imei INNER JOIN ModeloGPS m on u.FK_ModeloId = m.PK_ModeloId INNER JOIN Conductores cn on cn.PK_ConductoresId=u.FK_ConductoresId WHERE ue.FK_EmpresaId = 66 order by u.Nombre_Vehiculo  ";

            connection.query(query, function (error, row) {
                connection.release();

                if (error) {
                    callback(error, null)
                } else {
                    callback(null, row);
                    console.log("unidades ultimas posiciones")

                }
            });
        }
    });
};

unidadesModel.listaUnidadesPorEmpresa = function(callback){
    pool.getConnection(function(err,connection){
        if(connection){
            query = "CALL sp_unidadesXempresas()";
            console.log(query);

            connection.query(query, function (error,response) {
                connection.release();

                if (error) {
                    console.log(error);
                    callback(error, null)
                } else {
                    callback(null, response[0]);
                }
            });
        }
    });
};

module.exports= unidadesModel;
