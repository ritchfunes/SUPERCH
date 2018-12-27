var pool = require('./conexion').pool;

var proyeccionplanunidades = {};


proyeccionplanunidades.deleteproyeccionplanunidades = function(PK_PlanUnidades, callback)
{
   pool.getConnection( function (error , connection) { 
    if (connection)
    {
       query =  'update ProyeccionPlanUnidades set Activo = 0  where PK_PlanUnidades = '+ PK_PlanUnidades  ; 
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


proyeccionplanunidades.updateproyeccionplanunidades = function( PK_PlanUnidades ,Data , callback)
{

    pool.getConnection( function (err , connection) { 

        if(connection){
            connection.query("update ProyeccionPlanUnidades set ? where PK_PlanUnidades = "+ PK_PlanUnidades , Data , function(error , result ) {
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



proyeccionplanunidades.insertproyeccionplanunidades = function(Data , callback)
{
    pool.getConnection( function( err,connection ) { 

         if (connection)
         {

            connection.query("Insert into ProyeccionPlanUnidades set ?" , Data , function (error , result){
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



proyeccionplanunidades.getproyeccionplanunidades =function(callback)
{
    pool.getConnection( function ( err , connection )
    {
        if(connection){
         query = "select e.Estado , e.PK_Estado,  p.PK_PlanUnidades, p.FK_Estado,  p.Cantidad , p.Fecha , case p.Activo when 1 then 'activo' else 'inactivo' end as Activo, case p.Cabezal when 1 then 'Cabezal' else 'Furgon' end as Cabezal  from ProyeccionPlanUnidades p  inner join EstadosUnidades e on e.PK_Estado = p.FK_Estado" ;

         connection.query( query , function (error , row ){
            connection.release() ;

            if(error) {
                callback(error , null) 
            } else {
                callback(null , row) ;
                console.log("se muestra la proyeccion plan unidades") ; 
            }

         });

        }

    });
  

} ;



module.exports=  proyeccionplanunidades ; 