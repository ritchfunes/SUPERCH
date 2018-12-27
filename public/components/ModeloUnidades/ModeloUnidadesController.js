SabuesoAPP.controller("modelounidadController",function($scope,  FactoryCrearModelounidaes,ServiceModelounidades, $uibModal)
{




  
  $scope.modificarmodelounidad = function(modelound){
    var modalInstance = $uibModal.open({
      animation:true,
      templateUrl: 'components/ModeloUnidades/EditModeloUnidades.html',
     controller: 'editarmodelounidadesCtrl',
      size:'lg',
      resolve: {
        modelound: function(){
          return modelound;
        }
      }
    });
 

    modalInstance.result.then(function(newmodelound){
        console.log(newmodelound) ; 
      if(typeof newmodelound !== 'undefined'){
        idx = _.findIndex(ServiceModelounidades.listaModeloUnidades, modelound );
        ServiceModelounidades.listaModeloUnidades[idx] = newmodelound;
      }
    });    
}



  
 $scope.eliminarModelounidades = function(elemento, idModelounidades)
{
    FactoryCrearModelounidaes.eliminar({PK_ModeloUnidades:idModelounidades}).then(function(d)
    {
        if(d.data.msg == true){

            var index = ServiceModelounidades.listaModeloUnidades.indexOf(elemento);
            ServiceModelounidades.listaModeloUnidades.splice(index,1);
            ServiceModelounidades.listaModeloUnidades = [];
            $scope.listarModeloUnidades() ; 

            $.bootstrapGrowl("unidad inactiva exitosamente!!!", {type: 'success',delay: 120000});
        }
        else{
            $.bootstrapGrowl("Error,unidad no se ha inactivado", {type: 'danger',delay: 120000});
        }
    });
}
 




  $scope.showform = function(){
    var modalInstance = $uibModal.open({
        animation:true,
        templateUrl: 'components/ModeloUnidades/addModeloUnidades.html',
        controller: 'guardarModelounidadesctrl',
        size:'lg',
        resolve: {
          funcion: function(){
            return [];
          }
        }
      });

    modalInstance.result.then(function(){
      //  ServiceMarcaVehiculo.listaMarcaVehiculo = [];
       $scope.listarModeloUnidades();
    });
}




    
  //Funcion para listar loa Estadosunidades en el modal
  $scope.listarModeloUnidades = function()
  {
  //  if(ServiceMarcaVehiculo.listaMarcaVehiculo.length == 0)
  //  {
    FactoryCrearModelounidaes.get().then( function(d) {
        ServiceModelounidades.listaModeloUnidades = d.data.info ;
            console.log(d.data.info) ;
         } ) ; 
  //  }

  }

  
  $scope.listaModeloUnidades = function()
  {
      return ServiceModelounidades.listaModeloUnidades;
  }


})




SabuesoAPP.controller('guardarModelounidadesctrl', function($scope, $uibModalInstance, ServiceModeloVehiculo, FactoryCrearModeloVehiculo , FactoryCrearunidadesDisponibles, Serviceunidadesdisponibles , FactoryCrearEstadosUnidades , ServiceEstadosUnidades , FactoryCrearModelounidaes, ServiceModelounidades )
{

    $scope.listarModeloUnidades = function()
    {
    //  if(ServiceMarcaVehiculo.listaMarcaVehiculo.length == 0)
    //  {
      FactoryCrearModelounidaes.get().then( function(d) {
          ServiceModelounidades.listaModeloUnidades = d.data.info ;
              console.log(d.data.info) ;
           } ) ; 
    //  }
  
    }
  
    
    $scope.listaModeloUnidades = function()
    {
        return ServiceModelounidades.listaModeloUnidades;
    }
  

    $scope.listaEstados = function()
    {
        return ServiceEstadosUnidades.listaEstadosUnidades ; 
    }

    $scope.listarEstados = function()
    {
        FactoryCrearEstadosUnidades.getestadosunidades().then(function (d) {
            ServiceEstadosUnidades.listaEstadosUnidades = d.data.info ; 
         });
    }

   $scope.listaUnidades = function()
   {
       return Serviceunidadesdisponibles.listaUnidades ;
   }

   
   $scope.listarUnidades = function()
   {
       FactoryCrearunidadesDisponibles.Obtenereunidades().then( function(d){
         Serviceunidadesdisponibles.listaUnidades = d.data.info ;
       } ) ;
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
 

    $scope.init = function () {
        $scope.listarModeloVehiculo() ;
        $scope.listarUnidades() ;
        $scope.listarEstados();
        
  } ;
  
  
  $scope.guardarModelounidad = function(){

      var data = {
      Imei: $scope.modund.Imeid.Imei , 
      FK_ModeloVehiculo: $scope.modund.FKModelod.pk_ModeloVehiculo , 
      Year: $scope.modund.anio , 
      FK_EstadoUnidad: $scope.modund.PKEstadod.PK_Estado  
          
      };
      console.log(data) ;
      FactoryCrearModelounidaes.guardar(data).then( function(d) {
  
          if( d.data.msg == true )
          {
      
              $.bootstrapGrowl("Unidad guardada exitosamente!!!", {type: 'success',delay: 120000});
        
              $uibModalInstance.close('')  ;
              
             
              
    
          }
          else {
              $.bootstrapGrowl("Error, unidad no se ha guardado", {type: 'danger',delay: 120000});
  
          };
  
      });
  }
 

})



SabuesoAPP.controller('editarmodelounidadesCtrl', function($scope, FactoryCrearModelounidaes,ServiceModelounidades , $filter, $uibModalInstance, $uibModal, modelound ,  FactoryCrearEstadosUnidades , ServiceEstadosUnidades ,  ServiceModeloVehiculo, FactoryCrearModeloVehiculo,  FactoryCrearunidadesDisponibles, Serviceunidadesdisponibles  )
{
    $scope.listarModeloUnidades = function()
    {
    //  if(ServiceMarcaVehiculo.listaMarcaVehiculo.length == 0)
    //  {
      FactoryCrearModelounidaes.get().then( function(d) {
          ServiceModelounidades.listaModeloUnidades = d.data.info ;
              console.log(d.data.info) ;
           } ) ; 
    //  }
  
    }
  
    
    $scope.listaModeloUnidades = function()
    {
        return ServiceModelounidades.listaModeloUnidades;
    }
  
    $scope.listaEstados = function()
    {
        return ServiceEstadosUnidades.listaEstadosUnidades ; 
    }

    $scope.listarEstados = function()
    {
        FactoryCrearEstadosUnidades.getestadosunidades().then(function (d) {
            ServiceEstadosUnidades.listaEstadosUnidades = d.data.info ; 
         });
    }

    $scope.listaUnidades = function()
    {
        return Serviceunidadesdisponibles.listaUnidades ;
    }
 
    
    $scope.listarUnidades = function()
    {
        FactoryCrearunidadesDisponibles.Obtenereunidades().then( function(d){
          Serviceunidadesdisponibles.listaUnidades = d.data.info ;
        } ) ;
    }
 
 $scope.listaModelo = function(){
     return ServiceModeloVehiculo.listaModeloVehiculo ;
 }

 $scope.listarModelo = function ()
 {
     FactoryCrearModeloVehiculo.get().then( function(d) {
        ServiceModeloVehiculo.listaModeloVehiculo = d.data.info ;
     });
 }

    $scope.init = function(){
   console.log(modelound) ;
        $scope.modelound = modelound ;
      
  $scope.listarEstados() ; 
  $scope.listarModelo() ; 
  $scope.listarUnidades() ;
  
    
        
   $scope.dataModelo = {
       pk_ModeloVehiculo: modelound.FK_ModeloVehiculo , 
       Modelo: modelound.Modelo 
   } ;

   $scope.dataUnidades = {
     Imei: modelound.Imei , 
     Vehiculo: modelound.Nombre_Vehiculo 
   } ;

   $scope.dataEstadosund = {
    PK_Estado: modelound.FK_EstadoUnidad  ,
    Estado: modelound.Estado 
   } ;


    }


    $scope.editarModelounidad = function(){
   
        data = {
            Imei: $scope.dataUnidades.Imei , 
            FK_ModeloVehiculo: $scope.dataModelo.pk_ModeloVehiculo ,
            Activo: 1 , 
            Year: $scope.modelound.Year , 
            FK_EstadoUnidad: $scope.dataEstadosund.PK_Estado ,
            PK_ModeloUnidades: $scope.modelound.PK_ModeloUnidades  
                      
        }
    console.log(data) ; 
     //   data = deleteEmptyFields(data);
     FactoryCrearModelounidaes.editar(data).then(function (res){
    // FactoryCrearModeloVehiculo.editar(data).then(function(res){
            if(res.status == 200){

                if(data.Activo == 1)
                {
                    $scope.modelound['ACTIVO'] = "activo" ;
                }
                else {
                    $scope.modelound['ACTIVO'] = "inactivo" ;
                }
                $.bootstrapGrowl("Unidad editada exitosamente!", {type: 'success',delay: 10000});
                $uibModalInstance.close($scope.modelound);
            //    ServiceModeloVehiculo.listaModeloVehiculo = [];
                $scope.listarModeloUnidades() ; 
                
            }
             else {
                $.bootstrapGrowl("Error editar Unidad", {type: 'danger',delay: 10000});
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

 
   

});

