var pool = require('./conexion').pool;

var modelounidad = {};



modelounidad.updatemodelounidad = function( PK_ModeloUnidades ,Data , callback)
{

    pool.getConnection( function (err , connection) { 

        if(connection){
            connection.query("update ModeloUnidades set ? where PK_ModeloUnidades = "+ PK_ModeloUnidades , Data , function(error , result ) {
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



modelounidad.deletemodelounidad = function(PK_ModeloUnidades, callback)
{
   pool.getConnection( function (error , connection) { 
    if (connection)
    {
       query =  'update ModeloUnidades set Activo = 0   where PK_ModeloUnidades = '+ PK_ModeloUnidades  ; 
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


modelounidad.insertmodelounidad = function(Data , callback)
{
    pool.getConnection( function( err,connection ) { 

         if (connection)
         {

            connection.query("Insert into ModeloUnidades set ?" , Data , function (error , result){
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



modelounidad.getmodelounidad =function(callback)
{
    pool.getConnection( function ( err , connection )
    {
        if(connection){
         query = " select    vmod.pk_ModeloVehiculo , vmod.Modelo , vmar.Descripcion, vmar.PK_MarcaVehiculo , "+
         " mu.PK_ModeloUnidades , mu.Imei , u.Nombre_Vehiculo ,   mu.FK_ModeloVehiculo , " +
         " case mu.Activo when 1 then 'ACTIVO' else 'INACTIVO' end 'Activo'  , mu.Year , " +
         " mu.FK_EstadoUnidad, eu.PK_Estado , eu.Estado  from ModeloUnidades mu " +
         " inner join Unidades u on u.Imei = mu.Imei  " +
         " inner join EstadosUnidades eu on eu.PK_Estado = mu.FK_EstadoUnidad " +
         " inner join ModeloVehiculo vmod on vmod.pk_ModeloVehiculo = mu.FK_ModeloVehiculo " +
         " inner join MarcaVehiculo vmar on vmar.PK_MarcaVehiculo = vmod.FK_MarcaVehiculo " +
         " ;" 
        
         connection.query( query , function (error , row ){
            connection.release() ;

            if(error) {
                callback(error , null) 
            } else {
                callback(null , row) ;
                console.log("se muestra los modelos de unidades") ; 
            }

         });

        }

    });
  

} ;


module.exports=  modelounidad ; 