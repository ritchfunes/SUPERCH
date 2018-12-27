
SabuesoAPP.controller("turnosController",function($scope,  FactoryCrearTurnos,ServiceTurnos, $uibModal)
{

 //Parametros
 $scope.TurnoTurnos;
 $scope.HoraInicioTurnos;
 $scope.HoraFinTurnos  ;
 $scope.DescripcionTurnos ;


  //Editar estado unidad
  $scope.modificarTurnos = function(turnos){
    var modalInstance = $uibModal.open({
      animation:true,
      templateUrl: 'components/Turnos/editarturno.html',
     controller: 'editarturnosCtrl',
      size:'lg',
      resolve: {
        turnos: function(){
          return turnos;
        }
      }
    });


    modalInstance.result.then(function(newturno){
        console.log(newturno) ; 
      if(typeof newturno !== 'undefined'){
        idx = _.findIndex(ServiceTurnos.listaTurnos, turnos );
        ServiceTurnos.listaTurnos[idx] = newturno;
      }
    });    
}



 $scope.eliminarTurnos = function(elemento, idTurno)
{
  FactoryCrearTurnos.eliminar({PK_Turno:idTurno}).then(function(d)
    {
        if(d.data.msg == true){

            var index = ServiceTurnos.listaTurnos.indexOf(elemento);
            ServiceTurnos.listaTurnos.splice(index,1);
            ServiceTurnos.listaTurnos = [];
            $scope.listarTurnos() ; 

            $.bootstrapGrowl("Turno eliminado exitosamente!!!", {type: 'success',delay: 120000});
        }
        else{
            $.bootstrapGrowl("Error,turno no se ha eliminado", {type: 'danger',delay: 120000});
        }
    });
}





  $scope.showform = function(){
    var modalInstance = $uibModal.open({
        animation:true,
        templateUrl: 'components/Turnos/CreateTurnos.html',
        controller: 'guardarTurnosctrl',
        size:'lg',
        resolve: {
          funcion: function(){
            return [];
          }
        }
      });

    modalInstance.result.then(function(){
      ServiceTurnos.listaTurnos = [];
        $scope.listarTurnos();
    });
}




    
  //Funcion para listar loa Estadosunidades en el modal
  $scope.listarTurnos = function()
  {
    if(ServiceTurnos.listaTurnos.length == 0)
    {
        FactoryCrearTurnos.getturnos().then( function(d) {
            ServiceTurnos.listaTurnos = d.data.info ;
         //   console.log(d.data.info) ;
         } ) ; 
    }

  }

  
  $scope.listaTurnos = function()
  {
      return ServiceTurnos.listaTurnos;
  }


})






SabuesoAPP.controller('guardarTurnosctrl', function($scope, $uibModalInstance, ServiceTurnos, FactoryCrearTurnos)
{

  
  $scope.guardarTurnos = function(){

      var data = {
          Turno:$scope.TurnoTurnos,
          HoraInicio:moment($scope.HoraInicioTurnos).format('hh:mm:a'), 
          HoraFin: moment( $scope.HoraFinTurnos).format('hh:mm:a') , 
          Descripcion:$scope.DescripcionTurnos , 
          Activo: 1 


      };
  
      FactoryCrearTurnos.guardar(data).then( function(d) {
  
          if( d.data.msg == true )
          {
              data = {
                Turno:$scope.TurnoTurnos,
                HoraInicio: moment( $scope.HoraInicioTurnos).format('hh:mm:a'), 
                HoraFin:moment( $scope.HoraFinTurnos).format('hh:mm:a'), 
                Descripcion:$scope.DescripcionTurnos ,
                Activo: 1 

              };
              
              $.bootstrapGrowl("turno guardado exitosamente!!!", {type: 'success',delay: 120000});
  
              $scope.TurnoTurnos = "" ; 
              $scope.HoraInicioTurnos = "" ; 
              $scope.HoraFinTurnos = "" ; 
              $scope.DescripcionTurnos = "" ; 
              
              $uibModalInstance.close();
              
             
              
    
          }
          else {
              $.bootstrapGrowl("Error,Turno no se ha guardado", {type: 'danger',delay: 120000});
  
          };
  
      });
  }



})



SabuesoAPP.controller("editarturnosCtrl", function($scope, $filter, $uibModalInstance, $uibModal, turnos,  FactoryCrearTurnos )
{
    

  
    $scope.init = function(){
      console.log(turnos) ;

        $scope.turnos = turnos;

        $scope.turnos.Activo = 1 ;
        tiempo = $scope.turnos.HoraInicio.split(':');
        $scope.turnos.HoraInicio = moment().set({hour: tiempo[0], minute: tiempo[1], second: 0, millisecond: 0});
        $scope.turnos.HoraInicio = $scope.turnos.HoraInicio.toDate();

        tiempo = $scope.turnos.HoraFin.split(':');
        $scope.turnos.HoraFin = moment().set({hour: tiempo[0], minute: tiempo[1], second: 0, millisecond: 0});
        $scope.turnos.HoraFin = $scope.turnos.HoraFin.toDate();
    }




    $scope.editarTurnos = function(){
      $scope.turnos.HoraInicio = moment($scope.turnos.HoraInicio).format('hh:mm:a') ;
        
      $scope.turnos.HoraFin = moment($scope.turnos.HoraFin).format('hh:mm:a') ;//$scope.turnos.HoraFin.getHours()+ ':'+$scope.turnos.HoraFin.getMinutes() ;
        data = {

            PK_Turno: $scope.turnos.PK_Turno,
            Turno: $scope.turnos.Turno,
            HoraInicio: $scope.turnos.HoraInicio,
            HoraFin: $scope.turnos.HoraFin,
            Descripcion: $scope.turnos.Descripcion, 
            Activo: $scope.turnos.Activo
        }


     //   data = deleteEmptyFields(data);

     FactoryCrearTurnos.editar(data).then(function(res){
            if(res.status == 200){

                if(data.Activo == 1)
                {
                    $scope.turnos['Activo'] = "activo" ;
                }
                else {
                    $scope.turnos['Activo'] = "inactivo" ;
                }
                $.bootstrapGrowl("Turno editado exitosamente!", {type: 'success',delay: 10000});
                $uibModalInstance.close($scope.turnos);
                ServiceTurnos.listaTurnos = [];
                $scope.listarTurnos() ; 
                
            }
             else {
                $.bootstrapGrowl("Error editar Turno", {type: 'danger',delay: 10000});
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
  $scope.listarTurnos = function()
  {
    if(ServiceTurnos.listaTurnos.length == 0)
    {
        FactoryCrearTurnos.getturnos().then( function(d) {
            ServiceTurnos.listaTurnos = d.data.info ;
         //   console.log(d.data.info) ;
         } ) ; 
    }

  }

  
  $scope.listaTurnos = function()
  {
      return ServiceTurnos.listaTurnos;
  }



});


