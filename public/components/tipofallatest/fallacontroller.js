SabuesoAPP.controller("fallacontroller",function($scope,  FactoryCrearFalla,servicesfalla, $uibModal)
{




  //Editar estado unidad
  $scope.modificarfalla = function(falla){
    var modalInstance = $uibModal.open({
      animation:true,
      templateUrl: 'components/tipofallatest/editfall.html',
     controller: 'editarfallaCtrl',
      size:'lg',
      resolve: {
        falla: function(){
          return falla;
        }
      }
    });
 

    modalInstance.result.then(function(newfalla){
        console.log(newfalla) ; 
      if(typeof newfalla !== 'undefined'){
        idx = _.findIndex(servicesfalla.listaFalla, falla );
        servicesfalla.listaFalla[idx] = newfalla;
        $scope.listarfalla();
      }
    });    
}




 $scope.eliminarfallas = function(elemento, idTipoFalla)
{
    FactoryCrearFalla.eliminar({Pk_tipofalla:idTipoFalla}).then(function(d)
    {
        if(d.data.msg == true){

            var index = servicesfalla.listaFalla.indexOf(elemento);
            servicesfalla.listaFalla.splice(index,1);
            servicesfalla.listaFalla = [];
            $scope.listarfalla() ; 

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
        templateUrl: 'components/tipofallatest/addfalla.html',
        controller: 'guardarfallaCtrl',
        size:'lg',
        resolve: {
          funcion: function(){
            return [];
          }
        }
      });

    modalInstance.result.then(function(){
 //       ServiceTipofalla.listaTipoFalla = [];
   //     $scope.listarTipoFalla();
    });
}




    
  //Funcion para listar loa Estadosunidades en el modal
  $scope.listarfalla = function()
  {
    if(servicesfalla.listaFalla.length == 0)
    {
        FactoryCrearFalla.gettipofalla().then( function(d) {
            servicesfalla.listaFalla = d.data.info ;
         //   console.log(d.data.info) ;
         } ) ; 
    }

  }

  
  $scope.listaFalla = function()
  {
      return servicesfalla.listaFalla;
  }


})

SabuesoAPP.controller('guardarfallaCtrl', function($scope, $uibModalInstance, FactoryCrearFalla,servicesfalla)
{

  
  $scope.guardarfalla = function(){

      var data = {
        Falla:$scope.fallaFalla,
        Descripcion:$scope.Descripcionfalla  
          
      };
  
      FactoryCrearFalla.guardar(data).then( function(d) {
  
          if( d.data.msg == true )
          {
              data = {
                Falla:$scope.fallaFalla,
                Descripcion:$scope.Descripcionfalla 

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

SabuesoAPP.controller("editarfallaCtrl", function($scope, $filter, $uibModalInstance, $uibModal, falla, FactoryCrearFalla,servicesfalla )
{
    

  
    $scope.init = function(){
      console.log(falla) ;

        $scope.falla = falla;

       
    }




    $scope.editarfalla = function(){
   
        data = {

            Pk_tipofalla: $scope.falla.Pk_tipofalla,
            Falla: $scope.falla.Falla,
            Descripcion: $scope.falla.Descripcion  ,
            Activo: 1
           
        }


     //   data = deleteEmptyFields(data);

     FactoryCrearFalla.editar(data).then(function(res){
            if(res.status == 200){

                if(data.Activo == 1)
                {
                    $scope.falla['ACTIVO'] = "activo" ;
                }
                else {
                    $scope.falla['ACTIVO'] = "inactivo" ;
                }
                $.bootstrapGrowl("Tipo falla editado exitosamente!", {type: 'success',delay: 10000});
                $uibModalInstance.close($scope.falla);
                Sservicesfalla.listaFalla = [];
           //     $scope.listarTipoFalla() ; 
                
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



    });
