SabuesoAPP.controller("tipofallaController",function($scope,  FactoryCrearTipoFalla,ServiceTipofalla, $uibModal)
{




  //Editar estado unidad
  $scope.modificarTipofalla = function(tipofalla){
    var modalInstance = $uibModal.open({
      animation:true,
      templateUrl: 'components/TipoFalla/UpdateTipofalla.html',
     controller: 'editartipofallaCtrl',
      size:'lg',
      resolve: {
        tipofalla: function(){
          return tipofalla;
        }
      }
    });
 

    modalInstance.result.then(function(newtipofalla){
        console.log(newtipofalla) ; 
      if(typeof newtipofalla !== 'undefined'){
        idx = _.findIndex(ServiceTipofalla.listaTipoFalla, tipofalla );
        ServiceTipofalla.listaTipoFalla[idx] = newtipofalla;
      }
    });    
}




 $scope.eliminarTipofallas = function(elemento, idTipoFalla)
{
    FactoryCrearTipoFalla.eliminar({Pk_tipofalla:idTipoFalla}).then(function(d)
    {
        if(d.data.msg == true){

            var index = ServiceTipofalla.listaTipoFalla.indexOf(elemento);
            ServiceTipofalla.listaTipoFalla.splice(index,1);
            ServiceTipofalla.listaTipoFalla = [];
            $scope.listarTipoFalla() ; 

            $.bootstrapGrowl("Tipo falla inactiva exitosamente!!!", {type: 'success',delay: 120000});
        }
        else{
            $.bootstrapGrowl("Error,tipo falla se ha inactivado", {type: 'danger',delay: 120000});
        }
    });
}
 




  $scope.showform = function(){
    var modalInstance = $uibModal.open({
        animation:true,
        templateUrl: 'components/TipoFalla/CreateTipofalla.html',
        controller: 'guardarTipofallactrl',
        size:'lg',
        resolve: {
          funcion: function(){
            return [];
          }
        }
      });

    modalInstance.result.then(function(){
        ServiceTipofalla.listaTipoFalla = [];
        $scope.listarTipoFalla();
    });
}




    
  //Funcion para listar loa Estadosunidades en el modal
  $scope.listarTipoFalla = function()
  {
    if(ServiceTipofalla.listaTipoFalla.length == 0)
    {
        FactoryCrearTipoFalla.gettipofalla().then( function(d) {
            ServiceTipofalla.listaTipoFalla = d.data.info ;
         //   console.log(d.data.info) ;
         } ) ; 
    }

  }

  
  $scope.listaTipoFalla = function()
  {
      return ServiceTipofalla.listaTipoFalla;
  }


})




SabuesoAPP.controller('guardarTipofallactrl', function($scope, $uibModalInstance, ServiceTipofalla, FactoryCrearTipoFalla)
{

  
  $scope.guardarTipofalla = function(){

      var data = {
        Falla:$scope.TipofallaFalla,
        Descripcion:$scope.DescripcionTipofalla  
          
      };
  
      FactoryCrearTipoFalla.guardar(data).then( function(d) {
  
          if( d.data.msg == true )
          {
              data = {
                Falla:$scope.TipofallaFalla,
                Descripcion:$scope.DescripcionTipofalla  

              };
              
              $.bootstrapGrowl("tipo falla guardado exitosamente!!!", {type: 'success',delay: 120000});
            
              $uibModalInstance.close();
              
             
              
    
          }
          else {
              $.bootstrapGrowl("Error,Tipo falla no se ha guardado", {type: 'danger',delay: 120000});
  
          };
  
      });
  }



})



SabuesoAPP.controller("editartipofallaCtrl", function($scope, $filter, $uibModalInstance, $uibModal, tipofalla, ServiceTipofalla,  FactoryCrearTipoFalla )
{
    

  
    $scope.init = function(){
      console.log(tipofalla) ;

        $scope.tipofalla = tipofalla;

       
    }




    $scope.editarTipofalla = function(){
   
        data = {

            Pk_tipofalla: $scope.tipofalla.Pk_tipofalla,
            Falla: $scope.tipofalla.Falla,
            Descripcion: $scope.tipofalla.Descripcion  ,
            Activo: 1
           
        }


     //   data = deleteEmptyFields(data);

     FactoryCrearTipoFalla.editar(data).then(function(res){
            if(res.status == 200){

                if(data.Activo == 1)
                {
                    $scope.tipofalla['ACTIVO'] = "activo" ;
                }
                else {
                    $scope.tipofalla['ACTIVO'] = "inactivo" ;
                }
                $.bootstrapGrowl("Tipo falla editado exitosamente!", {type: 'success',delay: 10000});
                $uibModalInstance.close($scope.tipofalla);
                ServiceTipofalla.listaTipoFalla = [];
                $scope.listarTipoFalla() ; 
                
            }
             else {
                $.bootstrapGrowl("Error editar Tipo falla", {type: 'danger',delay: 10000});
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
  $scope.listarTipoFalla = function()
  {
    if(ServiceTipofalla.listaTipoFalla.length == 0)
    {
        FactoryCrearTipoFalla.gettipofalla().then( function(d) {
            ServiceTipofalla.listaTipoFalla = d.data.info ;
         //   console.log(d.data.info) ;
         } ) ; 
    }

  }

  
  $scope.listaTipoFalla = function()
  {
      return ServiceTipofalla.listaTipoFalla;
  }



});
