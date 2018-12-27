var pool = require('./conexion').pool;

var proyeccionplan = {};


proyeccionplan.deleteproyeccionplan = function(PK_Plan, callback)
{
   pool.getConnection( function (error , connection) { 
    if (connection)
    {
       query =  'update ProyeccionPlan set Activo = 0 where PK_Plan = '+ PK_Plan  ; 
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



proyeccionplan.updateproyeccionplan = function( PK_Plan ,Data , callback)
{

    pool.getConnection( function (err , connection) { 

        if(connection){
            connection.query("update ProyeccionPlan set ? where PK_Plan = "+ PK_Plan , Data , function(error , result ) {
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



proyeccionplan.insertproyeccionplan = function(Data , callback)
{
    pool.getConnection( function( err,connection ) { 

         if (connection)
         {

            connection.query("Insert into ProyeccionPlan set ?" , Data , function (error , result){
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



proyeccionplan.getproyeccionplan =function(callback)
{
    pool.getConnection( function ( err , connection )
    {
        if(connection){
         query = "select v.PK_ViajeCompletoId , v.Nombre,  p.PK_Plan , p.Destino, p.Dia, p.Fecha, p.TotalUnidades, p.Recarga, p.CantidadRecarga, p.FK_ViajeCompleto ,  case p.Activo when 1 then 'activo' else 'inactivo' end as Activo from ProyeccionPlan p inner join ViajeCompleto v on p.FK_ViajeCompleto = v.PK_ViajeCompletoId where p.Fecha BETWEEN DATE( NOW() - interval 1 DAY  ) and DATE( NOW() + interval 1 DAY  )  ;" ;

         connection.query( query , function (error , row ){
            connection.release() ;

            if(error) {
                callback(error , null) 
            } else {
                callback(null , row) ;
                console.log("se muestra la proyeccion plan") ; 
            }

         });

        }

    });
  

} ;



module.exports=  proyeccionplan ; 