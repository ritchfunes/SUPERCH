/**
 * Created by GMG on 09/07/2015.
 */

var overlay;
intervaloUnidades = function(){};
intervalo=function () {};


angular.module("Sabueso").controller("AlertasController",function($scope,$rootScope,leafletData,$http,$interval,ServicioUnidades,FactoryUnidades,FactoryAlertas,
                                                                  ServicioMapa,FactoryMain,$uibModal,$log,$filter,$timeout){
        moment.locale('es',{
            relativeTime:{
                s   :'%d S',
                m   :'1 m',
                mm  :'%d m',
                h   :'1 H',
                hh  :'%d H',
                d   :'1 d',
                dd  :'%d d',
                M   :'1 M',
                MM  :'%d M',
                y   :'1 Y',
                yy  :'%d Y'
            }
        });
        var colors = ['#88a9d0','#e479ba','#3396ba','#631bd9','#812f08','#8d4fc5','#15b233','#d1c11c','#b03d67','#1a6680','#636909','#c0235a','#b25515']
        $scope.logoSocio = globalHeader.logo;
        var unidadesSeleccionadas = [];
        $scope.markers = [];
        $scope.posts=[];
        markersTmp=[];




        ServicioMapa.center = {
            lat: 14.599531,
            lng: -86.561279,
            zoom: 8
        };
        $scope.center1 = function(){
            return ServicioMapa.center;
        }
        $scope.drawnItems = new L.GeoJSON();
        $scope.editableItem=new L.GeoJSON();
        var options = {
            edit: {
                featureGroup: $scope.editableItem,

            },
            draw: {
                rectangle:false,
                circle:false,

                polygon: {
                    shapeOptions: {
                        color: 'purple'
                    },
                    showArea:true,
                    metric:false,
                    allowIntersection: false,


                }
                },
            showRadius: true
        };
        var drawControl = new L.Control.Draw(options);

        $rootScope.$on('eventName', function (event, args) {
            var lon = args.lon;
            var lat = args.lat;
            $scope.LocalizarPunto(lat,lon);
            //alert($scope.message);
        });



        angular.extend($scope, {
            center:{
                lat: 15.529,
                lng: -88.027,
                zoom: 15
            },

                controls: {
                    custom: [drawControl]
                },
                layers: {
                    baselayers: {
                        osm: {
                            name: 'OpenStreetMap',
                            type: 'xyz',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            layerOptions: {
                                subdomains: ['a', 'b', 'c'],
                                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                                continuousWorld: true
                            }
                        },
                        googleTerrain: {
                            name: 'Google Terrain',
                            layerType: 'TERRAIN',
                            type: 'google'
                        },
                        googleHybrid: {
                            name: 'Google Hybrid',
                            layerType: 'HYBRID',
                            type: 'google'
                        },
                        bingAerial: {
                            name: 'Bing Aerial',
                            type: 'bing',
                            key: 'Aj6XtE1Q1rIvehmjn2Rh1LR2qvMGZ-8vPS9Hn3jCeUiToM77JFnf-kFRzyMELDol',
                            layerOptions: {
                                type: 'Aerial'
                            }
                        },
                        bingRoad: {
                            name: 'Bing Road',
                            type: 'bing',
                            key: 'Aj6XtE1Q1rIvehmjn2Rh1LR2qvMGZ-8vPS9Hn3jCeUiToM77JFnf-kFRzyMELDol',
                            layerOptions: {
                                type: 'Road'
                            }
                        },
                        googleRoadmap: {
                            name: 'Google Streets',
                            layerType: 'ROADMAP',
                            type: 'google'
                        }


                    },
                    overlays:ServicioMapa.overlays
                },
                overlays: {
                    draw: {
                        name: 'draw',
                        type: 'group',
                        visible: true,
                        layerParams: {
                            showOnSelector: false
                        }
                    }
                },
                Paths:{
                    p1: {
                        color: 'yellow',
                        weight:4,
                        latlngs:
                            [
                                { lat: 51.50, lng: -0.082 },
                                { lat: 48.83, lng: 2.37 },
                                { lat: 41.91, lng: 12.48 }
                            ],
                        //message: "<h3>Route from London to Rome</h3><p>Distance: 1862km</p>",
                    }
                },
                events: { // or just {} //all events
                    markers:{
                        //enable: [ 'dragend', 'click' ],
                        //logic: 'emit'
                    },
                    map:{
                    }
                },
                geojson:{}

            });




        function convertToObjectJSON(elemento){
          try {
            var c = JSON.stringify(elemento);
            var d = c.substring(1,c.length-1);
            var a = d.replace(/'/g,'"');
            return JSON.parse(a);
          } catch (e) {
            return {};
          }

        }

        $scope.ActualizarUnidades = function(){

          FactoryAlertas.listar().then(function (d) {

                     if(angular.isObject(d.data) == false  ||  d.data.info.length  == 0)
                            return;

                        ServicioUnidades.ListaUnidadesCompuesto = [];
                        ServicioUnidades.ListaUnidades = d.data.info;
                        angular.forEach(ServicioUnidades.ListaUnidades, function (value, key) {



                            if((value.Latitud < -80 || value.Latitud > 80) || (value.Longitud < -180 || value.Longitud > 180))
                            {return }

                            var html = "<div ng-controller='markerClickCtrl'>" +
                                "<button class='btn-sm btn-info' ng-click='modalOpciones("+JSON.stringify(value)+")'>Ver Informacion</button>" +
                                "</div>";
                            addPuntoRastro({imei:value.Imei,lat:value.Latitud,lon:value.Longitud});
                            var trama = value.TramaExtendida;
                            var temp = "";

                            if (trama == "" || trama == "{}") {

                            }else{

                              var objetoJSON = convertToObjectJSON(trama);
                              if ( typeof objetoJSON.Sensor1 !== "undefined" ){
                                  temp = "Temp: "+ objetoJSON.Sensor1;
                              }

                            }
                              tmpPunto = {

                                  lat: value.Latitud,
                                  lng: value.Longitud,
                                  Imei:value.Imei,
                                  elemento:value,
                                  message: html,
                                  label: {
                                      message: "<span>" + value.NombreCompleto + " Vel: "+value.Velocidad+"KM/h " + temp + "</span>" ,
                                      options: {
                                          noHide: true
                                      }
                                  },
                                  icon: {
                                      iconUrl: value.url,
                                      shadowUrl: value.url,
                                      iconSize:     [45, 45], // size of the icon
                                      shadowSize:   [45, 45], // size of the shadow
                                  }
                              }

                            ServicioUnidades.ListaUnidadesCompuesto.push(tmpPunto);
                        });


                        actualizarUnidsSelec();
                        if (!$scope.verificado){
                            $timeout(function(){
                                if( ServicioUnidades.ListaUnidadesCompuesto.length <= 10){
                                    $scope.todos = true;
                                    $scope.marcarTodos();
                                    $scope.verificado = true;
                                }
                            },500);
                        }

                    });
        };

        $scope.marcarTodos = function(){
            unidadesSeleccionadas = [];
            if ($scope.todos){
                for(idx in $scope.unidadesFiltradas){
                    var unidad = $scope.unidadesFiltradas[idx];
                    unidad.check = true;
                    $scope.toggleUnidades(unidad);
                }
            }
            else{
                for(idx in ServicioUnidades.ListaUnidadesCompuesto){
                    var unidad = ServicioUnidades.ListaUnidadesCompuesto[idx];
                    unidad.check = false;
                }
                $scope.markers = unidadesSeleccionadas;
            }
        }

        $scope.toggleUnidades = function(unidad){
            var idx = unidadesSeleccionadas.indexOf(unidad);
            if (idx === -1)//Marcar unidades
            {
                unidadesSeleccionadas.push(unidad);
                if(ServicioUnidades.rastroBandera)
                    $scope.Paths[unidad.Imei] = ServicioUnidades.rastros[unidad.Imei]
            }
            else{//Desmarcar Unidades
                unidadesSeleccionadas.splice(idx,1);
                delete $scope.Paths[unidad.Imei];

            }

            $scope.markers = unidadesSeleccionadas;
        };

        function  actualizarUnidsSelec() {
            for(idx in unidadesSeleccionadas){
                var imei = unidadesSeleccionadas[idx].Imei
                var unidad = $filter('filter')( ServicioUnidades.ListaUnidadesCompuesto, {Imei: imei}, true);

                if (unidad != []){
                    unidad[0].check = true;
                    unidadesSeleccionadas[idx] = unidad[0];
                }
            }

            $scope.markers = unidadesSeleccionadas;
        }

        $scope.rastros = function(){

            if ($scope.rastro){
                if (ServicioUnidades.rastroBandera == false){
                    ServicioUnidades.rastroBandera = true;

                    FactoryMain.rastro({ imei: allImei() }).then(function(res){
                        if(angular.isObject( res.data ) && res.data.info) {

                            var allRastros = res.data.info;
                            angular.forEach(allRastros,function(rastroUnidad,unidad){
                                var clr = colors[parseInt((Math.random() * 13))];
                                ServicioUnidades.rastros[unidad] = { color: clr, weight: 6, latlngs:[] }
                                angular.forEach(rastroUnidad,function(detalleRastro,key){
                                    //$scope.Paths[unidad].latlngs.push({ lat: detalleRastro.Latitud , lng: detalleRastro.Longitud })
                                    ServicioUnidades.rastros[unidad].latlngs.push({ lat: detalleRastro.Latitud , lng: detalleRastro.Longitud })
                                });
                            });
                            $scope.Paths = angular.copy(ServicioUnidades.rastros);
                            deleteRastros();
                        }
                    });

                }
                else{
                    console.log("Ya se hizo el request");
                    $scope.Paths = angular.copy(ServicioUnidades.rastros);
                    deleteRastros();
                }
            }
            else{
                $scope.Paths = {};
            }
        };

        function allImei(){
            var imeis = []
            angular.forEach(ServicioUnidades.ListaUnidadesCompuesto,function(value,key){
                imeis.push(value.Imei);
            });
            return imeis;
        }

        function addPuntoRastro(unidad){

            if (ServicioUnidades.rastroBandera == false)
                return;


            var imei = unidad.imei;
            var lat = unidad.lat;
            var lon = unidad.lon;




            if (    angular.isObject(ServicioUnidades.rastros[imei]) ){

                ServicioUnidades.rastros[imei].latlngs.push({ lat: lat , lng: lon });

                if ($scope.rastro && angular.isObject($scope.Paths[imei]) ) {
                    $scope.Paths[imei].latlngs.push({ lat: lat , lng: lon });
                }




            }

        }

        //Eliminamos el rastro de los vehiculos no seleccionados
        function deleteRastros(){
            $scope.Paths = angular.copy(ServicioUnidades.rastros);
            angular.forEach($scope.ListaUnidades(),function(value,key){
                if (!value.check){
                    delete $scope.Paths[value.Imei];
                }
            });
        }


        $scope.ListaUnidades = function() {
            return ServicioUnidades.ListaUnidadesCompuesto;
        }


        $scope.init = function(){
           clearInterval(intervaloUnidades);
            $scope.ActualizarUnidades();

            intervaloUnidades = setInterval(function(){
                $scope.ActualizarUnidades();


            },20000)
            //centrarMapa();
        }

        function centrarMapa(){


            var unidades = ServicioUnidades.ListaUnidadesCompuesto;
            var minLon = unidades[0].lng;
            var maxLon = unidades[0].lng;
            var minLat = unidades[0].lat;
            var maxLat = unidades[0].lat;

            for(idx in unidades){
                minLon = unidades[idx].lng < minLon?unidades[idx].lng:minLon;
                maxLon = unidades[idx].lng > maxLon?unidades[idx].lng:maxLon;

                minLat = unidades[idx].lat < minLat?unidades[idx].lat :minLat;
                maxLat = unidades[idx].lat > maxLat?unidades[idx].lat :maxLat;
            }
            var lon = (minLon + maxLon) / 2 //lon / puntos.length;
            var lat = (minLat + maxLat) / 2 //lat / puntos.length;

            ServicioMapa.center = {lat: lat, lng: lon, zoom: 8};

        }

        $scope.getVista = function(){
            return ServicioMapa.vista;
        }

        $scope.getIndiceActual = function()
        {
            return ServicioMapa.indiceActual;
        };



        $scope.markers2 = function(){
            return $scope.markers;
        };



        $scope.LocalizarPunto = function(lat,lon) {
            ServicioMapa.center = {
                lat: lat,
                lng: lon,
                zoom: 16
            };

        };



        /*para verificar si un carro esta marcado para que aparezca en el mapa
          si no esta marcado en esta funcion se marcara y se agregara  a la lista de unidades marcadas*/
        $scope.verificarCheck = function(unidad){

            if(!unidad.check){
                unidad.check= true;
                $scope.toggleUnidades(unidad);
            }
        }

		$scope.comandoPosicion = function(unidad){
            if(unidad.sentCommand){
                $.bootstrapGrowl("Ya hay una petición de comando en curso",{
                    type: 'danger',
                    align: 'center',
                    delay:20000
                });
                return false;
            }


            unidad.sentCommand = true;
            $.bootstrapGrowl("posicionando", {type: 'info'});
            FactoryMain.posicion(unidad.Imei,unidad.Vehiculo).then(function(d){
                  //console.log(d);

                  if(d.status == -1 || d.data == "timed out"){
                      $.bootstrapGrowl("Actualmente no se pudo conectar con el gps,  espere un momento y vuelva a intentar",{
                          type: 'danger',
                          align: 'center',
                          delay:180000
                      });
                      unidad.sentCommand = false;
                      return false;
                  }

                  trama = String(d.data).split(",");
                  if ( trama[0] == "pos")
                  {

                      for(var x in $scope.markers){
                          if (String($scope.markers[x].Imei) == trama[1] ){
                              //alert('Lo Encontro');
                              $scope.markers[x].lat = parseFloat(trama[4]);
                              $scope.markers[x].lng = parseFloat(trama[3]);
                              $scope.LocalizarPunto(parseFloat(trama[4]),parseFloat(trama[3]))
                          }
                      }




                      var fechaHora = moment(trama[2],'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss');
                      unidad.FechaHora = fechaHora;
                      console.log(unidad.FechaHora)

                  }
                    unidad.sentCommand = false;
              }
            );

        };

        $scope.utcTimeToLocalTime = function(dateTime)
        {

            var localTime  = moment.utc(dateTime).toDate();
            return  moment(localTime).format('YYYY-MM-DD HH:mm:ss');

        }

        $scope.fromNow1 = function(FechaHora)
        {
            tmpTime = $scope.utcTimeToLocalTime(FechaHora);
            var now1 = moment(tmpTime).fromNow(true)
            return now1;

        };

        //Variable de configuracion para e formato del select multiple de categorias
        $scope.configuracion = {
            enableSearch: true,
            scrollable: true,
            scrollableHeight: '230px'

        };

       //Arreglo donde se recibe los registro de cheklist
       $scope.datosmodel = [];


});

SabuesoAPP.controller("mainCtrl",function($scope,$uibModal,$http,ServicioAlerta,FactoryMain,$window,$location,$interval,$log,webNotification){
     $scope.empresa = globalHeader.empresa;
     $scope.usuario = globalHeader.usuario;
     $scope.vistaPrincipal = "/components/Alertas/MapaAlertas.html";

     $scope.setVistaPrincipal = function(url) {
        console.log(url)
        if (url != $scope.vistaPrincipal )
        {
          $scope.vistaPrincipal = url;
        }
      };

     $scope.getVistaPrincipal = function() {
    return $scope.vistaPrincipal ;
  }


});


angular.module("Sabueso").controller('opcionesCtrl', function ($scope, $uibModalInstance, unidad,FactoryMain,$http) {

    $scope.unidad = unidad;
    $scope.ultimasPosiciones = [];
    $scope.invitado = "";
    $scope.correoInvitado = "";


    var tmpDate = new Date();
    var tmpAno = tmpDate.getFullYear();
    var tmpMes = tmpDate.getMonth();
    var tmpDia = tmpDate.getDate();
    $scope.inicioAccesoTmp = { value: new Date(tmpAno,tmpMes,tmpDia,06,00) };
    $scope.finAccesoTmp = { value: new Date(tmpAno,tmpMes,tmpDia,17,00) };

    function getUltimasPosiciones() {
        FactoryMain.prueba($scope.unidad.Imei).then(function(d) {
                $scope.ultimasPosiciones = d.data.info;

        });
    }
    getUltimasPosiciones();

    $scope.comandoLlavines = function(){

        $.bootstrapGrowl("Comando Enviado, Abriendo Llavines", {type: 'info'});
        var tmpImei = $scope.unidad.Imei;
        var tmpVehiculo = $scope.unidad.Vehiculo;

        FactoryMain.Llavines(tmpImei,tmpVehiculo).then(function(d){
                tmpTrama = String(d.data).split(",")
                console.log(d.data);
                if (tmpTrama[0] == "OK")
                { $.bootstrapGrowl("Llavines Abiertos!", {type: 'success'}); }
                else
                { $.bootstrapGrowl("Error! No se Pudo Abrir Los Llavines", {type: 'danger'}); }

        });

    }

    $scope.comandoHabilitar = function(){
        $.bootstrapGrowl("Comando Enviado, Habilitando", {type: 'info'});
        var tmpImei = $scope.unidad.Imei;
        var tmpVehiculo = $scope.unidad.Vehiculo;

        FactoryMain.habilitar(tmpImei,tmpVehiculo).then(function(d){
                tmpTrama = String(d.data).split(",")
                console.log(d.data);
                if (tmpTrama[0] == "OK")
                { $.bootstrapGrowl("Vehiculo Habilitado!", {type: 'success'}); }
                else
                { $.bootstrapGrowl("Error! No se Pudo Habilitar", {type: 'danger'}); }

        });
    };

    $scope.comandoApagar = function(){
        $.bootstrapGrowl("Comando Enviado, Apagando", {type: 'info'});
        var tmpImei = $scope.unidad.Imei;
        var tmpVehiculo = $scope.unidad.Vehiculo;
        FactoryMain.apagar(tmpImei,tmpVehiculo).then(function(d){
                tmpTrama = String(d.data).split(",")
                console.log(d.data);
                if (tmpTrama[0] == "OK")
                { $.bootstrapGrowl("Vehiculo Apagado!", {type: 'success'}); }
                else
                { $.bootstrapGrowl("Error! No se Pudo Apagar", {type: 'danger'}); }

        });
    };

    $scope.crearAccesoTmp = function(){
        var data = {
            inicio:moment.utc($scope.inicioAccesoTmp.value).format('YYYY-MM-DD HH:mm:ss'),
            fin:moment.utc($scope.finAccesoTmp.value).format('YYYY-MM-DD HH:mm:ss'),
            Invitado:$scope.invitado,
            correo:$scope.correoInvitado,
            unidad:$scope.unidad.UnidadId,
            empresa:globalHeader.empresa
        }
        //console.log(data);

        FactoryMain.tmpToken(data).then(function(res){
            if(angular.isObject( res.data ) && res.data.msg) {
                $.bootstrapGrowl("Se genero el acceso correctamente!", {type: 'info'});
                $uibModalInstance.dismiss('cancel');
            }
            else{
                $.bootstrapGrowl("Hubo un error al generar el acceso", {type: 'danger'});
            }
        })

    }

    $scope.accesoSeguimiento = function(){
        var data = {
            unidad:$scope.unidad.UnidadId,
            empresa:globalHeader.empresa
        };


        FactoryMain.accesoSeguimiento(data).then(function(res){
            console.log(res.data)
            if(angular.isObject( res.data ) && res.data.token) {
                window.open("/invitado?t="+res.data.token,"","width=500,height=400");
            }
            else{
                $.bootstrapGrowl("Upss! Hubo un error", {type: 'danger'});
            }
        })

    }



    $scope.LocalizarPunto = function(posicion,unidad){
        var data =
        {
            res:'posicion',
            lat: posicion.Latitud,
            lon: posicion.Longitud,
            unidad: unidad.Vehiculo,
            fechahora: $scope.utcTimeToLocalTime(posicion.FechaHora),
            velocidad: posicion.Velocidad
        };
        $uibModalInstance.close(data);
    };

    function reverseGeocoding(){


        $http.get("/geocoder?lon="+$scope.unidad.Longitud+"&lat="+$scope.unidad.Latitud)
            .success(function(data){
                distancia = Math.round(data.dis)
                if (distancia>50){
                    $scope.reverseGeocoding = {geo:"A "+ distancia+" metros de " + data.obj.properties.nombre + (data.obj.properties.Municipio ? ", "+data.obj.properties.Municipio : "") + (data.obj.properties.Departamento ? ", "+data.obj.properties.Departamento :"")  };
                }else{
                    $scope.reverseGeocoding = {geo:"En " + data.obj.properties.nombre +  (data.obj.properties.Municipio ? ", "+data.obj.properties.Municipio : "") + (data.obj.properties.Departamento ? ", "+data.obj.properties.Departamento :"") };
                }
            })
            .error(function(err){

            });
    };
    reverseGeocoding();

    $scope.utcTimeToLocalTime = function(dateTime) {
        var localTime  = moment.utc(dateTime).toDate();
        return  moment(localTime).format('YYYY-MM-DD HH:mm:ss');
    }

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module("Sabueso").controller('markerClickCtrl',function($scope,$uibModal,$log,ServicioMapa){
    $scope.modalOpciones = function(unidad) {
        var modalInstance = $uibModal.open({
            animation:true,
            templateUrl: 'components/Main/vistaOpciones.html',
            controller: 'opcionesCtrl',
            size:'',
            resolve: {
                unidad: function () {
                    return unidad;

                }
            }
        });

        modalInstance.result.then(function (_res) {
            if(angular.isObject(_res)){
                if(_res.res == 'posicion')
                {
                    $scope.LocalizarPunto(_res.lat,_res.lon);
                }


            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });


    }

    $scope.LocalizarPunto = function(lat,lon)
    {
        ServicioMapa.center = {
            lat: lat,
            lng: lon,
            zoom: 20
        };
        //console.log("entramos "+lat+":"+lon);
        $("#Modal-Opciones").modal("hide");
        //ServicioMapa.MapaConfiguracion.centrar = tmpCentro;
    };
});

angular.module("Sabueso").controller('alertasCtrl', function ($scope, $uibModalInstance,alertas,$location, $anchorScroll) {

    /*$scope.limpiarListaAlertas = function(){
     alertas = [];
     }*/

    $scope.alertas = function(){
        return alertas[0];
    };

    $scope.detenidos= function () {
        return alertas[1];
    };
    $scope.sinReportar= function () {
      return alertas[2];
    }

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        //$uibModalInstance.close(alertas.length);
    };

    $scope.utcTimeToLocalTime = function(dateTime){
        var localTime  = moment.utc(dateTime).toDate();
        return  moment(localTime).format('YYYY-MM-DD HH:mm:ss');
    }

    $scope.scrollTo = function(id) {
        $location.hash(id);
        $anchorScroll();
    }
});

SabuesoAPP.controller("ListarController",function($scope,$uibModal,$http,ServicioAlerta,FactoryMain,$window,$location,$interval,$log,webNotification){
  var audio = new Audio('assets/sounds/Notification1.mp3');
  $scope.empresa = globalHeader.empresa;
  $scope.usuario = globalHeader.usuario;
  $scope.alertas = 0;
  $scope.listaAlertas = [];
  $scope.detenciones = [];
  $scope.sinReportar=[];
  $scope.vistaPrincipal = "/components/Alertas/MapaAlertas.html";

  $scope.setVistaPrincipal = function(url) {
    console.log(url)
    if (url != $scope.vistaPrincipal )
    {
      $scope.vistaPrincipal = url;
    }
  };

  $scope.getVistaPrincipal = function() {
    return $scope.vistaPrincipal ;
  }

  $scope.pedirAlertas=function(){
    FactoryMain.alertas().then(function(res){
      if(res.status==200){
        if (angular.isObject(res.data)){
          if(res.data.msg==true){
            if($scope.listaAlertas.length+$scope.detenciones.length+$scope.sinReportar.length >= 1000){
              $scope.listaAlertas = [];
              $scope.alertas = 0;
              $scope.detenciones=[];
              $scope.sinReportar=[];
            }
            $scope.alertas += res.data.info.length;
            $scope.listaAlertas = res.data.info.concat($scope.listaAlertas);
            if (res.data.info.length > 0){
              //audio.play();
            }
          }
        }
      }
    });

    FactoryMain.detenidos().then(function (res) {
      if(res.status==200){
        if (angular.isObject(res.data)){
          if(res.data.msg==true){
            if(($scope.listaAlertas.length+$scope.detenciones.length+$scope.sinReportar.length) >= 1000){
              $scope.listaAlertas = [];
              $scope.alertas = 0;
              $scope.detenciones=[];
              $scope.sinReportar=[];
            }

            if($scope.detenciones.length==0){
              $scope.alertas += res.data.info.length;
              $scope.detenciones=res.data.info.concat($scope.detenciones);
              if($scope.detenciones.length>0){
                //audio.play();
              }
            }else if($scope.detenciones.length>0){
              if(_.isEqual(res.data.info,$scope.detenciones)){} else{
                tmp=res.data.cantidad-$scope.detenciones.length;
                if(tmp!=0){
                  if(tmp<0){
                    $scope.detenciones=res.data.info;
                  }else{
                    $scope.alertas+=Math.abs(tmp);
                    $scope.detenciones=res.data.info;
                    //audio.play();
                  }
                }else{
                  $scope.detenciones=res.data.info;
                }

              }
            }
          }

        }
      }

    });


    FactoryMain.sinReportarf().then(function (res) {
      if(res.status==200){
        if (angular.isObject(res.data)){
          if(res.data.msg==true){
            if(($scope.listaAlertas.length+$scope.detenciones.length+$scope.sinReportar.length) >= 1000){
              $scope.listaAlertas = [];
              $scope.sinReportar= [];
              $scope.alertas = 0;
              $scope.detenciones=[];
            }

            if($scope.sinReportar.length==0){
              $scope.alertas += res.data.info.length;
              $scope.sinReportar=res.data.info.concat($scope.sinReportar);
              if($scope.sinReportar.length>0){
                //audio.play();
              }
            }else if($scope.sinReportar.length>0){
              if(_.isEqual(res.data.info,$scope.sinReportar)){} else{
                tmp=res.data.length-$scope.sinReportar.length;
                if(tmp!=0){
                  if(tmp<0){
                    $scope.sinReportar=res.data.info;
                  }else{
                    $scope.alertas+=Math.abs(tmp);
                    $scope.sinReportar=res.data.info;
                    //audio.play();
                  }
                }else{
                  $scope.sinReportar=res.data.info;
                }

              }
            }
          }
        }
      }

    });
  };

  $scope.clearInterval= function () {
    $interval.cancel(intervalo);
  }

  $scope.alertasf = function(){
    return $scope.listaAlertas;
  };

  $scope.detenidosf= function () {
    return $scope.detenciones;
  };

  $scope.sinReportarf= function () {
    return $scope.sinReportar;
  }

  $scope.alertasT=function () {
    return $scope.alertas;
  }

  $scope.init = function(){
    clearInterval(intervalo);
    $scope.pedirAlertas();
   intervalo=setInterval(function () {
     $scope.pedirAlertas();

//web notifications
     if($scope.alertas){
       audio.play()
       webNotification.showNotification('Nuevas Alertas', {
         body: 'Alertas sin leer: '+$scope.alertas,
         icon: 'assets/img/Logo.png',
         color: 'red',
         onClick: function onNotificationClicked() {
           console.log('Notification clicked.');
         },
         autoClose: 5000
       }, function onShow (error, hide) {
         if(error){
           console.log("Unable to show notification: %s" % error);
         }else{
           setTimeout(function hideNotification() {
             hide();
           }, 20000);
         }
       });
     }
   },60000);
  }


  $scope.utcTimeToLocalTime = function(dateTime)
  {

    var localTime  = moment.utc(dateTime).toDate();
    return  moment(localTime).format('YYYY-MM-DD HH:mm:ss');

  }

  $scope.fromNow1 = function(FechaHora)
  {
    tmpTime = $scope.utcTimeToLocalTime(FechaHora);
    var now1 = moment(tmpTime).fromNow(true)
    return now1;

  };

});
