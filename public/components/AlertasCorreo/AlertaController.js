SabuesoAPP.controller("AlertaController",function($scope,FactoryAlerta,ServicioUnidades,$uibModalInstance,ServiceAlertas,$uibModal)
{

    //Arreglo para listar unidades se toma los datos del servicio unidades
    $scope.unidades = [];
    $scope.unidades =  ServicioUnidades.ListaUnidades;
    $scope.nombreNotificacion;

    //Ir almacenado las unidades marcadas
    $scope.unidadesMarcadas = [];

    //Declaracion de arreglo para ir almacenado la lista de correos
    $scope.correos = [

                [""],

                ];

    //Funcion para agregar nuevo campo de correo e ir guardando en el arreglo de correos
      $scope.agregar = function(){

          $scope.correos.push([""]);
      }

      //Funcion para Eliminar un campo de correo
      $scope.eliminarCampo = function(indice){

        $scope.correos.splice(indice,1);

      }

      //Funcion para cerra el modal despues de guardar Alerta
      $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
      };



      $scope.guardarAlerta = function(){

          //Nuestro arreglo de correos lo pasamos a una sola variable separada por comas
          var Listacorreos = $scope.correos.toString();

          //Recorremos el arreglo de uniadades para sacar las que fueron marcadas
          for(var x in $scope.unidades)
          {
            if($scope.unidades[x].marcado == true)
            {
              $scope.unidadesMarcadas.push($scope.unidades[x].UnidadId)
            }
          }

          //Armamos nuestra varibale data con los parametros necesarios para gurdar las alerta
          var data = {
              nombre:$scope.nombreNotificacion,
              unidades:$scope.unidadesMarcadas,
              correos:Listacorreos,
              evento:'3' //Temporalmente se manda como alerta #3
          };
          console.log(data);
          if($scope.correos.length == 0){
            $.bootstrapGrowl("Debe Ingresar al menos un correo",{type:'danger',delay:10000});
          }else if($scope.unidadesMarcadas.length == 0){
            $.bootstrapGrowl("<h5>Debe Seleccionar al Menos Una Unidad</h5>", {type: 'danger',delay: 10000});
          }else{

            //Se Ejecuta el Request
            FactoryAlerta.guardar(data).then(function(d){

              if(d.data.msg == true){
                $.bootstrapGrowl("Alerta creada exitosamente", {type: 'success',delay: 10000});
                  ServiceAlertas.listaAlertas = [];
                  $scope .listarAlertas();
              }


            });

            //Vaciamos nuestro arreglo de unidades marcadas y cerramos el modal
            $scope.unidadesMarcadas = [];
            $scope.cancel();
          }
    }

    $scope.todos;
    $scope.marcarTodos = function(){
      if ($scope.todos) {
        for(x in $scope.unidades){
          $scope.unidades[x].marcado = true;
        }
      }else {
        for(x in $scope.unidades){
          $scope.unidades[x].marcado = false;
        }
      }
    }

    $scope.listarAlertas = function()
    {

        if(ServiceAlertas.listaAlertas.length == 0)
        {
            FactoryAlerta.ObtenerAlertas().then(function(d)
            {
                ServiceAlertas.listaAlertas = d.data.info;


            });
        }


    }

    //Retorna la Lista de Alertas
    $scope.listaAlertas = function()
    {


        return  ServiceAlertas.listaAlertas;

    }


    //Funcion Eliminar Alerta
    $scope.eliminarAlerta = function(elemento,idAalerta){

        FactoryAlerta.eliminar({id:idAalerta}).then(function(d){

            if (d.data.msg == true) {


              delete ServiceAlertas.listaAlertas[elemento[0].nombre]

              $.bootstrapGrowl("Alerta borrada exitosamente!!!",{type:'success',delay:10000});
            }else{
              $.bootstrapGrowl("Ha ocurrido un error,intente nuevamente", {type: 'danger',delay: 10000});
            }
        });
    }

    /*Mostar detalle de Alerta*/
    $scope.detalleAlerta = function(elemento){

      var modalInstance = $uibModal.open({

        animation:true,
        templateUrl:'components/AlertasCorreo/VistaDetalleAlerta.html',
        controller:'detalleAlertaController',
        size:'md',
        resolve:{
          elemento:function(){
            return elemento;
          }
        }
      });
    };

    //Editar Alertas
    $scope.editarAlerta = function(elemento){

      var modalInstance = $uibModal.open({

        animation:true,
        templateUrl:'components/AlertasCorreo/VistaEditarAlerta.html',
        controller:'editarAlertaController',
        size:'lg',
        resolve:{
          elemento:function(){
            return elemento;
          }
        }
      });

    };


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

SabuesoAPP.controller('detalleAlertaController',function($scope,elemento,$uibModalInstance){

  $scope.ElementoSeleccionado = [];
  $scope.ElementoSeleccionado = elemento;

  $scope.correos = [];
  $scope.correos = elemento[0].correo.split(",");

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };


});


SabuesoAPP.controller('editarAlertaController',function($scope,FactoryAlerta,elemento,$uibModalInstance,ServicioUnidades,ServiceAlertas){

  //Arreglo para listar unidades se toma los datos del servicio unidades
  $scope.unidades = [];
  $scope.unidades =  ServicioUnidades.ListaUnidades;
  $scope.nombreNotificacion;

  //Ir almacenado las unidades marcadas
  $scope.unidadesMarcadas = [];

  //Declaracion de arreglo para ir almacenado la lista de correos
  $scope.correos = [];

  //Funcion para agregar nuevo campo de correo e ir guardando en el arreglo de correos
    $scope.agregar = function(){

        $scope.correos.push({correo:""});
    }

    //Funcion para Eliminar un campo de correo
    $scope.eliminarCampo = function(indice){

      $scope.correos.splice(indice,1);

    }

    //Funcion para cerra el modal despues de guardar Alerta
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');

        //Desmarco todas las unidades
        var t = $scope.unidades.length;
        t = t - 1;
        for (var x = 0; x <= t; x++) {
          $scope.unidades[x].marcado = false;
        }

    };

    $scope.cancel2 = function () {
        $uibModalInstance.dismiss('cancel');
      };

      $scope.listarAlertas = function()
      {

          if(ServiceAlertas.listaAlertas.length == 0)
          {
              FactoryAlerta.ObtenerAlertas().then(function(d)
              {
                  ServiceAlertas.listaAlertas = d.data.info;


              });
          }


      }

    //Comenzar a cargar la informacion
    $scope.nombreNotificacion = elemento[0].nombre;

    //Separamos la cadena de correos y asignar al arreglo del formulario
    //$scope.correos = elemento[0].correo.spli  t(",");
    var email = elemento[0].correo.split(",");
    var l = email.length;


    for (var h = 0; h < l; h++) {
      $scope.correos.push({correo:email[h]});
    }


    /////////////////////////////////////
    var tamano = elemento.length;
    tamano = tamano - 1

    //recorrer el arreglo de unidades y cuales coinciden con las que me llegaron de la alerta seleccionada
    for (var i = 0; i <= tamano; i++) {
      for(var x in $scope.unidades)
      {
        if($scope.unidades[x].Vehiculo == elemento[i].Nombre_Vehiculo)
        {
          try{
            $scope.unidades[x].marcado = true;
          } catch(err){
            console.log(err);
          }
        }
      }
    }

    //Mandar hacer la modificacion ya con los datos actualizados
    $scope.actualizarAlerta = function(){

      var listaCorreos = [];
      for (var key in $scope.correos) {
        if ($scope.correos.hasOwnProperty(key)) {
          listaCorreos.push($scope.correos[key].correo);
        }
      }

      var listaFinalCorreos = listaCorreos.toString();

      $scope.cambiosUnidades =  [];

      var tamano = $scope.unidades.length;

      for (var i = 0; i < tamano; i++) {
        $scope.cambiosUnidades.push({id:$scope.unidades[i].UnidadId,estado:$scope.unidades[i].marcado?true:false});
      }


      var data = {
          id:elemento[0].Id,
          nombre:$scope.nombreNotificacion,
          correos:listaFinalCorreos,
          unidades:$scope.cambiosUnidades,
          //evento:'3' //Temporalmente se manda como alerta #3
      };

      //Se Ejecuta el Request
      FactoryAlerta.actualizar(data).then(function(d){

        if(d.data.msg == true){
          $.bootstrapGrowl("Alerta modificada exitosamente", {type: 'success',delay: 10000});
            ServiceAlertas.listaAlertas = [];
            $scope.listarAlertas();
            $scope.cancel2();
        }


      });



    };

});
