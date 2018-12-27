SabuesoAPP.controller("noAutorizadosController",function($scope,ServicioReferencias,FactoryAutorizados){
  //$scope.referencias = ServicioReferencias.ListaReferencias;
  $scope.referencias = [];
  //$scope.model = {};
  //$scope.model.referencia;

  $scope.ref = [
    {
      referencias:"",
      radio:""
    },
  ];


  var data = {
    referencias:$scope.ref.referencias,
    radio:$scope.ref.radio
  }

  $scope.add = function(){
    $scope.ref.push({
      referencias:"",
      radio:""
    });
  };


  //Guardar No Autorizados
  $scope.guardar = function(){

      //Armamos nuestra varibale data con los parametros necesarios para gurdar las referencias
      var data = {
          data:$scope.ref
      };
      console.log(data);

      //Se Ejecuta el Request
        FactoryAutorizados.guardar($scope.ref).then(function(d){

          if(d.status==200){
            if(d.data.msg == true){
              $.bootstrapGrowl("Zonas guardadas exitosamente", {type: 'success',delay: 10000});
              $scope.ref = [];
              $scope.ref.push({
                referencias:"",
                radio:""
              });
            }
          }else if(d.status==403){
            $.bootstrapGrowl("No tiene los permisos requeridos para crear Lugares Autorizados", {type: 'warning',delay: 10000});
          }else if(d.status==500){
            $.bootstrapGrowl("Error al guardar el lugar autorizado", {type: 'danger',delay: 10000});
          }
        });

  };

  $scope.eliminarCampo = function(indice){
    $scope.ref.splice(indice,1);
  }

  $scope.test = function(){
    console.log($scope.referencias.length);
  }

  $scope.init = function(){
    FactoryAutorizados.ObtenerRefNoAsignadas().then(function(d){

      if(d.data.msg == true){
          $scope.referencias = d.data.info;
          console.log($scope.referencias.length);
      }
    });
  }

});
