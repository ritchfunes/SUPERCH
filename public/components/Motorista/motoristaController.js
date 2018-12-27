SabuesoAPP.controller("motoristaController",function($scope,FactoryMotorista,ServicioMotorista,
  $uibModal)
{

  $scope.nombresMotorista;
  $scope.apellidosMotorista;
  $scope.Identidad;
  $scope.direccion;
  $scope.telefono;
  $scope.expiracionLicencia = new Date(Date.now());
  $scope.ficha;
  $scope.codigo;



  $scope.guardarMotorista = function(){

    var data = {

      nombre:$scope.nombresMotorista,
      apellido:$scope.apellidosMotorista,
      telefono:$scope.telefono,
      direccion:$scope.direccion,
      identidad:$scope.Identidad.toString(),
      fechaExp:moment($scope.desde).format('YYYY-MM-DD HH:mm'),
      ficha:$scope.ficha,
      codigo: $scope.codigo,
      estado: 0

    };
    //console.log(data);
    FactoryMotorista.guardar(data).then(function(d){

        if (d.data.msg == true) {
          $.bootstrapGrowl("Motorista guardado exitosamente!!!", {type: 'success',delay: 10000});

          ServicioMotorista.listaMotorista = [];
          $scope.listarMotoristas();

          $scope.nombresMotorista = "";
          $scope.apellidosMotorista = "";
          $scope.Identidad = "";
          $scope.direccion = "";
          $scope.telefono = "";
          $scope.expiracionLicencia = "";
          $scope.ficha = "";

        }else{
          $.bootstrapGrowl("Error,Motorista no se ha guardado", {type: 'danger',delay: 10000});
          console.log(d);
        }
    });



  }


  //Funcion para listar Motoristas
  $scope.listarMotoristas = function(){

    if (ServicioMotorista.listaMotorista.length == 0) {
        FactoryMotorista.Obtenerconductores().then(function(d){
          ServicioMotorista.listaMotorista = d.data.info;

        });
    }

  }


  //Retorna la lista de Motoristas en el ServicioMotorista
  $scope.listaMotoristas = function(){
    return ServicioMotorista.listaMotorista;
  }

  //Editar Motorista
  $scope.modificarMotorista = function(motorista){
    var modalInstance = $uibModal.open({
      animation:true,
      templateUrl: 'components/Motorista/editar/editarMotorista.html',
      controller: 'editarMotoristaCtrl',
      size:'lg',
      resolve: {
        motorista: function(){
          return motorista;
        }
      }
    });

    
    modalInstance.result.then(function(newMotorista){
      if(typeof newMotorista !== 'undefined'){
        idx = _.findIndex(ServicioMotorista.listaMotorista, motorista);
        ServicioMotorista.listaMotorista[idx] = newMotorista;
      }
    });
  }


  
});
