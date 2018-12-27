var pool = require('./conexion').pool;

var unidadesdisponibles = {};


unidadesdisponibles.getDisponibilidadunidadessemanal =function( data , callback)
{
    pool.getConnection( function ( err , connection )
    {
        if(connection){
         query = "select " + 
       "  Fk_estado   , "+ 
        "  MAX(eu.Estado ) as 'estado' , "+ 
       "  SUM(CASE WHEN WEEKDAY( Fecha) = 6 THEN Cantidad ELSE 0 END) AS 'Domingo' , "+
       "  SUM(CASE WHEN WEEKDAY( Fecha) = 0 THEN Cantidad ELSE 0 END) AS 'Lunes' , "+
      "   SUM(CASE WHEN WEEKDAY( Fecha) = 1 THEN Cantidad ELSE 0 END) AS 'Martes' , " +
       "  SUM(CASE WHEN WEEKDAY( Fecha) = 2 THEN Cantidad ELSE 0 END) AS 'Miecoles' , " +
       "  SUM(CASE WHEN WEEKDAY( Fecha) = 3 THEN Cantidad ELSE 0 END) AS 'Jueves' , "  +
       "  SUM(CASE WHEN WEEKDAY( Fecha) = 4 THEN Cantidad ELSE 0 END) AS 'Viernes' , " +
       "  SUM(CASE WHEN WEEKDAY( Fecha) = 5 THEN Cantidad ELSE 0 END) AS 'Sabado'  " +     
       "   from  Disponibilidadunidadessemanal d  " +
       "  INNER JOIN EstadosUnidades eu on eu.PK_Estado =  d.Fk_estado  "+
        " where   WEEK( Fecha) = "+ data.Semana+ 
        " group by Fk_estado "

         connection.query( query , function (error , row ){
            connection.release() ;

            if(error) {
                callback(error , null) 
            } else {
                callback(null , row) ;
                console.log("se muestra los unidadesdisponibles") ; 
            }

         });

        }

    });
  

} ;



// tabla Disponibilidadunidadessemanal disponibilidad de unidades por semana 
unidadesdisponibles.insertDisponibilidadunidadessemanal =function(callback)
{
    pool.getConnection( function ( err , connection )
    {
        if(connection){
         query = "call SpDisponibilidadunidadesxsemana()" ;

         connection.query( query , function (error , row ){
            connection.release() ;

            if(error) {
                callback(error , null) 
            } else {
                callback(null , row) ;
                console.log("se muestra los unidadesdisponibles") ; 
            }

         });

        }

    });
  

} ;



unidadesdisponibles.updateunidadesdisponibles = function( PK_UnidadesDisponibles ,Data , callback)
{

    pool.getConnection( function (err , connection) { 

        if(connection){
            connection.query("update UnidadesDisponibles set ? where   PK_UnidadesDisponibles = "+ PK_UnidadesDisponibles , Data , function(error , result ) {
                connection.release() ;
                if(error ){
                    console.log(error) ; 
                    callback(error , null ) ; 
                }else 
                {
                    callback( null, result) ;
                }

            } );
        }
    }) ;
   
}



unidadesdisponibles.deleteunidadesdisponibles = function(PK_UnidadesDisponibles, callback)
{
   pool.getConnection( function (error , connection) { 
    if (connection)
    {
       query =  'update UnidadesDisponibles set Activo = 0  where PK_UnidadesDisponibles = '+ PK_UnidadesDisponibles  ; 
       connection.query( query , function (error , result ){
       connection.release() ;

       if(error )
       {
           callback(error , null) ; 
       }
       else {
           callback( null , { result : result } ) ;
           
       }

       }) ;
    }

   }) ;
} 


unidadesdisponibles.insertunidadesdisponibles = function(Data , callback)
{
    pool.getConnection( function( err,connection ) { 

         if (connection)
         {

            connection.query("Insert into UnidadesDisponibles set ?" , Data , function (error , result){
            connection.release();
            if(error ){
                callback(error , null) ;     
            }
            else {
                callback(null , result) ; 
            }
            } ) ;

         }
    }) ; 

}



unidadesdisponibles.getunidadesdisponibles =function(callback)
{
    pool.getConnection( function ( err , connection )
    {
        if(connection){
         query = "select Rastra(u.imei) as 'Rastra' , u.PK_Unidades, u.Nombre_Vehiculo ,  p.Estado ,  p.PK_UnidadesDisponibles , p.FK_Estado , p.Estado , p.Comentario , p.FechaEntrega , p.FechaAsignacion , p.FK_Empresa, p.FK_Unidades, e.Estado,"+
         " case p.Activo when 1 then 'activo' else 'inactivo' end as Activo from UnidadesDisponibles p inner join  EstadosUnidades e on e.PK_Estado = p.FK_Estado"+
         " inner join Unidades u on u.PK_Unidades = p.FK_Unidades " ;

         connection.query( query , function (error , row ){
            connection.release() ;

            if(error) {
                callback(error , null) 
            } else {
                callback(null , row) ;
                console.log("se muestra los unidadesdisponibles") ; 
            }

         });

        }

    });
  

} ;


unidadesdisponibles.getunidadesdisponiblesonline =function(callback)
{
    pool.getConnection( function ( err , connection )
    {
        if(connection){
         query = "select Rastra(u.imei) as 'Rastra' , u.PK_Unidades, u.Nombre_Vehiculo ,  p.Estado ,  p.PK_UnidadesDisponibles , p.FK_Estado , p.Estado , p.Comentario , p.FechaEntrega , p.FechaAsignacion , p.FK_Empresa, p.FK_Unidades, e.Estado,"+
         " case p.Activo when 1 then 'activo' else 'inactivo' end as Activo from UnidadesDisponibles p inner join  EstadosUnidades e on e.PK_Estado = p.FK_Estado"+
         " inner join Unidades u on u.PK_Unidades = p.FK_Unidades where p.FK_Estado = 1 " ;

         connection.query( query , function (error , row ){
            connection.release() ;

            if(error) {
                callback(error , null) 
            } else {
                callback(null , row) ;
                console.log("se muestra los unidadesdisponibles") ; 
            }

         });

        }

    });
  

} ;


module.exports=  unidadesdisponibles ; 