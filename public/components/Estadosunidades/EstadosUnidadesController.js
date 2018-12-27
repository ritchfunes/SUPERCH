

SabuesoAPP.controller("estadosunidadeController",function($scope,  FactoryCrearEstadosUnidades,ServiceEstadosUnidades, $uibModal)
{

    //Parametros
    $scope.estadosEstadosUnidades;
    $scope.observacionEstadosunidades;
    $scope.ActivoEstadosunidades ;



 //Abrir nueva forma
 $scope.formvisibility = false ;
 $scope.showform = function(){
    var modalInstance = $uibModal.open({
        animation:true,
        templateUrl: 'components/Estadosunidades/vistacreateestadounidad.html',
        controller: 'guardarEstadosUnidadesCtrl',
        size:'lg',
        resolve: {
          funcion: function(){
            return [];
          }
        }
      });

    modalInstance.result.then(function(){
        ServiceEstadosUnidades.listaEstadosUnidades = [];
        $scope.listarEstadosUnidades();
    });
}

 //Editar estado unidad
 $scope.modificarEstadounidad = function(estadounidad){
    var modalInstance = $uibModal.open({
      animation:true,
      templateUrl: 'components/Estadosunidades/editar/VistaEditarEstadosunidades.html',
     controller: 'editarestadosunidadesCtrl',
      size:'lg',
      resolve: {
        estadounidad: function(){
          return estadounidad;
        }
      }
    });


    modalInstance.result.then(function(newEstadounidad){
        console.log(newEstadounidad) ; 
      if(typeof newEstadounidad !== 'undefined'){
        idx = _.findIndex(ServiceEstadosUnidades.listaEstadosUnidades, estadounidad );
        ServiceEstadosUnidades.listaEstadosUnidades[idx] = newEstadounidad;
      }
    });    
}


//Funcion para eliminar categoria
$scope.eliminarEstadosunidades = function(elemento, idEstadosunidad)
{
    FactoryCrearEstadosUnidades.eliminar({PK_Estado:idEstadosunidad}).then(function(d)
    {
        if(d.data.msg == true){

            var index = ServiceEstadosUnidades.listaEstadosUnidades.indexOf(elemento);
            ServiceEstadosUnidades.listaEstadosUnidades.splice(index,1);
            ServiceEstadosUnidades.listaEstadosUnidades = [];
            $scope.listarEstadosUnidades() ; 

            $.bootstrapGrowl("Estado unidad inactivo exitosamente!!!", {type: 'success',delay: 120000});
        }
        else{
            $.bootstrapGrowl("Error,esado unidad no se ha modificado", {type: 'danger',delay: 120000});
        }
    });
}




   

  //Funcion para listar loa Estadosunidades en el modal
  $scope.listarEstadosUnidades = function()
  {
    if(ServiceEstadosUnidades.listaEstadosUnidades.length == 0)
    {
        FactoryCrearEstadosUnidades.getestadosunidades().then( function(d) {
            ServiceEstadosUnidades.listaEstadosUnidades = d.data.info ;
         //   console.log(d.data.info) ;
         } ) ; 
    }

  }



  $scope.listaEstadosUnidades = function()
  {
      return ServiceEstadosUnidades.listaEstadosUnidades;
  }




});


SabuesoAPP.controller('guardarEstadosUnidadesCtrl', function($scope, $uibModalInstance, ServiceEstadosUnidades, FactoryCrearEstadosUnidades){
    $scope.guardarEstadosunidades = function(){
        console.log("Entraqui")

        var data = {
            Estado:$scope.estadosEstadosUnidades,
            Observacion:$scope.observacionEstadosunidades, 
            Activo:  "1"
        };
    
        FactoryCrearEstadosUnidades.guardar(data).then( function(d) {
    
            if( d.data.msg == true )
            {
                data = {
                    Estado:$scope.estadosEstadosUnidades,
                    Observacion:$scope.observacionEstadosunidades,
                    Activo:  "1"
                };
                
                $.bootstrapGrowl("estado de unidad guardada exitosamente!!!", {type: 'success',delay: 120000});
    
                $scope.estadosEstadosUnidades = "" ;
                $scope.observacionEstadosunidades = "" ;
                
                $uibModalInstance.close();
                
               
                
      
            }
            else {
                $.bootstrapGrowl("Error,estado de unidad no se ha guardado", {type: 'danger',delay: 120000});
    
            };
    
        });
    }
})