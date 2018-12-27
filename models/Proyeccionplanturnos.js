var pool = require('./conexion').pool;

var proyeccionplanturnos = {};


proyeccionplanturnos.updateproyeccionplanturnos = function( PK_PlanTurnos ,Data , callback)
{

    pool.getConnection( function (err , connection) { 

        if(connection){
            connection.query("update ProyeccionPlanTurnos set ? where   PK_PlanTurnos = "+ PK_PlanTurnos , Data , function(error , result ) {
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

proyeccionplanturnos.deleteproyeccionplanturnos = function(PK_PlanTurnos, callback)
{
   pool.getConnection( function (error , connection) { 
    if (connection)
    {
       query =  'update ProyeccionPlanTurnos set Activo = 0 where PK_PlanTurnos = '+ PK_PlanTurnos  ; 
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



proyeccionplanturnos.insertproyeccionplanturnos = function(Data , callback)
{
    pool.getConnection( function( err,connection ) { 

         if (connection)
         {

            connection.query("Insert into ProyeccionPlanTurnos set ?" , Data , function (error , result){
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



proyeccionplanturnos.getproyeccionplanturnos =function(callback)
{
    pool.getConnection( function ( err , connection )
    {
        if(connection){
 query = "select  t.PK_Turno, p.FK_Turno, t.Descripcion , p.PK_PlanTurnos, p.Cantidad , p.Fecha , case p.Real when 1 then 'Real' else 'estimado' end as 'Real' , case p.Activo when 1 then 'activo' else 'inactivo' end as Activo , p.Cumplimiento , case  when p.Cantidad <= p.Cumplimiento  then 'cumplida' else 'no cumplida' end  as meta  from ProyeccionPlanTurnos p inner join Turnos t on t.PK_Turno = p.FK_Turno where Fecha  BETWEEN  DATE_SUB( UTC_TIMESTAMP(),INTERVAL 1 MONTH) and DATE_ADD(UTC_TIMESTAMP() ,INTERVAL 2 DAY) order by Fecha desc " ;

         connection.query( query , function (error , row ){
            connection.release() ;

            if(error) {
                callback(error , null) 
            } else {
                callback(null , row) ;
                console.log("se muestra los proyeccionplanturnos") ; 
            }

         });

        }

    });
  

} ;



module.exports=  proyeccionplanturnos ; 