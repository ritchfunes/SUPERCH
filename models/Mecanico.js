var pool = require('./conexion').pool ;
var mecanico =  {} ;


mecanico.updatemecanico = function(PK_Mantenimiento , Data , callback)
{
    pool.getConnection(function(error , connection){
        if(connection)
        {
            connection.query("update Mecanico  set ? where PKMecanico = "+PKMecanico , Data , function(error , result){ 
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

mecanico.deletmecanico = function(PK_Mantenimiento , callback)
{
    pool.getConnection(function(error , connection ){
        if(connection)
        {
            query = "update Mecanico set Activo = 0 where PKMecanico = "+PKMecanico ;
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

mecanico.insertmecanico = function(Data , callback)
{
 pool.getConnection(function (err , connection){
    if(connection)
    {
        
        connection.query("Insert into Mecanico set ?", Data , function(error , result){
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


mecanico.getmecanico = function( callback )
{
    pool.getConnection(function (err , connection )
    {

        if(connection){
            query = " select PKMecanico , Nombre , Apellido , Telefono , Direccion ,FKTaller ,Identidad , FKEstado ,case m.Activo when '1' then 'ACTIVO' ELSE 'INACTIVO' END 'Activo' , eu.Estado from Mecanico m "+
           " inner join EstadosUnidades eu on eu.PK_Estado = m.FKEstado ;" ;
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

module.exports = mecanico ;