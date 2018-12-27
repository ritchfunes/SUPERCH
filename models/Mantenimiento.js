var pool = require('./conexion').pool ;
var mantenimiento =  {} ;


mantenimiento.updatemantenimiento = function(PK_Mantenimiento , Data , callback)
{
    pool.getConnection(function(error , connection){
        if(connection)
        {
            connection.query("update Mantenimiento  set ? where PK_Mantenimiento = "+PK_Mantenimiento , Data , function(error , result){ 
            connection.release(); 
            if(error)
            {
                console.log(error) ;
                callback(error , null);
            } else {
                callback(null , result) ;
            }

         });

      }

    });
}

mantenimiento.deletemantenimiento = function(PK_Mantenimiento , callback)
{
    pool.getConnection(function(error , connection ){
        if(connection)
        {
            query = "update Mantenimiento set Activo = 0 where PK_Mantenimiento = "+PK_Mantenimiento ;
            connection.query(query , function(error , result ){ 
                connection.release() ; 
                if(error)
                {
                    callback(error, null);
                } else {
                    callback(null , { result : result } ) ;
                }
            } );
        }

    } ) ;
}

mantenimiento.insertmantenimiento = function(Data , callback)
{
 pool.getConnection(function (err , connection){
    if(connection)
    {
        
        connection.query("Insert into Mantenimiento set ?", Data , function(error , result){
            connection.release() ;
            if(error)
            {
                callback(error , null );
            } else {
                callback(null , result);
            }

        }) ; 
    }

 }) ; 
}


mantenimiento.getmantenimiento = function( callback )
{
    pool.getConnection(function (err , connection )
    {

        if(connection){
            query = "select CASE m.Activo WHEN '1' THEN 'ACTIVO' ELSE 'INACTIVO' END AS 'ACTIVO' , PK_Mantenimiento , Planificado as 'PLANIFICADO' , Fecha_Planificacion, "+
        "CASE Carburante WHEN 1 THEN 'Diesel' WHEN 2 THEN 'Gasolina' else  'LPG' END 'CARBURANTE' , Tipo_Mantenimiento "+
        " , m.FK_TipoFalla , m.FK_ModeloUnidades , Kilometraje , Categoria , Motivo , Fecha_Ingreso , "+
        "   Fecha_Entrega , m.FK_Conductores , Observaciones , m.FK_Mecanico , Anio , c.Nombre as 'CONDUCTORES', c.Apellido as 'conduape', tf.Falla ,"+
        "    mu.Imei , u.Nombre_Vehiculo , mec.Nombre as 'MECANICO' , mec.Apellido as 'MECANICOAPE' from Mantenimiento m "+
        "   INNER JOIN Conductores c on c.PK_ConductoresId = m.FK_Conductores " +
        "   INNER JOIN TipoFalla tf on tf.Pk_tipofalla = m.FK_TipoFalla "+
        "   INNER JOIN ModeloUnidades mu on mu.PK_ModeloUnidades = m.FK_ModeloUnidades "+
        "   inner join Unidades u on u.imei = mu.Imei "+
        "   inner join Mecanico mec on mec.PKMecanico = m.FK_Mecanico ;";
            connection.query(query , function(error , row ) {
                connection.release() ; 
            if(error ){
                callback(error , null );
            } else {
                callback(null , row);
                console.log("se muestran los ") ;

            }

            }) ;
        }

     }) ;
} ;

module.exports = mantenimiento ;