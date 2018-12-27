SabuesoAPP.controller("modelovehiculoController",function($scope,  FactoryCrearModeloVehiculo,ServiceModeloVehiculo, $uibModal)
{




  //Editar estado unidad
  $scope.modificarmodelovehiculo = function(modelo){
    var modalInstance = $uibModal.open({
      animation:true,
      templateUrl: 'components/ModeloVehiculo/editModeloVehiculo.html',
     controller: 'editarmodelovehiculoCtrl',
      size:'lg',
      resolve: {
        modelo: function(){
          return modelo;
        }
      }
    });
 

    modalInstance.result.then(function(newmodelo){
        console.log(newmodelo) ; 
      if(typeof newmodelo !== 'undefined'){
        idx = _.findIndex(ServiceModeloVehiculo.listaModeloVehiculo, modelo );
        ServiceModeloVehiculo.listaModeloVehiculo[idx] = newmodelo;
      }
    });    
}



  
 $scope.eliminarModeloVehiculo = function(elemento, idModeloVehiculo)
{
    FactoryCrearModeloVehiculo.eliminar({pk_ModeloVehiculo:idModeloVehiculo}).then(function(d)
    {
        if(d.data.msg == true){

            var index = ServiceModeloVehiculo.listaModeloVehiculo.indexOf(elemento);
            ServiceModeloVehiculo.listaModeloVehiculo.splice(index,1);
            ServiceModeloVehiculo.listaModeloVehiculo = [];
            $scope.listarModeloVehiculo() ; 

            $.bootstrapGrowl("Modelo inactiva exitosamente!!!", {type: 'success',delay: 120000});
        }
        else{
            $.bootstrapGrowl("Error,modelo no se ha inactivado", {type: 'danger',delay: 120000});
        }
    });
}
 




  $scope.showform = function(){
    var modalInstance = $uibModal.open({
        animation:true,
        templateUrl: 'components/ModeloVehiculo/addModeloVehiculo.html',
        controller: 'guardarModelovehiculoctrl',
        size:'lg',
        resolve: {
          funcion: function(){
            return [];
          }
        }
      });

    modalInstance.result.then(function(){
      //  ServiceMarcaVehiculo.listaMarcaVehiculo = [];
       $scope.listarModeloVehiculo();
    });
}




    
  //Funcion para listar loa Estadosunidades en el modal
  $scope.listarModeloVehiculo = function()
  {
  //  if(ServiceMarcaVehiculo.listaMarcaVehiculo.length == 0)
  //  {
    FactoryCrearModeloVehiculo.get().then( function(d) {
            ServiceModeloVehiculo.listaModeloVehiculo = d.data.info ;
            console.log(d.data.info) ;
         } ) ; 
  //  }

  }

  
  $scope.listaModeloVehiculo = function()
  {
      return ServiceModeloVehiculo.listaModeloVehiculo;
  }


})




SabuesoAPP.controller('guardarModelovehiculoctrl', function($scope, $uibModalInstance, ServiceModeloVehiculo, FactoryCrearModeloVehiculo, FactoryCrearMarcaVehiculo, ServiceMarcaVehiculo  )
{

    $scope.listarModeloVehiculo = function()
    {
    
      FactoryCrearModeloVehiculo.get().then( function(d) {
              ServiceModeloVehiculo.listaModeloVehiculo = d.data.info ;
              console.log(d.data.info) ;
           } ) ; 
    
  
    }
  
    
    $scope.listaModeloVehiculo = function()
    {
        return ServiceModeloVehiculo.listaModeloVehiculo;
    }
 

    $scope.listaMarcaVehiculo = function()
    {
        //console.log(ServiceProyeccionPlanTurnos.listaTurnos)
        return ServiceMarcaVehiculo.listaMarcaVehiculo;
    }

    $scope.init = function () {

        FactoryCrearMarcaVehiculo.getmarcavehiculo().then(function (res) {
            if(res.data.msg==true){
                ServiceMarcaVehiculo.listaMarcaVehiculo=res.data.info;
            }
    });

  } ;
  
  $scope.guardarModelovehiculo = function(){

      var data = {
    
        Modelo:$scope.ModeloModelo  ,
        FK_MarcaVehiculo:$scope.FK_MarcaVehiculoModelo.PK_MarcaVehiculo
       // Activo: 1
        
          
      };
      console.log(data) ;
      FactoryCrearModeloVehiculo.guardar(data).then( function(d) {
  
          if( d.data.msg == true )
          {
              data = {
             
                Modelo:$scope.ModeloModelo  ,
                FK_MarcaVehiculo:$scope.FK_MarcaVehiculoModelo.PK_MarcaVehiculo
              //  Activo:  "ACTIVO"  

              };
              
            //  ServiceModeloVehiculo.listaModeloVehiculo.push(data);
            //  $scope.listarMarcaVehiculo() ;
              $.bootstrapGrowl("Modelo guardado exitosamente!!!", {type: 'success',delay: 120000});
              $scope.listarModeloVehiculo() ;
              $uibModalInstance.close('')  ;
              
             
              
    
          }
          else {
              $.bootstrapGrowl("Error,Modelo no se ha guardado", {type: 'danger',delay: 120000});
  
          };
  
      });
  }


})



SabuesoAPP.controller("editarmodelovehiculoCtrl", function($scope, $filter, $uibModalInstance, $uibModal, modelo, ServiceModeloVehiculo, FactoryCrearModeloVehiculo, ServiceMarcaVehiculo,  FactoryCrearMarcaVehiculo )
{
    

    $scope.listaMarcaVehiculo = function()
    {
        //console.log(ServiceProyeccionPlanTurnos.listaTurnos)
        return ServiceMarcaVehiculo.listaMarcaVehiculo;
    }

  
    $scope.init = function(){
      console.log(modelo) ;

        $scope.modelo = modelo;

        FactoryCrearMarcaVehiculo.getmarcavehiculo().then(function (res) {
            if(res.data.msg==true){
                ServiceMarcaVehiculo.listaMarcaVehiculo=res.data.info;
            }
    });
   
    $scope.datamarcas = {
        
        PK_MarcaVehiculo: modelo.FK_MarcaVehiculo,
        Descripcion: modelo.Descripcion
    };


    }


    $scope.editarModelovehiculo = function(){
   
        data = {
            pk_ModeloVehiculo: $scope.modelo.pk_ModeloVehiculo, 
            FK_MarcaVehiculo:  $scope.datamarcas.PK_MarcaVehiculo,
           //  FK_MarcaVehiculo: $scope.modelo.FK_MarcaVehiculo,
            Modelo: $scope.modelo.Modelo,
            Activo: 1
           
        }

     //   data = deleteEmptyFields(data);

     FactoryCrearModeloVehiculo.editar(data).then(function(res){
            if(res.status == 200){

                if(data.Activo == 1)
                {
                    $scope.modelo['ACTIVO'] = "activo" ;
                }
                else {
                    $scope.modelo['ACTIVO'] = "inactivo" ;
                }
                $.bootstrapGrowl("Modelo editado exitosamente!", {type: 'success',delay: 10000});
                $uibModalInstance.close($scope.modelo);
                ServiceModeloVehiculo.listaModeloVehiculo = [];
                $scope.listarModeloVehiculo() ; 
                
            }
             else {
                $.bootstrapGrowl("Error editar Modelo", {type: 'danger',delay: 10000});
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


   
    $scope.listarModeloVehiculo = function()
    {
    
      FactoryCrearModeloVehiculo.get().then( function(d) {
              ServiceModeloVehiculo.listaModeloVehiculo = d.data.info ;
              console.log(d.data.info) ;
           } ) ; 
    
  
    }
  
    
    $scope.listaModeloVehiculo = function()
    {
        return ServiceModeloVehiculo.listaModeloVehiculo;
    }

});