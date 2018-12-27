var pool = require('./conexion').pool;

var estadosunidades = {};



estadosunidades.updateestadosunidades = function( PK_Estado ,Data , callback)
{

    pool.getConnection( function (err , connection) { 

        if(connection){
            connection.query("update EstadosUnidades set ? where   PK_Estado = "+ PK_Estado , Data , function(error , result ) {
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



estadosunidades.deleteestadosunidades = function(PK_Estado, callback)
{
   pool.getConnection( function (error , connection) { 
    if (connection)
    {
       query =  'update EstadosUnidades set Activo = 0   where PK_Estado = '+ PK_Estado  ; 
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


estadosunidades.insertestadosunidades = function(Data , callback)
{
    pool.getConnection( function( err,connection ) { 

         if (connection)
         {

            connection.query("Insert into EstadosUnidades set ?" , Data , function (error , result){
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



estadosunidades.getestadosunidades =function(callback)
{
    pool.getConnection( function ( err , connection )
    {
        if(connection){
  query = "select PK_Estado , Estado , Observacion ,  case Activo when 1 then 'activo' else 'inactivo' end as Activo  from EstadosUnidades ";

         connection.query( query , function (error , row ){
            connection.release() ;

            if(error) {
                callback(error , null) 
            } else {
                callback(null , row) ;
                console.log("se muestra los Estadosunidades") ; 
            }

         });

        }

    });
  

} ;



module.exports= estadosunidades ; 
