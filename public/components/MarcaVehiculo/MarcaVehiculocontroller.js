SabuesoAPP.controller("marcavehiculoController",function($scope,  FactoryCrearMarcaVehiculo,ServiceMarcaVehiculo, $uibModal)
{




  //Editar estado unidad
  $scope.modificarmarcavehiculo = function(marca){
    var modalInstance = $uibModal.open({
      animation:true,
      templateUrl: 'components/MarcaVehiculo/editMarcavehiculo.html',
     controller: 'editarmarcavehiculoCtrl',
      size:'lg',
      resolve: {
        marca: function(){
          return marca;
        }
      }
    });
 

    modalInstance.result.then(function(newmarca){
        console.log(newmarca) ; 
      if(typeof newmarca !== 'undefined'){
        idx = _.findIndex(ServiceMarcaVehiculo.listaMarcaVehiculo, marca );
        ServiceMarcaVehiculo.listaMarcaVehiculo[idx] = newmarca;
      }
    });    
}




 $scope.eliminarMarcaVehiculo = function(elemento, idMarcaVehiculo)
{
    FactoryCrearMarcaVehiculo.eliminar({PK_MarcaVehiculo:idMarcaVehiculo}).then(function(d)
    {
        if(d.data.msg == true){

            var index = ServiceMarcaVehiculo.listaMarcaVehiculo.indexOf(elemento);
            ServiceMarcaVehiculo.listaMarcaVehiculo.splice(index,1);
            ServiceMarcaVehiculo.listaMarcaVehiculo = [];
            $scope.listarMarcaVehiculo() ; 

            $.bootstrapGrowl("Marca inactiva exitosamente!!!", {type: 'success',delay: 120000});
        }
        else{
            $.bootstrapGrowl("Error,marca no se ha inactivado", {type: 'danger',delay: 120000});
        }
    });
}
 




  $scope.showform = function(){
    var modalInstance = $uibModal.open({
        animation:true,
        templateUrl: 'components/MarcaVehiculo/addMarcavehiculo.html',
        controller: 'guardarMarcavehiculoctrl',
        size:'lg',
        resolve: {
          funcion: function(){
            return [];
          }
        }
      });

    modalInstance.result.then(function(){
      //  ServiceMarcaVehiculo.listaMarcaVehiculo = [];
       $scope.listaMarcaVehiculo();
    });
}




    
  //Funcion para listar loa Estadosunidades en el modal
  $scope.listarMarcaVehiculo = function()
  {
  //  if(ServiceMarcaVehiculo.listaMarcaVehiculo.length == 0)
  //  {
        FactoryCrearMarcaVehiculo.getmarcavehiculo().then( function(d) {
            ServiceMarcaVehiculo.listaMarcaVehiculo = d.data.info ;
            console.log(d.data.info) ;
         } ) ; 
  //  }

  }

  
  $scope.listaMarcaVehiculo = function()
  {
      return ServiceMarcaVehiculo.listaMarcaVehiculo;
  }


})



SabuesoAPP.controller('guardarMarcavehiculoctrl', function($scope, $uibModalInstance, ServiceMarcaVehiculo, FactoryCrearMarcaVehiculo)
{

    $scope.listarMarcaVehiculo = function()
    {
  
          FactoryCrearMarcaVehiculo.getmarcavehiculo().then( function(d) {
              ServiceMarcaVehiculo.listaMarcaVehiculo = d.data.info ;
           //   console.log(d.data.info) ;
           } ) ; 
      
  
    }
  
    
    $scope.listaMarcaVehiculo = function()
    {
        return ServiceMarcaVehiculo.listaMarcaVehiculo;
    }
 

    $scope.init= function () {

        $scope.tipo = [{
            id: 0,
            vehiculo: "Liviano"
        }, {
            id: 1,
            vehiculo: "Pesado"
        } ];

    };
  
  $scope.guardarMarcavehiculo = function(){

      var data = {
        TipoVehiculo:$scope.TipoMarca,
        Descripcion:$scope.Descripcionmarca  
        
          
      };
  
      FactoryCrearMarcaVehiculo.guardar(data).then( function(d) {
  
          if( d.data.msg == true )
          {
              data = {
                TipoVehiculo:$scope.TipoMarca,
                Descripcion:$scope.Descripcionmarca , 
                Activo:  "ACTIVO"  

              };
              ServiceMarcaVehiculo.listaMarcaVehiculo.push(data);
            //  $scope.listarMarcaVehiculo() ;
              $.bootstrapGrowl("Marca guardado exitosamente!!!", {type: 'success',delay: 120000});
              $scope.listaMarcaVehiculo() ;
              $uibModalInstance.close('')  ;
              
             
              
    
          }
          else {
              $.bootstrapGrowl("Error,Marca no se ha guardado", {type: 'danger',delay: 120000});
  
          };
  
      });
  }


})



SabuesoAPP.controller("editarmarcavehiculoCtrl", function($scope, $filter, $uibModalInstance, $uibModal, marca, ServiceMarcaVehiculo,  FactoryCrearMarcaVehiculo )
{
    

  
    $scope.init = function(){
      console.log(marca) ;

        $scope.marca = marca;

        $scope.tipo = [{
            id: 0,
            vehiculo: "Liviano"
        }, {
            id: 1,
            vehiculo: "Pesado"
        } ];
   
    }


    $scope.editarMarcavehiculo = function(){
   
        data = {

            PK_MarcaVehiculo: $scope.marca.PK_MarcaVehiculo,
            TipoVehiculo: $scope.marca.TipoVehiculo,
            Descripcion: $scope.marca.Descripcion  ,
            Activo: 1
           
        }

     //   data = deleteEmptyFields(data);

     FactoryCrearMarcaVehiculo.editar(data).then(function(res){
            if(res.status == 200){

                if(data.Activo == 1)
                {
                    $scope.marca['ACTIVO'] = "activo" ;
                }
                else {
                    $scope.marca['ACTIVO'] = "inactivo" ;
                }
                $.bootstrapGrowl("Marca editado exitosamente!", {type: 'success',delay: 10000});
                $uibModalInstance.close($scope.marca);
                ServiceMarcaVehiculo.listaMarcaVehiculo = [];
                $scope.listarMarcaVehiculo() ; 
                
            }
             else {
                $.bootstrapGrowl("Error editar Marca", {type: 'danger',delay: 10000});
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


   

  $scope.listarMarcaVehiculo = function()
  {
  //  if(ServiceMarcaVehiculo.listaMarcaVehiculo.length == 0)
  //  {
        FactoryCrearMarcaVehiculo.getmarcavehiculo().then( function(d) {
            ServiceMarcaVehiculo.listaMarcaVehiculo = d.data.info ;
            console.log(d.data.info) ;
         } ) ; 
  //  }

  }

  
  $scope.listaMarcaVehiculo = function()
  {
      return ServiceMarcaVehiculo.listaMarcaVehiculo;
  }


});
