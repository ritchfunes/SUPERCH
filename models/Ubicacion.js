var pool = require('./conexion').pool ;
var ubicacion =  {} ;


ubicacion.updateubicacion = function(PKUbicacion , Data , callback)
{
    pool.getConnection(function(error , connection){
        if(connection)
        {
            connection.query("update Ubicacion  set ? where PKUbicacion = "+PKUbicacion , Data , function(error , result){ 
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

ubicacion.deleteubicacion = function(PKUbicacion , callback)
{
    pool.getConnection(function(error , connection ){
        if(connection)
        {
            query = "update Ubicacion set Activo = 0 where PKUbicacion = "+PKUbicacion ;
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

ubicacion.insertubicacion = function(Data , callback)
{
 pool.getConnection(function (err , connection){
    if(connection)
    {
        
        connection.query("Insert into Ubicacion set ?", Data , function(error , result){
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


ubicacion.getubicacion = function( callback )
{
    pool.getConnection(function (err , connection )
    {

        if(connection){
            query = " select u.PKUbicacion , u.Codigo , u.Descripcion , u.FKTaller , t.NombreCorto , t.PKTaller , case u.Activo when 1 then 'ACTIVO'  else 'INACTIVO' END 'ACTIVO'  from Ubicacion u "+
            " inner join Taller t on t.PKTaller = u.FKTaller ;";
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

module.exports = ubicacion ;