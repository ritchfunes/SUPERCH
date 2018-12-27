var pool = require('./conexion').pool;

var taller = {};



taller.updatetaller = function( PKTaller ,Data , callback)
{

    pool.getConnection( function (err , connection) { 

        if(connection){
            connection.query("update Taller set ? where PKTaller = "+ PKTaller , Data , function(error , result ) {
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



taller.deleteTaller = function(PKTaller, callback)
{
   pool.getConnection( function (error , connection) { 
    if (connection)
    {
       query =  'update Taller set Activo = 0   where PKTaller = '+ PKTaller  ; 
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


taller.inserttaller = function(Data , callback)
{
    pool.getConnection( function( err,connection ) { 

         if (connection)
         {

            connection.query("Insert into Taller set ?" , Data , function (error , result){
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



taller.getttaller =function(callback)
{
    pool.getConnection( function ( err , connection )
    {
        if(connection){
         query = "select PKTaller , NombreCorto ,NombreLargo , case Activo when 1 then 'ACTIVO' else 'INACTIVO' end 'ACTIVO'  from Taller ;"
        
         connection.query( query , function (error , row ){
            connection.release() ;

            if(error) {
                callback(error , null) 
            } else {
                callback(null , row) ;
                console.log("se muestra las  ") ; 
            }

         });

        }

    });
  

} ;


module.exports=  taller ; 