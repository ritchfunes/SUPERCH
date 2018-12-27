
SabuesoAPP.controller("ProyeccionPlanTurnosCtrl",function($scope,  FactoryProyeccionPlanTurnos,ServiceProyeccionPlanTurnos, $uibModal)
{
 

  //Editar estado unidad
  $scope.modificarPlanTurnos = function(planturnos){
    var modalInstance = $uibModal.open({
      animation:true,
      templateUrl: 'components/Proyeccionplanturnos/Editplanturno.html',
     controller: 'editarplanturnosCtrl',
      size:'lg',
      resolve: {
        planturnos: function(){
          return planturnos;
        }
      }
    });

    

    modalInstance.result.then(function(newplanturnos){
        console.log(newplanturnos) ; 
      if(typeof newplanturnos !== 'undefined'){
        idx = _.findIndex(ServiceProyeccionPlanTurnos.listaProyeccionPlanTurnos, planturnos );
        ServiceProyeccionPlanTurnos.listaProyeccionPlanTurnos[idx] = newplanturnos;
      }
    });        
 
}


    $scope.showform = function(){
        var modalInstance = $uibModal.open({
            animation:true,
            templateUrl: 'components/Proyeccionplanturnos/Createplanturno.html',
            controller: 'guardarProyeccionTurnosctrl',
            size:'lg',
            resolve: {
              funcion: function(){
                return [];
              }
            }
          });
    
        modalInstance.result.then(function(){
            ServiceProyeccionPlanTurnos.listaProyeccionPlanTurnos = [];
            $scope.listarProyeccionPlanTurnos();
        });
    }
    

    
 $scope.eliminarPlanturnos = function(elemento, idproyeccionplanturnos)
 {
    FactoryProyeccionPlanTurnos.eliminar({PK_PlanTurnos:idproyeccionplanturnos}).then(function(d)
     {
         if(d.data.msg == true){
 
             var index = ServiceProyeccionPlanTurnos.listaProyeccionPlanTurnos.indexOf(elemento);
             ServiceProyeccionPlanTurnos.listaProyeccionPlanTurnos.splice(index,1);
             ServiceProyeccionPlanTurnos.listaProyeccionPlanTurnos = [];
             $scope.listarProyeccionPlanTurnos() ; 
 
             $.bootstrapGrowl("proyeccion plan turno inactivada exitosamente!!!", {type: 'success',delay: 120000});
         }
         else{
             $.bootstrapGrowl("Error,plan turno no se ha eliminado", {type: 'danger',delay: 120000});
         }
     });
 }
 

 

 
  //Funcion para listar loa Estadosunidades en el modal
  $scope.listarProyeccionPlanTurnos = function()
  {
    if(ServiceProyeccionPlanTurnos.listaProyeccionPlanTurnos.length == 0)
    {
        FactoryProyeccionPlanTurnos.getProyeccionPlanTurnos().then( function(d) {
            ServiceProyeccionPlanTurnos.listaProyeccionPlanTurnos = d.data.info ;
         //   console.log(d.data.info) ;
         } ) ; 
    }

  }

  
  $scope.cambiofecha = function()
  {
    $scope.Filtrofecha = moment($scope.Filtrofecha).format('YYYY-MM-DD')
    console.log($scope.Filtrofecha) ;

  }


  
  $scope.listaProyeccionPlanTurnos = function()
  {
      return ServiceProyeccionPlanTurnos.listaProyeccionPlanTurnos;
  }
    
}) ;


SabuesoAPP.controller('guardarProyeccionTurnosctrl', function($scope, $uibModalInstance, ServiceProyeccionPlanTurnos, FactoryProyeccionPlanTurnos)
{

    
  $scope.listaTurnos = function()
  {
      //console.log(ServiceProyeccionPlanTurnos.listaTurnos)
      return ServiceProyeccionPlanTurnos.listaTurnos;
  }


    $scope.init= function () {
        FactoryProyeccionPlanTurnos.Obtenerturnos().then(function (res) {
            if(res.data.msg==true){
                ServiceProyeccionPlanTurnos.listaTurnos=res.data.info;
            }
        });

        //Parametros
        $scope.planTurnoFK_Turno;
        $scope.planTurnoCantidad;
        $scope.planTurnoFecha  ;
    };

    
  $scope.guardarPlanturnos = function(){

    
    
      var data = {
          
        FK_Turno:$scope.planTurnoFK_Turno.PK_Turno,
      // FK_Turno: 2,
        Cantidad:$scope.planTurnoCantidad,
          Fecha:moment($scope.planTurnoFecha).format('YYYY-MM-DD'),
        //  HoraInicio:moment($scope.HoraInicioTurnos).format('HH:mm:a'), 
        //  HoraFin: moment( $scope.HoraFinTurnos).format('HH:mm:a') , 
          Real: 1 ,
          Activo: 1 ,
          Cumplimiento: 0 
       

      };
  
     console.log(data);

     
      FactoryProyeccionPlanTurnos.guardar(data).then( function(d) {
  
          if( d.data.msg == true )
          {
              data = {
                FK_Turno:$scope.planTurnoFK_Turno,
                Cantidad:$scope.planTurnoCantidad,
                Fecha:moment($scope.planTurnoFecha).format('yyyy-MM-DD'),
              //  HoraInicio:moment($scope.HoraInicioTurnos).format('HH:mm:a'), 
              //  HoraFin: moment( $scope.HoraFinTurnos).format('HH:mm:a') , 
                Real: 1 ,
                Activo: 1 , 
                Cumplimiento: 0 

              };
              
              $.bootstrapGrowl("plan turno guardado exitosamente!!!", {type: 'success',delay: 120000});
  
         
              $scope.planTurnoCantidad = "" ; 
              $scope.planTurnoFecha = "" ;           
              $uibModalInstance.close();
              
             
              
    
          }
          else {
              $.bootstrapGrowl("Error, plan Turno no se ha guardado", {type: 'danger',delay: 120000});
  
          };
  
      });
  }



})





SabuesoAPP.controller("editarplanturnosCtrl", function($scope,  $uibModalInstance, $uibModal, planturnos,  FactoryProyeccionPlanTurnos, ServiceProyeccionPlanTurnos )
{
    

    $scope.init = function(){


        $scope.planturnos = planturnos;
     
        $scope.planturnos.Fecha = new Date($scope.planturnos.Fecha+" 00:00:00");


      $scope.planturnos.Activo = 1 ;
        if($scope.planturnos.Real == "estimado")
        {
            $scope.planturnos.Real = 0 ;
        }
        else 
        {
            $scope.planturnos.Real = 1 ;
        }

        
        $scope.estados = [{
            id: 0,
            estado: "Estimado"
        }, {
            id: 1,
            estado: "Real"
        }];

        
        FactoryProyeccionPlanTurnos.Obtenerturnos().then(function (res) {
            if(res.data.msg==true){
                ServiceProyeccionPlanTurnos.listaTurnos=res.data.info;
            }
        });
      
        $scope.dataTurnos = {
            PK_Turno: planturnos.FK_Turno,
            Descripcion: planturnos.Descripcion
        };

    }


    $scope.listaTurnos = function()
    {
        //console.log(ServiceProyeccionPlanTurnos.listaTurnos)
        return ServiceProyeccionPlanTurnos.listaTurnos;
    }

  


    $scope.editarplanTurnos = function(){
    $scope.planturnos.Fecha = moment($scope.planturnos.Fecha).format('YYYY-MM-DD'),
        
        data = {

            PK_PlanTurnos: $scope.planturnos.PK_PlanTurnos,
            FK_Turno: $scope.dataTurnos.PK_Turno,
            Cantidad: $scope.planturnos.Cantidad,
            Fecha: $scope.planturnos.Fecha,
            Real: $scope.planturnos.Real, 
            Activo: 1 , 
            Cumplimiento: $scope.planturnos.Cumplimiento
        }

        console.log(data) ;

     //   data = deleteEmptyFields(data);

     FactoryProyeccionPlanTurnos.editar(data).then(function(res){
            if(res.status == 200){

                if(data.Activo == 1)
                {
                    $scope.planturnos['Activo'] = "activo" ;
                }
                else {
                    $scope.planturnos['Activo'] = "inactivo" ;
                }
                $.bootstrapGrowl("plan Turno editado exitosamente!", {type: 'success',delay: 10000});
                $uibModalInstance.close($scope.planturnos);
                ServiceProyeccionPlanTurnos.listaProyeccionPlanTurnos = [];
                $scope.listarProyeccionPlanTurnos() ; 
                
            }
             else {
                $.bootstrapGrowl("Error editar plan Turno", {type: 'danger',delay: 10000});
            }
        });
    }

   


    function deleteEmptyFields(data){
        for(key in data){
            if(typeof data[key] === 'undefined' || data[key] === '' || data[key] == null || data[key] === 'Invalid date'){
                delete data[key];
            }
        }
        return data;
    }

//Funcion para listar loa Estadosunidades en el modal
$scope.listarProyeccionPlanTurnos = function()
{
  if(ServiceProyeccionPlanTurnos.listaProyeccionPlanTurnos.length == 0)
  {
      FactoryProyeccionPlanTurnos.getProyeccionPlanTurnos().then( function(d) {
          ServiceProyeccionPlanTurnos.listaProyeccionPlanTurnos = d.data.info ;
       //   console.log(d.data.info) ;
       } ) ; 
  }

}




$scope.listaProyeccionPlanTurnos = function()
{
    return ServiceProyeccionPlanTurnos.listaProyeccionPlanTurnos;
}
 


});



