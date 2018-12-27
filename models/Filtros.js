/**
 * Created by Walter Suazo on 10/11/2015.
 */

var pool = require('./conexion').pool;

Filtros = {}


Filtros.getFiltros=function(empresa,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {

      query = " SELECT	f.PK_FiltroId FiltroId,f.Nombre,	f.Correos,	f.d1,	f.d2,	f.d3,	f.d4,	f.d5,	f.d6,  "+
        " 	f.d7,	time (f.HoraDesde) Desde,	time (f.HoraHasta) Hasta,	g.PK_GeocercaId,	f.Frecuencia,	f.TipoEntrada,	f.TipoSalida,	f.TipoVelocidad, "+
        " 	f.TipoPermanencia,f.VelocidadMax,	f.VelocidadMin,	f.Tiempo,	u.imei,	u.PK_Unidades UnidadId,	u.Nombre_Vehiculo "+
        " FROM	Filtros f INNER JOIN UniFiltros uf INNER JOIN GeoFiltros gf " +
        " INNER JOIN Geocerca g INNER JOIN Unidades u ON f.PK_FiltroId = uf.FK_FiltroId AND f.PK_FiltroId = gf.FK_FiltroId "+
        "AND uf.FK_UnidadId = u.PK_Unidades AND gf.FK_GeocercaId = g.PK_GeocercaId where f.FK_empresaId="+empresa
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

Filtros.CreateFiltro=function(data,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query ="insert into Filtros set ?"
      console.log(query);
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

Filtros.deleteGeocercas=function(dataDelete,callback){
  pool.getConnection(function(err,connection){
    if(connection){
      var query="delete from GeoFiltros where (FK_FiltroId,FK_GeocercaId) in ("+dataDelete+");";
      console.log(query);
      connection.query(query, function (error,result) {
        connection.release();
        if (error){
          console.log(error)
          callback(error,null);
        }else{
          callback(null,result);
        }
      });
    }
  });
}

Filtros.GeoFiltro=function(data,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query ="insert into GeoFiltros (FK_FiltroId,FK_GeocercaId) values "+data
          +" on duplicate key update FK_FiltroId=FK_FiltroId;"
      console.log(query)
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

Filtros.deleteUnidades=function(dataDelete,callback){
  pool.getConnection(function(err, connection){
    if(connection){
      var query="delete from UniFiltros where (FK_FiltroId,FK_UnidadId) in ("+dataDelete+");";
      console.log(query);
      connection.query(query, function(error,result){
        connection.release();
        if(error){
          console.log(error)
          callback(error,null);
        }else{
          callback(null,result);
        }
      });
    }
  });
}

Filtros.UniFiltro=function(data,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query ="insert into UniFiltros (FK_FiltroId,FK_UnidadId) values "+data
          +" on duplicate key update FK_UnidadId=FK_UnidadId;;"
      console.log(query)

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

Filtros.DeleteFiltros=function(id,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      query ="delete from Filtros where PK_FiltroId=?"
      connection.query(query,id, function (error, row) {
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

Filtros.UpdateFiltros=function(id,data,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (connection) {
      //query ="update Filtros set ? where PK_FiltroId="+id;
      query="CALL sp_actualizarFiltro('"+data.unidades+"','"+data.deleteUnidades+"'," +
          "'"+data.geocercas+"','"+data.deleteGeocercas+"',"+id+","+data.empresa+"," +
          "'"+data.nombre+"','"+data.Descripcion+"','"+data.Correos+"'," +
          data.TipoPermanencia+","+data.TipoVelocidad+","+data.TipoEntrada+","+data.TipoSalida+","+data.d1+"," +
          data.d2+","+data.d3+","+data.d4+","+data.d5+","+data.d6+","+data.d7+",'"+data.HoraDesde+"','"+data.HoraHasta+"'," +
          data.Tiempo+","+data.VelocidadMax+","+data.VelocidadMin+","+data.Frecuencia+")";
      console.log(query);
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
module.exports= Filtros;
