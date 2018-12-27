var pool = require('./conexion').pool;

var turnos= {};


turnos.getturnos =function(callback)
{
    pool.getConnection( function ( err , connection )
    {
        if(connection){
         query = "select PK_Turno, Turno , Descripcion , HoraInicio , HoraFin , case Activo when 1 then 'activo' else 'inactivo' end as Activo from Turnos" ;

         connection.query( query , function (error , row ){
            connection.release() ;

            if(error) {
                callback(error , null) 
            } else {
                callback(null , row) ;
                console.log("se muestra los turnos") ; 
            }

         });

        }

    });
  

} ;

turnos.updateturno = function( PK_Turno ,Data , callback)
{

    pool.getConnection( function (err , connection) { 

        if(connection){
            connection.query("update Turnos set ? where   PK_Turno = "+ PK_Turno , Data , function(error , result ) {
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


turnos.insertturno = function(Data , callback)
{
    pool.getConnection( function( err,connection ) { 

         if (connection)
         {

            connection.query("Insert into Turnos set ?" , Data , function (error , result){
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

turnos.deleteturno = function(PK_Turno, callback)
{
   pool.getConnection( function (error , connection) { 
    if (connection)
    {
       query =  'update Turnos set Activo = 0 where PK_Turno = '+ PK_Turno  ; 
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




turnos.getturno = function(pkturno, callback)
{
   pool.getConnection( function (err , connection) { 
    if (connection)
    {
       query =  'select PK_Turno, Turno , Descripcion , HoraInicio , HoraFin from Turnos where PK_Turno = '+ pkturno  ; 
       connection.query( query , function (error , row ){
       connection.release() ;

       if(error )
       {
        console.log('error');
           callback(error , null) ; 
       }
       else {
        callback(null, row[0]);
    //   callback( null , row) ;
           console.log("se muestra un turno");
       }

       }) ;
    }

   }) ;

} ;


module.exports= turnos ; 