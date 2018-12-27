var pool = require('./conexion').pool;

var tipofalla = {};



tipofalla.updatetipofalla = function( Pk_tipofalla ,Data , callback)
{

    pool.getConnection( function (err , connection) { 

        if(connection){
            connection.query("update TipoFalla set ? where Pk_tipofalla = "+ Pk_tipofalla , Data , function(error , result ) {
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



tipofalla.deletetipofalla = function(Pk_tipofalla, callback)
{
   pool.getConnection( function (error , connection) { 
    if (connection)
    {
       query =  'update TipoFalla set Activo = 0   where Pk_tipofalla = '+ Pk_tipofalla  ; 
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


tipofalla.inserttipofalla = function(Data , callback)
{
    pool.getConnection( function( err,connection ) { 

         if (connection)
         {

            connection.query("Insert into TipoFalla set ?" , Data , function (error , result){
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



tipofalla.gettipofalla =function(callback)
{
    pool.getConnection( function ( err , connection )
    {
        if(connection){
         query = "select Pk_tipofalla , Falla ,Descripcion , case Activo when 1 then 'ACTIVO' else 'INACTIVO' end 'ACTIVO'  from TipoFalla ;"
        
         connection.query( query , function (error , row ){
            connection.release() ;

            if(error) {
                callback(error , null) 
            } else {
                callback(null , row) ;
                console.log("se muestra los Tipos de fallas ") ; 
            }

         });

        }

    });
  

} ;


module.exports=  tipofalla ; 