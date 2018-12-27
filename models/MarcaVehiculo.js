var pool = require('./conexion').pool;

var marcavehiculo = {};



marcavehiculo.updatemarcavehiculo = function( PK_MarcaVehiculo ,Data , callback)
{

    pool.getConnection( function (err , connection) { 

        if(connection){
            connection.query("update MarcaVehiculo set ? where PK_MarcaVehiculo = "+ PK_MarcaVehiculo , Data , function(error , result ) {
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



marcavehiculo.deletemarcavehiculo = function(PK_MarcaVehiculo, callback)
{
   pool.getConnection( function (error , connection) { 
    if (connection)
    {
       query =  'update MarcaVehiculo set Activo = 0   where PK_MarcaVehiculo = '+ PK_MarcaVehiculo  ; 
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


marcavehiculo.insertmarcavehiculo = function(Data , callback)
{
    pool.getConnection( function( err,connection ) { 

         if (connection)
         {

            connection.query("Insert into MarcaVehiculo set ?" , Data , function (error , result){
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



marcavehiculo.getmarcavehiculo =function(callback)
{
    pool.getConnection( function ( err , connection )
    {
        if(connection){
         query = "select PK_MarcaVehiculo , TipoVehiculo , Descripcion , case Activo when 1 then 'ACTIVO' else 'INACTIVO' end 'Activo'  from MarcaVehiculo ;"
        
         connection.query( query , function (error , row ){
            connection.release() ;

            if(error) {
                callback(error , null) 
            } else {
                callback(null , row) ;
                console.log("se muestra las marcas de vehiculos") ; 
            }

         });

        }

    });
  

} ;


module.exports=  marcavehiculo ; 