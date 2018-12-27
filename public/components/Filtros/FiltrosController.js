/**
 * Created by Roberto on 11/02/2016.
 */
SabuesoAPP.controller("FiltroController",function($scope,$http,ServiceFiltros,FactoryGeocercas,ServicioGeocerca,FactoryUnidades,FiltrosFactory,$uibModalInstance,$uibModal)
{

    $scope.listaGeocercas = [];
    $scope.unidades = [];

    $scope.unidadesMarcadas = [];
    $scope.geocercasMarcadas = [];


    $scope.nombre = "";
    $scope.correo = "";

    $scope.velocidad = false;
        $scope.velMin = 0;
        $scope.velMax = 60;

    $scope.permanencia = false;
        $scope.tiempo = 2;

    $scope.entrada = false;
    $scope.salida = false;

    $scope.frecuencia = 1;

    $scope.d1 = true;
    $scope.d2 = true;
    $scope.d3 = true;
    $scope.d4 = true;
    $scope.d5 = true;
    $scope.d6 = false;
    $scope.d7 = false;


    $scope.desde = new Date(2016, 03, 01,8, 00, 00, 00);
    $scope.hasta = new Date(2016, 03, 01,17, 00, 00, 00);
    $scope.hstep = 1;
    $scope.mstep = 1;


    //$scope.ismeridian = false;


    FactoryGeocercas.todas().then(function(d) {
        var Geocercas = d.data.info;
        angular.forEach(Geocercas, function(value, key) {
            var val = JSON.parse(value.pos);
            var geo = {
                Id:value.id,
                Nombre:val.properties.Nombre,
                Descripcion:val.properties.Descripcion,
                Marcado:value.marcado
            }
            $scope.listaGeocercas.push(geo);
        });
        //console.log(d.data.info);

    });
    $scope.unidades = [];

    $scope.cargarUnidades = function () {
        FactoryUnidades.listaPorEmpresa().then(function(res){
            if(res.status==200 || res.status==304){
                if(res.data.msg==true){
                    $scope.unidades=res.data.info;
                }
            }
        });
    };

    $scope.ok = function()
    {

        //console.log($scope.desde);
        //console.log($scope.hasta);
        //return false;

        $scope.unidadesMarcadas = [];
        $scope.geocercasMarcadas = [];

        for(var y in $scope.listaGeocercas)
        {
            if($scope.listaGeocercas[y].Marcado == true)
            {
                $scope.geocercasMarcadas.push($scope.listaGeocercas[y].Id)
            }
        }

        if($scope.geocercasMarcadas.length == 0){
            $.bootstrapGrowl("<h5>Debe Seleccionar al Menos Una Geocerca</h5>", {type: 'danger',delay: 10000});
            return;
        }

        for(var x in $scope.unidades)
        {
            if($scope.unidades[x].marcado == true)
            {
                $scope.unidadesMarcadas.push($scope.unidades[x].UnidadId)
            }
        }

        if($scope.unidadesMarcadas.length == 0){
            $.bootstrapGrowl("<h5>Debe Seleccionar al Menos Una Unidad</h5>", {type: 'danger',delay: 10000});
            return;
        }

        var data = {
            filtro:{
                "nombre":$scope.nombre,
                "correos":$scope.correo,
                "tipoVelocidad":$scope.velocidad,
                "tipoPermanencia":$scope.permanencia,
                "tipoEntrada":$scope.entrada,
                "tipoSalida":$scope.salida,
                "d1":$scope.d1,
                "d2":$scope.d2,
                "d3":$scope.d3,
                "d4":$scope.d4,
                "d5":$scope.d5,
                "d6":$scope.d6,
                "d7":$scope.d7,
                "desde": moment($scope.desde).format('YYYY-MM-DD HH:mm') ,
                "hasta": moment($scope.hasta).format('YYYY-MM-DD HH:mm') ,
                "frecuencia":$scope.frecuencia,
                "tiempo":$scope.tiempo,
                "velocidadMax":$scope.velMax,
                "velocidadMin":$scope.velMin,


            },
            unidades:$scope.unidadesMarcadas,
            geocercas:$scope.geocercasMarcadas
        };

        console.log(data);
        FiltrosFactory.guardar(data).then(function(d){


            $uibModalInstance.close(d);
            if (d.data)
            {
                if (d.data.msg) {
                    $.bootstrapGrowl("<h5>Informacion Guardada</h5>", {type: 'info',delay: 10000, width:300});
                    ServiceFiltros.listaFiltros = [];
                    $scope.listarFiltros();
                }
                else {
                    $.bootstrapGrowl("<h5>Error! No se Pudo Guardar</h5>", {type: 'danger',delay: 10000,width:'auto'});
                }
            }
            else
            {
                console.log(d);
                $.bootstrapGrowl("<h5>Hubo un Error Inesperado</h5>", {type: 'danger',delay: 10000});
            }
        });




    }

    $scope.listarFiltros = function(){

      if (ServiceFiltros.listaFiltros.length == 0) {
        FiltrosFactory.obtener().then(function(d)
        {
            ServiceFiltros.listaFiltros = d.data;
            console.log(ServiceFiltros.listaFiltros);

        });
      }
    }

    $scope.listaFiltros = function()
    {
      return  ServiceFiltros.listaFiltros;
    }

    //Eliminar Filtros
    $scope.eliminarFiltro = function(elemento,idFiltro){

        FiltrosFactory.eliminar({id:idFiltro}).then(function(d){
            console.log(d);
            if (d.data == "OK") {


              delete ServiceFiltros.listaFiltros[elemento[0].Nombre];


              $.bootstrapGrowl("Filtro borrado exitosamente!!!",{type:'success',delay:10000});
            }else{
              $.bootstrapGrowl("Ha ocurrido un error,intente nuevamente", {type: 'danger',delay: 10000});


            }
        });
    }



    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    //Funcion para editar filtro
    $scope.editarFiltro = function(elemento){

      var modalInstance = $uibModal.open({
        animation:true,
        templateUrl:'components/Filtros/VistaEditarFiltro.html',
        controller:'editarFiltroController',
        size:'lg',
        resolve:{
          elemento:function(){
            return elemento;
          }
        }
      });
    }


    $scope.todasUnidades;
    $scope.MarcartodasUnidades = function(){
      if ($scope.todasUnidades) {
        for(x in $scope.unidades){
          $scope.unidades[x].marcado = true;
        }
      }else {
        for(x in $scope.unidades){
          $scope.unidades[x].marcado = false;
        }
      }
    }


    $scope.todasGeocercas;
    $scope.MarcartodasGeocercas= function(){

      if ($scope.todasGeocercas) {
        for(y in $scope.listaGeocercas){
          $scope.listaGeocercas[y].Marcado = true;
        }
      }else {
        for(y in $scope.listaGeocercas){
          $scope.listaGeocercas[y].Marcado = false;
        }
      }
    }

});

SabuesoAPP.controller("editarFiltroController",function($scope,elemento,$uibModalInstance,FactoryGeocercas,FactoryUnidades,FiltrosFactory,ServiceFiltros,ServicioGeocerca)
{

  $scope.listaGeocercas = [];
  $scope.unidades = [];

  $scope.unidadesMarcadas = [];
  $scope.geocercasMarcadas = [];

  //Recuperacion de la Informacion

  $scope.nombre = elemento[0].Nombre;
  $scope.correo = elemento[0].Correos;

  if (elemento[0].TipoVelocidad == 1) {
    $scope.velocidad = true;
        $scope.velMin = elemento[0].VelocidadMin;
        $scope.velMax = elemento[0].VelocidadMax;
  }

  if (elemento[0].TipoPermanencia == 1) {
    $scope.permanencia = true;
        $scope.tiempo = elemento[0].Tiempo;
  }

  if (elemento[0].TipoEntrada == 1) {
    $scope.entrada = true;
  }

  if (elemento[0].TipoSalida == 1) {
    $scope.salida = true;
  }

  $scope.frecuencia = elemento[0].Frecuencia;

  $scope.d1 = false;
  $scope.d2 = false;
  $scope.d3 = false;
  $scope.d4 = false;
  $scope.d5 = false;
  $scope.d6 = false;
  $scope.d7 = false;

  if (elemento[0].d1 == 1) {
    $scope.d1 = true;
  }

  if (elemento[0].d2 == 1) {
    $scope.d2 = true;
  }

  if (elemento[0].d3 == 1) {
    $scope.d3 = true;
  }

  if (elemento[0].d4 == 1) {
    $scope.d4 = true;
  }

  if (elemento[0].d5 == 1) {
    $scope.d5 = true;
  }

  if (elemento[0].d6 == 1) {
    $scope.d6 = true;
  }

  if (elemento[0].d7 == 1) {
    $scope.d7 = true;
  }

  var horaDesde = elemento[0].Desde.split(":");
  var horaHasta = elemento[0].Hasta.split(":");

  $scope.desde = new Date(2016, 01, 01,horaDesde[0], horaDesde[1], horaDesde[2], 00);
  $scope.hasta = new Date(2016, 01, 01,horaHasta[0], horaHasta[1], horaHasta[2], 00);

  $scope.hstep = 1;
  $scope.mstep = 1;

  $scope.ismeridian = false;

  $scope.cambiosGeocercas = [];

    $scope.cargarGeocercas = function () {
        FactoryGeocercas.todas().then(function(d) {
            var Geocercas = d.data.info;
            angular.forEach(Geocercas, function(value, key) {
                var val = JSON.parse(value.pos);
                var geo = {
                    Id:value.id,
                    Nombre:val.properties.Nombre,
                    Descripcion:val.properties.Descripcion,
                    Marcado:value.marcado
                };
                $scope.listaGeocercas.push(geo);

            });

            var tamano = elemento.length;
            tamano = tamano - 1;

            //recorrer el arreglo de geocercas y ver cuales coinciden
            for (var i = 0; i <= tamano; i++) {
                for(var x in $scope.listaGeocercas)
                {
                    if($scope.listaGeocercas[x].Id == elemento[i].PK_GeocercaId)
                    {
                        $scope.listaGeocercas[x].Marcado = true;
                    }
                }
            }
        });
    };

    $scope.cargarUnidades = function () {
        FactoryUnidades.listaPorEmpresa().then(function(res){
            if(res.status==200 || res.status==304){
                if(res.data.msg==true){
                    $scope.unidades=res.data.info;

                    var tamano = elemento.length;
                    tamano = tamano - 1;
                    //recorrer el arreglo de unidades y cuales coinciden con las que me llegaron de la alerta seleccionada
                    for (var i = 0; i <= tamano; i++) {
                        for(var x in $scope.unidades)
                        {
                            if($scope.unidades[x].UnidadId == elemento[i].UnidadId)
                            {
                                $scope.unidades[x].marcado = true;
                            }
                        }
                    }
                }
            }
        });
    };

  $scope.listarFiltros = function(){

    if (ServiceFiltros.listaFiltros.length == 0) {
      FiltrosFactory.obtener().then(function(d)
      {
          ServiceFiltros.listaFiltros = d.data;
          console.log(ServiceFiltros.listaFiltros);

      });
    }
  }

  //Funcion para Actualizar el Filtro
  $scope.actualizarFiltro = function()
  {

      $scope.unidadesMarcadas = [];
      $scope.geocercasMarcadas = [];

      for(var y in $scope.listaGeocercas)
      {
          if($scope.listaGeocercas[y].Marcado == true)
          {
              $scope.geocercasMarcadas.push($scope.listaGeocercas[y].Id)
          }
      }

      if($scope.geocercasMarcadas.length == 0){
          $.bootstrapGrowl("<h5>Debe Seleccionar al Menos Una Geocerca</h5>", {type: 'danger',delay: 10000});
          return;
      }

      for(var x in $scope.unidades)
      {
          if($scope.unidades[x].marcado == true)
          {
              $scope.unidadesMarcadas.push($scope.unidades[x].UnidadId)
          }
      }

      if($scope.unidadesMarcadas.length == 0){
          $.bootstrapGrowl("<h5>Debe Seleccionar al Menos Una Unidad</h5>", {type: 'danger',delay: 10000});
          return;
      }

      //Armammos el objeto de Unidades con sus modificaciones
      $scope.cambiosUnidades =  [];
      var tamano = $scope.unidades.length;
      for (var i = 0; i < tamano; i++) {
        $scope.cambiosUnidades.push({id:$scope.unidades[i].UnidadId,estado:$scope.unidades[i].marcado?true:false});
      }

      //Armammos el objeto de Geocercas con sus modificaciones
      var size = $scope.listaGeocercas.length;
      size = size - 1
      $scope.cambiosGeocercas =  [];
      for (var h = 0; h <= size; h++) {

        $scope.cambiosGeocercas.push({id:$scope.listaGeocercas[h].Id,estado:$scope.listaGeocercas[h].Marcado?true:false});
      }



      var data = {

              id:elemento[0].FiltroId,
              nombre:$scope.nombre,
              descripcion:"",
              correos:$scope.correo,
              tipoVelocidad:$scope.velocidad,
              tipoPermanencia:$scope.permanencia,
              tipoEntrada:$scope.entrada,
              tipoSalida:$scope.salida,
              d1:$scope.d1,
              d2:$scope.d2,
              d3:$scope.d3,
              d4:$scope.d4,
              d5:$scope.d5,
              d6:$scope.d6,
              d7:$scope.d7,
              desde: moment($scope.desde).format('YYYY-MM-DD HH:mm') ,
              hasta: moment($scope.hasta).format('YYYY-MM-DD HH:mm') ,
              frecuencia:$scope.frecuencia,
              tiempo:$scope.tiempo,
              velocidadMax:$scope.velMax,
              velocidadMin:$scope.velMin,
              unidades:$scope.cambiosUnidades,
              geocercas:$scope.cambiosGeocercas
      };


      FiltrosFactory.actualizar(data).then(function(d){


          $uibModalInstance.close(d);
          if (d.data)
          {
              if (d.data.msg==true) {
                  $.bootstrapGrowl("<h5>Informacion Guardada</h5>", {type: 'info',delay: 10000, width:300});
                  ServiceFiltros.listaFiltros = [];
                  $scope.listarFiltros();
              }
              else {
                  $.bootstrapGrowl("<h5>Error! No se Pudo Guardar</h5>", {type: 'danger',delay: 10000,width:'auto'});
              }
          }
          else
          {
              console.log(d);
              $.bootstrapGrowl("<h5>Hubo un Error Inesperado</h5>", {type: 'danger',delay: 10000});
          }
      });


  }

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');

      //Desmarco todas las unidades
      var t = $scope.unidades.length;
      t = t - 1;
      for (var x = 0; x <= t; x++) {
        $scope.unidades[x].marcado = false;
      }
  };

  $scope.todasUnidades;
  $scope.MarcartodasUnidades = function(){
    if ($scope.todasUnidades) {
      for(x in $scope.unidades){
        $scope.unidades[x].marcado = true;
      }
    }else {
      for(x in $scope.unidades){
        $scope.unidades[x].marcado = false;
      }
    }
  }


  $scope.todasGeocercas;
  $scope.MarcartodasGeocercas= function(){

    if ($scope.todasGeocercas) {
      for(y in $scope.listaGeocercas){
        $scope.listaGeocercas[y].Marcado = true;
      }
    }else {
      for(y in $scope.listaGeocercas){
        $scope.listaGeocercas[y].Marcado = false;
      }
    }
  }

});
