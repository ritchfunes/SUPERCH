/**
 * Created by Roberto on 28/10/2015.
 */
IconosVehiculosSelect=false;
intervaloGraficas = 0;
SabuesoAPP.controller("Pizarron",function($scope,$http,ServicioUnidades,ServicioMapa,$uibModal,$log,FactoryPizarron
                                          ,ServicioPizarron,FactoryUnidades,FactoryCrearCategoria,ServiceCategoria
                                          ,FactoryEmpresas,$cookies,tokenService,FactoryMotorista,ServicioMotorista){

    //$scope.$on('someEvent', function(event, mass){
        //alert(mass);
    //});
    $scope.logoSocio = globalHeader.logo;
    //if(typeof $cookies.get('sabuesoRol') === 'undefined'){}else{globalHeader.rol= $cookies.get('sabuesoRol');$cookies.remove('sabuesoRol')}




    $scope.iconosVehiculos = [];
    var data=[];
    $scope.vehiculo = [];
    $scope.velocidad= [];
    $scope.ultimoInicio = "###-##-##";
    $scope.eventos = [];
    $scope.Ev = [];
    $scope.detenidos=[];
    $scope.vehiculosDetenidos=[];
    $scope.vehiculosExcedidos=[];
    $scope.vehiculoSeleccionado = "Honda";
    $scope.conductorSeleccionado = "GPS & Security";
    $scope.imeiSeleccionado = "";
    $scope.rol = globalHeader.rol;
    //cargarEmpresas();
    $scope.listarMotoristas = function(){

      if (ServicioMotorista.listaMotorista.length == 0) {
          FactoryMotorista.Obtenerconductores().then(function(d){
            ServicioMotorista.listaMotorista = d.data.info;

          });
      }

    }


    $scope.ListaUnidades = function()
    {
        return ServicioUnidades.ListaUnidades;
    };

    $scope.ActualizarUnidades = function() {
        FactoryUnidades.listar().then(function (d) {

            ServicioUnidades.ListaUnidadesCompuesto = [];
            ServicioUnidades.ListaUnidades = [];
            lista = d.data.info;
            var nuevaLista =[]
            ServicioUnidades.ListaUnidades = d.data.info;
            //console.log(ServicioUnidades.ListaUnidades);

            angular.forEach(ServicioUnidades.ListaUnidades, function (value, key) {
                if((value.Latitud < -80 || value.Latitud > 80) || (value.Longitud < -180 || value.Longitud > 180))
                {return }
                addPuntoRastro({imei:value.Imei,lat:value.Latitud,lon:value.Longitud});
                tmpPunto = {
                    lat: value.Latitud,
                    lng: value.Longitud,
                    Imei:value.Imei,
                    elemento:value,
                    label: {
                        message: value.Vehiculo + "Vel: "+value.Velocidad+"KM/Ph",
                        options: {
                            noHide: true
                        }
                    },
                    icon: {
                        iconUrl: value.url,
                        shadowUrl: value.url,
                        iconSize:     [45, 45], // size of the icon
                        shadowSize:   [45, 45], // size of the shadow
                        //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                        //shadowAnchor: [4, 62],  // the same for the shadow
                        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor

                    }
                }
                ServicioUnidades.ListaUnidadesCompuesto.push(tmpPunto);


            });


        });

    };

    function addPuntoRastro(unidad){
        if (ServicioUnidades.rastroBandera == false)
            return;
        var imei = unidad.imei;
        var lat = unidad.lat;
        var lon = unidad.lon;

        if (angular.isObject(ServicioUnidades.rastros[imei]) ){
            ServicioUnidades.rastros[imei].latlngs.push({ lat: lat , lng: lon });
        }

    }


    //devuelve los eventos enviados por los gps
    $scope.EventoUsuarios=function()
    {
      return $scope.Eventos;
    };

    $scope.ListaExcesos=function()
    {
      $scope.vehiculosExcedidos=[];
      angular.forEach($scope.limiteVelocidad,function(value,index) {
        vehiculo = {Vehiculo:value.Vehiculo,Cantidad:value.Cantidad};
        $scope.vehiculosExcedidos.push(vehiculo);
      });

    }
    //carga la grafica de pastel
    $scope.pastel = function(){
        data = [];
        $scope.vehiculo = [];
        $scope.tiempo = [];
        $scope.vehiculosDetenidos=[];

        angular.forEach($scope.detenidos,function(value,index){
          tiempoD= $scope.fromNow1(value.Fecha)
          tiempoDe= $scope.fromNow2(tiempoD)
          infoVehiculo = {Vehiculo:value.Vehiculo,Fecha:value.Fecha,Tiempo:tiempoDe,Minutos:tiempoD,Ubicacion:value.Ubicacion}

          $scope.vehiculosDetenidos.push(infoVehiculo);
           data.push([value.Vehiculo,tiempoD]);
           $scope.vehiculo.push(value.Vehiculo);
           $scope.tiempo.push(tiempoD);

        });
        // Build the chart
/*        $('#PastelKilometraje').highcharts({
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: 'Unidades Detenidas'
            },
            tooltip: {
                pointFormat: 'Detenido por: <b>{point.y} minutos</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 45,
                    dataLabels: {
                        enabled: false,
                        format: '{point.name}'
                    },
                    showInLegend: true
                }
            },
          credits:
          {
            enabled:false
          }
          ,
            series: [{
                type: 'pie',
                name: data.tiempo,
                data: data
            }]
        });*/
    }
    $scope.fromNow1 = function(FechaHora)
    {
      tmpTime = $scope.utcTimeToLocalTime(FechaHora);
      var a = moment();
      var b = moment(tmpTime)
      now1 = a.diff(b,'minutes')
      return now1;

    };

  $scope.fromNow2 = function(tiempo)
  {


  //  tmpTime = $scope.utcTimeToLocalTime(FechaHora);
    var now1 =moment.duration(tiempo,'minutes').format("M [M],d [d], h [hrs], m [min] ");
    //var now1 = moment(tmpTime).fromNow(true)
    return now1;

  };
    //carga la grafica de barra
    $scope.HistoricoVelocidad = function()
    {
        $(function () {
            $('#HistoricoVelocidad').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Velocidad Actual'
                },
                subtitle: {
                    //text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
                },
                xAxis: {
                    categories: $scope.vehiculo,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        //text: 'Population (millions)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: 'km'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: '',
                    data:  $scope.velocidad
                }]
            });
        });
    }



    clearInterval(intervaloGraficas)
    intervaloGraficas = setInterval(function(){
        $scope.unidadesDetenidas();
        $scope.limitesVelocidad();
        $scope.pastel();
        $scope.ListaExcesos();
    },80000);

    setTimeout(function()
    {
        $scope.unidadesDetenidas();
        $scope.limitesVelocidad();
        $scope.pastel();
        $scope.ListaExcesos();

    },1000);


    //funcion que solicita el listado de los ultimos comandos enviados a los gps
    $scope.ultimosComandos = function()
    {
        $http.get("/bitacoras/eventos")
            .success(function(data){


                $scope.eventos = data.data;
            })
            .error(function(err){

            });
    }

    //Funcion que solicita el listado de unidades detenidas
    $scope.unidadesDetenidas=function()
    {
      $http.get("/detenidos")
        .success(function(data){
          $scope.detenidos = data.info;
        })
        .error(function(err){

        });
    }

  $scope.limitesVelocidad=function()
  {
    $http.get("/limitevelocidad")
      .success(function(data){
        $scope.limiteVelocidad = data.info;
      })
      .error(function(err){

      });
  }

  $scope.unidadesSinReportarArray = [];
  $scope.uniSinReportHoras = [];
  $scope.unidadesSinReportar=function()
  {
    $http.get("/unidadesSinReporte")
      .success(function(data){
        $scope.unidadesSinReportarArray = data.info;
          console.log(data.info);
        $scope.uniSinReportHoras=[];
        for(x in $scope.unidadesSinReportarArray){
          var data = {
            FechaHora:utcTimeToLocalTime($scope.unidadesSinReportarArray[x].FechaHora),
            DiffTime:$scope.fromNow2($scope.fromNow1($scope.unidadesSinReportarArray[x].FechaHora)),
            Latitud:$scope.unidadesSinReportarArray[x].Latitud,
            Longitud:$scope.unidadesSinReportarArray[x].Longitud,
            Ubicacion:$scope.unidadesSinReportarArray[x].Ubicacion,
            Vehiculo:$scope.unidadesSinReportarArray[x].Vehiculo,
            ModeloGPS:$scope.unidadesSinReportarArray[x].ModeloGPS
          }

          $scope.uniSinReportHoras.push(data);
        }

        //console.log("aqui");
        //console.log($scope.uniSinReportHoras);

        var source = {
              datatype: "json",
              datafields: [
                  { name: 'Vehiculo', type: 'string' },
                  { name: 'FechaHora', type: 'datetime' },
                  { name: 'ModeloGPS',type:'string'},
                  { name: 'DiffTime', type: 'datetime' }
                ],

              id: 'id',
              localdata: $scope.uniSinReportHoras
          };

          var localizationobj={}
          localizationobj.groupremovestring="Remover agrupado por columna";
          localizationobj.filtershowrowstring="Mostrar filas que contengan";
          localizationobj.pagergotopagestring="Ir a la pagina";
          localizationobj.groupsheaderstring="Arrastre aqui la columna para agrupar por ella";
          localizationobj.groupbystring="Agrupar por esta Columna";
          localizationobj.pagershowrowsstring="Cantidad de Lineas";

          var dataAdapter = new $.jqx.dataAdapter(source);
          $scope.gridSettings =
          {
              width: '410',
              source: dataAdapter,
              groupable:true,
              height: 500,
            localization:localizationobj,
              filterable: true,
              sortable: true,columnsresize: true,

            columns: [
                  { text: 'Vehiculo', datafield: 'Vehiculo', width: 150 },
                  { text: 'Tiempo', datafield: 'DiffTime', width: 150 },
                  { text: 'Ultima Fecha/Hora', datafield: 'FechaHora', width: 180 },
                  { text: 'Modelo', datafield: 'ModeloGPS',width:60}
                ],

            //groups: ['Vehiculo']
          };

          // now create the widget.
          $scope.createWidget = true;

          //export grid
          //$("#excelExport").jqxButton();
          //$("#htmlExport").jqxButton();
          //$("#pdfExport").jqxButton();

          $scope.excelExport=function () {
              $("#jqxgrid").jqxGrid('exportdata', 'xls', 'UnidadesSinReportar',true, null, true,'http://exportdata.stgands.com/dataexport.php');
          };
          $scope.htmlExport=function () {
              $("#jqxgrid").jqxGrid('exportdata', 'html', 'UnidadesSinReportar',true, null, true,'http://exportdata.stgands.com/dataexport.php');
          };
          $scope.pdfExport=function () {
              $("#jqxgrid").jqxGrid('exportdata', 'pdf', 'UnidadesSinReportar',true, null, true,'http://exportdata.stgands.com/dataexport.php');
          };

      })
      .error(function(err){

      });



  }



  $scope.unidadesSinReportar();
    setInterval(function(){
        $scope.unidadesSinReportar();
    }, 40000);

    //funcion que solicita el ultimo inicio de sesion
    $scope.ultimoInicio = function()
    {
        $http.get("/bitacoras/sesion")
            .success(function(data){
                $scope.ultimoInicio = data.fecha;
            })
            .error(function(err){

            });
    }

    //funcion que solicita el listado de los ultimos eventos enviados por los gps
    $scope.ultimoseventos = function()
    {
        $http.get("/eventos/all")
            .success(function(data){
                $scope.Ev=data.info
            }).error(function(err){

            });

    }
    $scope.limitesVelocidad();
    $scope.unidadesDetenidas();
    $scope.ultimoInicio();
    $scope.ultimosComandos();
    $scope.ultimoseventos();

    $scope.utcTimeToLocalTime = function(dateTime){
        var localTime  = moment.utc(dateTime).toDate();
        return  moment(localTime).format('YYYY-MM-DD HH:mm:ss');
    }

    $scope.getMensaje = function(msj)
    {
        var JsonMsj =  JSON.parse(msj);
        return JsonMsj
    }


    function listarCategorias()
    {

        var overlays = {
            draw: {
                name: 'draw',
                    type: 'group',
                    visible: true,
                    layerParams: {
                    showOnSelector: false
                }
            }
        }

        if (ServiceCategoria.listaCategorias.length > 0)
            return false;


        FactoryCrearCategoria.Obtenercategorias().then(function(d){
            var tmp = ServiceCategoria.listaCategorias = d.data.info;
            for(var x in tmp)
            {
                //var item = {id: tmp[x].id , label: tmp[x].Categoria};
                //$scope.categoriasListas.push(item);

                var tmpLayers = {
                    type:'group',
                    name:tmp[x].Categoria,
                    visible:false
                }

                overlays[tmp[x].Categoria] = tmpLayers;


            }

            ServicioMapa.overlays = overlays;
        });
    }
    listarCategorias();






    $scope.animationsEnabled = true;
    $scope.open = function (size,vehiculo,id,conductor,apellido,imei,url) {

        $scope.vehiculoSeleccionado = vehiculo;
        $scope.conductorSeleccionado = conductor;

        if (ServicioMotorista.listaMotorista.length == 0){
            $scope.listarMotoristas();
        }

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return [$scope.vehiculoSeleccionado,id,$scope.conductorSeleccionado,apellido,imei,url];
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    $scope.openModalEmpresas = function (size) {



        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'openModalEmpresas',
            controller: 'empresasCtrl',
            size: size,
            resolve: {
                items: function () {
                    return [];

                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

        $scope.cargarIconos();
    };

    $scope.cargarIconos = function()
    {

        setTimeout(function(){
            document.getElementById('my-icon-select2').addEventListener('changed', function (e) {
                var a = IconosVehiculosSelect;
            });
            IconosVehiculosSelect = new IconSelect("my-icon-select2");
            if ( ServicioPizarron.iconosVehiculos.length > 0 )
            {
                console.log("nothing to do ");
                IconosVehiculosSelect.refresh( ServicioPizarron.iconosVehiculos);

            }else{
                IconosVehiculosSelect.refresh($scope.iconosVehiculos);
                    FactoryPizarron.iconosVehiculos().then(function (d){
                    angular.forEach(d.data.info, function (value, key)
                    {
                        ServicioPizarron.iconosVehiculos.push({'iconFilePath': value.url , 'iconValue': value.id});
                    });
                    IconosVehiculosSelect.refresh( ServicioPizarron.iconosVehiculos);
                });
            }
        },300);
    }


    $scope.init = function()
    {
        clearInterval(intervaloUnidades);
        $scope.ActualizarUnidades();

        intervaloUnidades = setInterval(function(){
            $scope.ActualizarUnidades();

        },30000)
    }







});

SabuesoAPP.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items,FactoryPizarron,ServicioUnidades,ServicioMotorista,ServicioPizarron) {
    $scope.init= function () {
        $scope.vehiculoSeleccionado = items[0];
        $scope.conductorSeleccionado=items[2];
        $scope.conductorSelected = {};
        $scope.imei = items[4];
        var img = IconosVehiculosSelect;

        $scope.conductoresDisponibles = [];
        $scope.conductoresDisponibles = ServicioMotorista.listaMotorista;
        for(i in ServicioMotorista.listaMotorista){
            if(ServicioMotorista.listaMotorista[i].IdConductor==items[1]){
                $scope.conductorSelected=ServicioMotorista.listaMotorista[i];
            }
        }
        $scope.cargarIconos();
    };

    $scope.cargarIconos = function()
    {
        setTimeout(function(){
            document.getElementById('my-icon-select2').addEventListener('changed', function (e) {
                var a = IconosVehiculosSelect;
            });
            IconosVehiculosSelect = new IconSelect("my-icon-select2");
            if ( ServicioPizarron.iconosVehiculos.length > 0 )
            {
                IconosVehiculosSelect.refresh( ServicioPizarron.iconosVehiculos);
                selectedIndex=0;
                for(i=0;i<ServicioPizarron.iconosVehiculos.length;i++){
                    if(ServicioPizarron.iconosVehiculos[i]['iconFilePath']==items[5]){
                        selectedIndex=i;
                    }
                }
                IconosVehiculosSelect.setSelectedIndex(selectedIndex);
            }else{
                FactoryPizarron.iconosVehiculos().then(function (d){
                    angular.forEach(d.data.info, function (value, key)
                    {
                        ServicioPizarron.iconosVehiculos.push({'iconFilePath': value.url , 'iconValue': value.id});
                    });
                    IconosVehiculosSelect.refresh( ServicioPizarron.iconosVehiculos);
                    selectedIndex=0;
                    for(i=0;i<ServicioPizarron.iconosVehiculos.length;i++){
                        if(ServicioPizarron.iconosVehiculos[i]['iconFilePath']==items[5]){
                            selectedIndex=i;
                        }
                    }
                    IconosVehiculosSelect.setSelectedIndex(selectedIndex);
                });
            }
        },300);
    };

    $scope.ok = function () {
        var parametros = {
            imei:$scope.imei,
            conductor:$scope.conductorSelected['IdConductor'],
            vehiculo:$scope.vehiculoSeleccionado,
            icono: IconosVehiculosSelect.getSelectedValue()

        };
        //console.log(parametros);

        FactoryPizarron.actualizarVehiculosInfo(parametros).then(function (d){

            $uibModalInstance.close(d);
            if (d.data)
            {
                if (d.data.result == "ok") {
                    $.bootstrapGrowl("<h5>Informacion actualizada</h5>", {type: 'info',delay: 10000, width:300});

                    for(var x in ServicioUnidades.ListaUnidades){
                        if (ServicioUnidades.ListaUnidades[x].Imei == $scope.imei) {
                            ServicioUnidades.ListaUnidades[x].IdConductor = $scope.conductorSelected['IdConductor'];
                            ServicioUnidades.ListaUnidades[x].Conductor = $scope.conductorSelected['Nombre'];
                            ServicioUnidades.ListaUnidades[x].apellido = $scope.conductorSelected['Apellido'];
                            ServicioUnidades.ListaUnidades[x].Vehiculo = $scope.vehiculoSeleccionado;
                            ServicioUnidades.ListaUnidades[x].url = IconosVehiculosSelect.getSelectedFilePath();
                        }
                    }

                    $scope.conductorSeleccionado=$scope.conductorSelected['Nombre'];
                }
                else {
                    $.bootstrapGrowl("<h5>Error! No se Pudo Actualizar la Informacion</h5>", {type: 'danger',delay: 10000,width:'auto'});
                }
            }
            else
            {
                console.log(d);
                $.bootstrapGrowl("<h5>Hubo un Error Inesperado</h5>", {type: 'danger',delay: 10000});
            }


        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };







});

SabuesoAPP.controller('empresasCtrl', function ($scope,$cookies, $uibModalInstance, items,FactoryEmpresas,$window) {
    $scope.listadoEmpresas = null;


    FactoryEmpresas.listar().then(function(res){
        $scope.listadoEmpresas =  res.data.info;
    });


    $scope.listarUsuarios = function(empresa){

        if (typeof empresa.usuarios === 'undefined')
        {
            FactoryEmpresas.listarUsuarios(empresa.id_empresa).then(function(res){

                empresa.usuarios = res.data;
                //console.log($scope.listadoEmpresas);
            });
        }

    }

    $scope.generarAcceso = function(empresa,usuario)
    {
        //$rootScope.$broadcast('someEvent', [1,2,3]);




        data = {
            Empresa:empresa.Nombre,
            EmpresasId:empresa.id_empresa,
            Usuario:usuario.Usuario,
            UsuariosId:usuario.usuario_id,
            RolesId:usuario.rol_id,
            SocioId:empresa.id_socio,
            logo:globalHeader.logo
        };



        FactoryEmpresas.generarAcceso(data).then(function(res) {
            $cookies.put('sabuesoRol', data.RolesId);
            var cliente =  $window.open('/login?visit='+res.data.token);
        });
    }



    $scope.ok = function () {



    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };



});
