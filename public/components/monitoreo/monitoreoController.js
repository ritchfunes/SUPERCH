SabuesoAPP.controller("monitoreoController",function($scope,$http,ServicioUnidades,ServicioMapa,$uibModal,$log,FactoryPizarron
                                          ,ServicioPizarron,FactoryUnidades,FactoryCrearCategoria,ServiceCategoria
                                          ,FactoryEmpresas,$cookies,tokenService,FactoryMotorista,ServicioMotorista,factoryMonitoreo,ServicioGeocerca,FactoryGeocercas,$interval){





    var data=[];

    $scope.ListaExcesos=function()
    {
      $scope.vehiculosExcedidos=[];
      $scope.countTotalExcesos=[];
      angular.forEach($scope.limiteVelocidad,function(value,index) {
        vehiculo = {Vehiculo:value.Vehiculo,Cantidad:value.Cantidad};
        $scope.vehiculosExcedidos.push(vehiculo);
        if (value.Cantidad >= 6) {
          $scope.countTotalExcesos.push(value.Cantidad);
        }
      });

    };

    $scope.pastel = function(){
        var ordenados = [];
        data = [];
        $scope.vehiculo = [];
        $scope.tiempo = [];
        $scope.vehiculosDetenidos=[];
        $scope.countDetenidos=[];

        angular.forEach($scope.detenidos,function(value,index){
          tiempoD= $scope.fromNow1(value.Fecha)
          tiempoDe= $scope.fromNow2(tiempoD)
          infoVehiculo = {Vehiculo:value.Vehiculo,Fecha:value.Fecha,Tiempo:tiempoDe,Minutos:tiempoD,Ubicacion:value.Ubicacion,link:value.link};
          $scope.vehiculosDetenidos.push(infoVehiculo);
           data.push([value.Vehiculo,tiempoD]);
           $scope.vehiculo.push(value.Vehiculo);
           $scope.tiempo.push(tiempoD);
           if (infoVehiculo.Minutos >= 60) {
             $scope.countDetenidos.push("1");
           }

        });

    };

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

    //clearInterval(intervaloGraficas);
    var interval=$interval(function () {
        $scope.unidadesDetenidas();
        $scope.limitesVelocidad();
        //$scope.pastel();
        //$scope.ListaExcesos();
        $scope.tablaDinamica();
        $scope.graficoGeocercas();
        $scope.initUnidadesXGeo();
    },80000);
    //intervaloGraficas = setInterval(function(){

   // },80000);
/*
    setTimeout(function()
    {
        $scope.unidadesDetenidas();
        $scope.limitesVelocidad();
        $scope.pastel();
        $scope.ListaExcesos();
        $scope.initUnidadesXGeo();
    },1000);
*/
    //Funcion que solicita el listado de unidades detenidas
    $scope.unidadesDetenidas=function()
    {
      $http.get("/detenidos")
        .success(function(data){
            $scope.detenidos = data.info;
            $scope.pastel();
        })
        .error(function(err){

        });
    };

    $scope.limitesVelocidad=function()
    {
      $http.get("/limitevelocidad")
        .success(function(data){
            $scope.limiteVelocidad = data.info;
            $scope.ListaExcesos();
        })
        .error(function(err){

        });
    };

    $scope.utcTimeToLocalTime = function(dateTime){
        var localTime  = moment.utc(dateTime).toDate();
        return  moment(localTime).format('YYYY-MM-DD HH:mm:ss');
    }

    $scope.getMensaje = function(msj)
    {
        var JsonMsj =  JSON.parse(msj);
        return JsonMsj
    };

    $scope.initMonitoreo = function()
    {
        data=[];
        $scope.vehiculo = [];
        $scope.velocidad= [];
        $scope.ultimoInicio = "###-##-##";
        $scope.eventos = [];
        $scope.Ev = [];
        $scope.detenidos=[];
        $scope.vehiculosDetenidos=[];
        $scope.vehiculosExcedidos=[];
        $scope.vehiculoSeleccionado = "Honda";

        $scope.countTotalExcesos = [];

        $scope.countDetenidos = [];

        //mayores75
        $scope.vehiculosExcedidosMayor75 = [];

        //tabla dinamica
        $scope.dataGeocercas = [];
        $scope.detalleNombreGeocercas = [];
        $scope.detalleId = [];
        $scope.dataGra = [];

        //variables unidades en geocercas
        $scope.unidadesEnGeocercas=[];
        $scope.dataUnidades=[];
        $scope.fechaHoy="";
        $scope.totalEnGeocercas=0;

        $scope.unidadesDetenidas();
        $scope.limitesVelocidad();
        //$scope.pastel();
        //$scope.ListaExcesos();
        $scope.tablaDinamica();
        $scope.graficoGeocercas();
        $scope.initUnidadesXGeo();
        /*
        clearInterval(intervaloUnidades);
        $scope.ActualizarUnidades();

        intervaloUnidades = setInterval(function(){
            $scope.ActualizarUnidades();


        },30000)*/
    };

    $scope.tablaDinamica = function(){

      factoryMonitoreo.getData().then(function(res){
        if (res.data.msg == true) {
          //console.log(res.data.info);
          $scope.dataGeocercas = res.data.info;

          var geos = {};
          for(x in $scope.dataGeocercas){

            geos = {
              "nombre":$scope.dataGeocercas[x].Geocerca,
              "velo":$scope.dataGeocercas[x].Velocidad
            }

            $scope.detalleNombreGeocercas.push($scope.dataGeocercas[x].Geocerca);
            $scope.detalleId.push($scope.dataGeocercas[x].Velocidad);
            $scope.dataGra.push(geos);

        }

        //console.log($scope.detalleNombreGeocercas);

        var conta = 0;
        $scope.incidencias = [];
        $scope.Nombre = [];
        for (var i = 0; i < $scope.detalleNombreGeocercas.length; i++) {
          var buscar = $scope.detalleNombreGeocercas[i];

          for(x in $scope.detalleNombreGeocercas){
            if ($scope.detalleNombreGeocercas[x] == buscar) {
              conta++;
              //$scope.detalleNombreGeocercas.splice(x,1);
              delete $scope.detalleNombreGeocercas[x];

            }

          }
          if (buscar == undefined) {

          }else{
            $scope.incidencias.push(conta);
            if (buscar != undefined) {
              $scope.Nombre.push(buscar);
            }
            conta = 0;
          }

        }


/*
        console.log($scope.incidencias);
        console.log($scope.Nombre);
        console.log($scope.Nombre.length);
        console.log($scope.countTotalExcesos);
        console.log($scope.countDetenidos);
  */      //console.log($scope.dataGra);


            //grafico
            Highcharts.chart('container', {

                    chart: {
                      type:'column',
                      zoomType: 'x',
                      columnType:'sum'
                    },

                    credits: {
                        enabled: false
                    },

                    title: {
                      text: 'Geocercas con mas excesos'
                    },

                    xAxis: {
                        categories:$scope.Nombre,
                        title: {
                            text: "Geocercas"
                        }
                    },

                    yAxis: {
                        title: {
                            text: "Rango de Incidencias"
                        }
                    },

                    tooltip: {
                        valueSuffix: ' veces'
                    },
                    plotOptions:{
                      column:{
                        stacking: 'normal'
                      }
                    },

                    series: [{
                        //data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                        data:$scope.incidencias,
                        name:"Incidencias"
                    }],


                });


          var source = {
              datatype: "json",
              datafields: [
                  { name: 'Vehiculo', type: 'string' },
                  { name: 'filtro', type: 'string' },
                  { name: 'Velocidad', type: 'string' },
                  { name: 'Geocerca', type: 'string' },
                  { name: 'Hora', type: 'string' },

                ],
              id: 'id',
              localdata: res.data.info
          };

          var dataAdapter = new $.jqx.dataAdapter(source);
          $scope.gridSettings =
          {
              altrows: true,
              width: '1000',
              source: dataAdapter,
              //pageable: true,
              //pagesize: 20,
              groupable: true,
              filterable: true,
              ready: function()
              {
                $scope.gridSettings.apply('selectrow', 1);
              },
              sortable: true,

              columns: [
                  { text: 'Vehiculo', datafield: 'Vehiculo', width: 120 },
                  { text: 'Vel.Permi', datafield: 'filtro', width: 130 },
                  { text: 'Velocidad', datafield: 'Velocidad', width: 120 },
                  { text: 'Geocerca', datafield: 'Geocerca', width: 300 },
                  { text: 'Hora', datafield: 'Hora', width: 180 },
              ],
              groups: ['filtro']
          };

          $("#jqxgrid").on("pagechanged", function (event) {
                $("#eventslog").css('display', 'block');
                if ($("#events").find('.logged').length >= 5) {
                    $("#events").jqxPanel('clearcontent');
                }
                var args = event.args;
                var eventData = "pagechanged <div>Page:" + args.pagenum + ", Page Size: " + args.pagesize + "</div>";
                $('#events').jqxPanel('prepend', '<div class="logged" style="margin-top: 5px;">' + eventData + '</div>');
                // get page information.
                var paginginformation = $("#jqxgrid").jqxGrid('getpaginginformation');
                $('#paginginfo').html("<div style='margin-top: 5px;'>Page:" + paginginformation.pagenum + ", Page Size: " + paginginformation.pagesize + ", Pages Count: " + paginginformation.pagescount + "</div>");
            });
            $("#jqxgrid").on("pagesizechanged", function (event) {
                $("#eventslog").css('display', 'block');
                $("#events").jqxPanel('clearcontent');
                var args = event.args;
                var eventData = "pagesizechanged <div>Page:" + args.pagenum + ", Page Size: " + args.pagesize + ", Old Page Size: " + args.oldpagesize + "</div>";
                $('#events').jqxPanel('prepend', '<div style="margin-top: 5px;">' + eventData + '</div>');
                // get page information.
                var paginginformation = $("#jqxgrid").jqxGrid('getpaginginformation');
                $('#paginginfo').html("<div style='margin-top: 5px;'>Page:" + paginginformation.pagenum + ", Page Size: " + paginginformation.pagesize + ", Pages Count: " + paginginformation.pagescount + "</div>");
            });


          //expand group.
          $("#expand").on('click', function () {
              var groupnum = parseInt($("#groupnum").val());
              if (!isNaN(groupnum)) {
                  $("#jqxgrid").jqxGrid('expandgroup', groupnum);
              }
          });
          // collapse group.
          $("#collapse").on('click', function () {
              var groupnum = parseInt($("#groupnum").val());
              if (!isNaN(groupnum)) {
                  $("#jqxgrid").jqxGrid('collapsegroup', groupnum);
              }
          });
          // expand all groups.
          $("#expandall").on('click', function () {
              $("#jqxgrid").jqxGrid('expandallgroups');
          });
          // collapse all groups.
          $("#collapseall").on('click', function () {
              $("#jqxgrid").jqxGrid('collapseallgroups');
          });
          // trigger expand and collapse events.
          $("#jqxgrid").on('groupexpand', function (event) {
              var args = event.args;
              $("#expandedgroup").text("Group: " + args.group + ", Level: " + args.level);
          });
          $("#jqxgrid").on('groupcollapse', function (event) {
              var args = event.args;
              $("#collapsedgroup").text("Group: " + args.group + ", Level: " + args.level);
          });


          // now create the widget.
          $scope.createWidget = true;

          /*
          $("#excelExport").jqxButton();
          $("#htmlExport").jqxButton();
          $("#pdfExport").jqxButton();

          $("#excelExport").click(function () {
              $("#jqxgrid").jqxGrid('exportdata', 'xls', 'jqxGrid');
          });
          $("#htmlExport").click(function () {
              $("#jqxgrid").jqxGrid('exportdata', 'html', 'jqxGrid');
          });
          $("#pdfExport").click(function () {
              $("#jqxgrid").jqxGrid('exportdata', 'pdf', 'jqxGrid');
          });
          */

        }

      })

    };

    $scope.graficoGeocercas = function(){

  //console.log($scope.dataGra);
    Highcharts.chart('container', {
          chart: {
              type: 'column'
          },
          title: {
              text: 'Geocercas con mas excesos'
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              type: 'category',
              labels: {
                  rotation: -45,
                  style: {
                      fontSize: '13px',
                      fontFamily: 'Verdana, sans-serif'
                  }
              }
          },
          yAxis: {
              min: 0,
              title: {
                  text: ''
              }
          },
          legend: {
              enabled: false
          },
          tooltip: {
              pointFormat: ''
          },
          series: [{
              name: '',
              data: $scope.dataGra,
              dataLabels: {
                  enabled: true,
                  rotation: -90,
                  color: '#FFFFFF',
                  align: 'right',
                  format: '{point.y:.1f}', // one decimal
                  y: 10, // 10 pixels down from the top
                  style: {
                      fontSize: '13px',
                      fontFamily: 'Verdana, sans-serif'
                  }
              }
          }]
      });

};

    $scope.mayores75 = function(){

  $http.get("/excesosMayores75")
    .success(function(data){
        $scope.vehiculosExcedidosMayor75 = []
      $scope.vehiculosExcedidosMayor75 = data.info;
    })
    .error(function(err){
      console.log(err);
    });

};


/*setInterval(function(){
   $scope.mayores75();
}, 480000);
*/
    //::::::::::::::::::::::::Reporte Unidades en geocercas:::::::::::::::::::::::::::::::::::

    $scope.initUnidadesXGeo= function () {
        $scope.totalEnGeocercas=0;
        $scope.unidadesEnGeocercas=[];
        $scope.fechaHoy=$scope.formatLocalTime();
        data={
            fecha: $scope.fechaHoy
        };
        FactoryGeocercas.unidades(data).then(function(res) {
            if(res.status==200){
                if(res.data.msg==true){
                    $scope.dataUnidades=res.data.info;
                    cantidad=0;
                    temp=[];
                    for(x in res.data.info){
                        temp.push({
                            NombreGeocerca: x,
                            Cantidad: res.data.info[x].length
                        });
                        cantidad+=res.data.info[x].length;
                    }
                    $scope.totalEnGeocercas=cantidad;
                    $scope.unidadesEnGeocercas=temp;
                }
            }
        });
    };

    $scope.formatLocalTime= function () {
        localtime=moment().format('YYYY-MM-DD HH:mm:ss');
        return localtime;
    };
    
    $scope.detalleUnidades= function (geocerca) {
        var modalInstance = $uibModal.open({
            animation:true,
            templateUrl: 'components/monitoreo/detalleUnidadesPorGeocerca.html',
            controller: 'detalleUnidadesCtrl',
            size:'md',
            resolve: {
                geocerca: function () {
                    return [geocerca,$scope.dataUnidades[geocerca.NombreGeocerca]];
                }
            }
        });
    };

    $scope.exports= function () {
        var blob = new Blob([document.getElementById('unidadesXgeocerca').innerHTML], {
            type: 'application/xml;charset=utf-8', encoding: 'utf-8'
            //type: "text/plain;charset=utf-8;"
            //type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Reporte Unidades en Geocercas.xls");
    }

    $scope.$on('$destroy',function(){
        $interval.cancel(interval);
    })

});
