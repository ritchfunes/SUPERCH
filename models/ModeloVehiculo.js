var pool = require('./conexion').pool;

var modelovehiculo = {};



modelovehiculo.updatemodelovehiculo = function( pk_ModeloVehiculo ,Data , callback)
{

    pool.getConnection( function (err , connection) { 

        if(connection){
            connection.query("update ModeloVehiculo set ? where pk_ModeloVehiculo = "+ pk_ModeloVehiculo , Data , function(error , result ) {
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



modelovehiculo.deletemodelovehiculo = function(pk_ModeloVehiculo, callback)
{
   pool.getConnection( function (error , connection) { 
    if (connection)
    {
       query =  'update ModeloVehiculo set Activo = 0   where pk_ModeloVehiculo = '+ pk_ModeloVehiculo  ; 
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


modelovehiculo.insertmodelovehiculo = function(Data , callback)
{
    pool.getConnection( function( err,connection ) { 

         if (connection)
         {

            connection.query("Insert into ModeloVehiculo set ?" , Data , function (error , result){
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



modelovehiculo.getmodelovehiculo =function(callback)
{
    pool.getConnection( function ( err , connection )
    {
        if(connection){
         query = "select mo.pk_ModeloVehiculo , mo.Modelo , ma.Descripcion , ma.TipoVehiculo , ma.PK_MarcaVehiculo , mo.FK_MarcaVehiculo ,  case mo.Activo when 1 then 'ACTIVO' else 'INACTIVO' end 'Activo'  from ModeloVehiculo mo  inner join MarcaVehiculo ma on ma.PK_MarcaVehiculo = mo.FK_MarcaVehiculo ;"
        
         connection.query( query , function (error , row ){
            connection.release() ;

            if(error) {
                callback(error , null) 
            } else {
                callback(null , row) ;
                console.log("se muestra los modelos de vehiculos") ; 
            }

         });

        }

    });
  

} ;


module.exports=  modelovehiculo ; 