/**
 * Created by GMG on 09/07/2015.
 */

var overlay;
intervaloUnidades = function(){};


angular.module("Sabueso").controller("HttpRequest",function($scope,$rootScope,leafletData,$http,$interval,ServicioReferencias,
                                             FactoryReferencias,ServicioMapa,ServicioUnidades,FactoryUnidades,
                                             ServicioGeocerca,FactoryGeocercas,FactoryMain,$uibModal,$log,ServiceCategoria,
                                             FactoryCrearCategoria,$filter,$timeout){
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

        $rootScope.$on('CambioEnGeocerca',function(event, args){
          //alert("Cambio Geocerca");
          ServicioGeocerca.ListaGeocercas=[];
          $scope.cargarGeocercas()
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

        leafletData.getMap().then(function(map) {



                leafletData.getLayers().then(function(baselayers) {
                    var drawnItems = baselayers.overlays.draw;
                    map.on('draw:created', function (e) {
                        var layer = e.layer;


                        //console.log();

                        var tmpJsonString = JSON.stringify(layer.toGeoJSON());
                        var tmpGeoJson = JSON.parse(tmpJsonString);
                        tmpGeoJson.properties.ColorGeocerca=(255,255,0,0.5)
                        tmpGeoJson.properties.Nombre='Nueva Geocerca'
                        var tmpGeometry = tmpGeoJson.geometry;
                        $scope.drawPolygon(tmpGeoJson);

                        if (tmpGeoJson.geometry)
                        {
                            if (tmpGeometry.type == "Point")
                            {

                                ServicioReferencias.latitud = tmpGeometry.coordinates[1]
                                ServicioReferencias.longitud = tmpGeometry.coordinates[0]
                                //ServicioMapa.vista = "components/Referencias/VistaCrear.html";
                                //abrirModal('modal-contenedor',"Crear Referencia",2,2);
                                var modalInstance = $uibModal.open({
                                    animation:true,
                                    templateUrl:'components/Referencias/VistaCrear.html',
                                    controller:'ControllerReferencia',
                                    size:'md',
                                    resolve:{
                                        items:function(){
                                            return [];
                                        }
                                    }
                                });
                                console.log(tmpGeometry.type);


                            }
                            else if(tmpGeometry.type == "Polygon")
                            {
                                var concatPoints = []; //"("+ tmpGeometry.coordinates.join(" ") +")"
                                var strConcatPoints = ""; //"("+ tmpGeometry.coordinates.join(" ") +")"

                                angular.forEach(tmpGeometry.coordinates[0],function(value,key)
                                {
                                    concatPoints.push(value[0] +" "+value[1]);
                                });

                                strConcatPoints = "("+ concatPoints.join() +")";


                                $("#puntos").val(strConcatPoints);
                                $("#puntos").trigger('input');
                                $scope.saveGeocerca();
                                console.log(tmpGeometry);

                            }
                        }
                    });



                    map.on('draw:edited', function (e) {
                      var layer = e.layers;
                      var tmpJsonString = JSON.stringify(layer.toGeoJSON());
                      var tmpGeoJson = JSON.parse(tmpJsonString);
                      var tmpGeometry = tmpGeoJson.features[0].geometry;
                      var Info =  tmpGeoJson.features[0];
                      if (tmpGeometry)
                      {
                        if (tmpGeometry.type == "Point")
                        {

                          ServicioReferencias.latitud = tmpGeometry.coordinates[1]
                          ServicioReferencias.longitud = tmpGeometry.coordinates[0]
                          var modalInstance = $uibModal.open({
                            animation:true,
                            templateUrl:'components/Referencias/VistaCrear.html',
                            controller:'ControllerReferencia',
                            size:'md',
                            resolve:{
                              items:function(){
                                return [];
                              }
                            }
                          });
                          console.log(tmpGeometry.type);


                        }
                        else if(tmpGeometry.type == "Polygon")
                        {
                          var concatPoints = []; //"("+ tmpGeometry.coordinates.join(" ") +")"
                          var strConcatPoints = ""; //"("+ tmpGeometry.coordinates.join(" ") +")"

                          angular.forEach(tmpGeometry.coordinates[0],function(value,key)
                          {
                            concatPoints.push(value[0] +" "+value[1]);
                          });

                          strConcatPoints = "("+ concatPoints.join() +")";


                          $("#nombreupdt").val(Info.properties.Nombre);
                          $("#idudpt").val(Info.properties.id);
                          $("#colorupdt").val(Info.properties.ColorGeocerca);
                          $("#descripcionupdt").val(Info.properties.Descripcion);
                          $("#estadoupdt").val(Info.properties.estado==1?"VISIBLE":"NO VISIBLE");


                          $("#nombreupdt").trigger('input');
                          $("#idudpt").trigger('input');
                          $("#colorupdt").trigger('input');
                          $("#descripcionupdt").trigger('input');
                          $("#estadoupdt").trigger('input');



                          $("#puntos").val(strConcatPoints);
                          $("#puntos").trigger('input');
                          $scope.ActualizarGeocerca();
                          console.log(tmpGeometry);

                        }
                      }


                    });



                    map.on('draw:deleted', function (e) {
                      var layer = e.layers;
                      var tmpJsonString = JSON.stringify(layer.toGeoJSON());
                      var tmpGeoJson = JSON.parse(tmpJsonString);
                      var tmpGeometry = tmpGeoJson.features[0].geometry;
                      var Info =  tmpGeoJson.features[0];
                      $scope.drawnItems.removeLayer(e);
                      $scope.eliminarGeocerca(Info.properties.id);
                      console.log(tmpGeometry);

                    });

                    map.on({
                        overlayadd: function(e) {
                            if(markersTmp.length>0){
                                for(i=0; i<markersTmp.length;i++){
                                    if(markersTmp[i].categoria== e.name){
                                        idx=$scope.markers.indexOf(markersTmp[i]);
                                        idx2=ServicioReferencias.ListaReferenciasCompuesto.indexOf(markersTmp[i]);
                                        if(idx>-1 && idx2>-1){
                                            console.log("quitando referencia temporal");
                                            $scope.markers.splice(idx, 1);
                                            ServicioReferencias.ListaReferenciasCompuesto.splice(idx2, 1);
                                            markersTmp.slice(i, 1);
                                        }
                                    }
                                }
                            }
                            $scope.layers.overlays[e.name].visible=true;
                        },
                        overlayremove: function(e) {
                            if(markersTmp.length>0 && $scope.layers.overlays[e.name].name== e.name){
                                for(i=0; i<markersTmp.length;i++){
                                    if(markersTmp[i].categoria== e.name){
                                        idx=$scope.markers.indexOf(markersTmp[i]);
                                        idx2=ServicioReferencias.ListaReferenciasCompuesto.indexOf(markersTmp[i]);
                                        if(idx>-1 && idx2>-1){
                                            console.log("quitando referencia temporal");
                                            $scope.markers.splice(idx, 1);
                                            ServicioReferencias.ListaReferenciasCompuesto.splice(idx2, 1);
                                            markersTmp.slice(i, 1);
                                        }
                                    }
                                }
                            }
                            $scope.layers.overlays[e.name].visible=false;
                        }
                    });

                    map.on("popupopen",function (marker) {
                        $(".marker-delete-button:visible").click(function () {
                            i=marker.popup._source.options.idx;
                            idx=$scope.markers.indexOf(markersTmp[i]);
                            idx2=ServicioReferencias.ListaReferenciasCompuesto.indexOf(markersTmp[i]);
                            if(idx>-1 && idx2>-1){
                                console.log("quitando referencia temporal");
                                $scope.markers.splice(idx, 1);
                                ServicioReferencias.ListaReferenciasCompuesto.splice(idx2, 1);
                                markersTmp.slice(i, 1);
                            }
                        });
                    });

                });
            });

        function listarCategorias() {

            if (ServiceCategoria.listaCategorias.length > 0)
                return false;


            FactoryCrearCategoria.Obtenercategorias().then(function(d){
                var tmp = ServiceCategoria.listaCategorias = d.data.info;
                for(var x in tmp)
                {
                    var item = {id: tmp[x].id , label: tmp[x].Categoria};
                    $scope.categoriasListas.push(item);

                    var tmpLayers = {
                        type:'group',
                        name:tmp[x].Categoria,
                        visible:true
                    }

                    $scope.layers.overlays[tmp[x].Categoria] = tmpLayers;


                }

                console.log($scope.layers.overlays);
            });
        }
        listarCategorias();

        $scope.cargarReferencias = function(){

            if( ServicioReferencias.ListaReferenciasCompuesto.length > 0 ) {
                console.log("Las referencias ya fueron cargadas");
                //return;
            }
            FactoryReferencias.info().then(function(d) {

                    ServicioReferencias.ListaReferenciasCompuesto = [];
                    ServicioReferencias.ListaReferencias = d.data.info;

                    var markersReferencia = ServicioReferencias.ListaReferencias;
                    leafletData.getMap().then(function(map) {

                      angular.forEach(markersReferencia, function (value, key) {

                        if(value.Radio && value.CategoriaId==45){
                          var popupContent = "<h4><p>" +
                            value.Nombre + "</p></h4>";
                            popupContent += "<h5><p> Radio:" +value.Radio+"</p></h5>";

                          L.circle([value.Latitud, value.Longitud], value.Radio,{fillColor:'green',color:'green',opacity:0.2,}).addTo(map).bindPopup(popupContent);}
                        tmpPunto = {
                          layer: value.Categoria,
                          lat: value.Latitud,
                          lng: value.Longitud,
                          message: value.Nombre,
                          focus: false,
                          //draggable:true,

                          icon: {
                            iconUrl: value.url,
                            shadowUrl: value.url,
                            iconSize: [25, 25], // size of the icon
                            shadowSize: [25, 25], // size of the shadow
                            //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                            //shadowAnchor: [4, 62],  // the same for the shadow
                            //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor

                          }
                        };

                        //console.log(tmpPunto);

                        if (value.visibleCompuesto == "Si") {
                          ServicioReferencias.ListaReferenciasCompuesto.push(tmpPunto);
                        }


                      });
                    });
                    //$scope.markers = ServicioUnidades.ListaUnidadesCompuesto.concat(ServicioReferencias.ListaReferenciasCompuesto);
                    $scope.markers = ServicioReferencias.ListaReferenciasCompuesto;

            });
        }

        $scope.cargarGeocercas = function(){

            //console.log(">>>" + ServicioGeocerca.ListaGeocercas.length)


            if( ServicioGeocerca.ListaGeocercas.length  > 0 )
            {
                console.log("Las Geocerca ya Fue Creada, nothing to do");
                //return;
            }


            FactoryGeocercas.info().then(function(d) {

                var Geocercas = d.data.info;
                ServicioGeocerca.ListaGeocercas=[];
                var tmpData = [];

                angular.forEach(Geocercas, function(value, key) {
                  var val = JSON.parse(value.pos);
                  val.properties['id'] = value.id;
                  val.properties['estado'] = value.Visible;
                  $scope.drawPolygon(val);
                  ServicioGeocerca.ListaGeocercas.push(val);
                });

                leafletData.getMap().then(function(map)
                {
                  map.addLayer($scope.drawnItems);
                });


                 /*   ServicioGeocerca.geojson[value.id] = {
                        data: val,
                        resetStyleOnMouseout: true,
                        style: {
                            fillColor: val.properties.ColorGeocerca?val.properties.ColorGeocerca:'green',
                            weight: 2,
                            opacity: 1,
                            color: 'white',
                            dashArray: '3',
                            fillOpacity: 0.4
                        }
                    }
                */
            });
        }
        leafletData.getMap().then(function(map) {
          var info = L.control({position: 'bottomright'});

          info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update();
            return this._div;
          };

          info.update = function (props) {
            this._div.innerHTML = '<h4>' + (props ?
              '<b>' + props.Nombre + '</b></h4><br />' + props.Descripcion
                : '');
          };
          info.addTo(map);
          $scope.drawPolygon = function (val) {

            var geojson;

            function highlightFeature(e) {
              var layer = e.target;

              layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
              });

              if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
              }
              info.update(layer.feature.properties);
            }

            function resetHighlight(e) {
              geojson.resetStyle(e.target);
              info.update();
            }

            function onEachFeature(feature, layer) {
              var popupContent = "<p> " +
                feature.properties.Nombre + "</p>";

              if (feature.properties && feature.properties.Descripcion) {
                popupContent += feature.properties.Descripcion;
              }

              //layer.bindPopup(popupContent);
              layer.on({
                click:addEdit,
                dblclick: BringtoBack,
                mouseover: highlightFeature,
                mouseout: resetHighlight,
              });
            }

            geojson = L.geoJson(val, {
              style: function (feature) {


                return {
                  fillColor: feature.properties.ColorGeocerca,
                  weight: 2,
                  opacity: 1,
                  color: 'white',
                  dashArray: '3',
                  fillOpacity: 0.4
                }
              },
              onEachFeature: onEachFeature
            })
            //.addTo(map);
            $scope.drawnItems.addLayer(geojson)
          }
        })

        function BringtoBack(e)
        {
          var layer = e.target;
          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToBack();
          }
          console.log("cambie el zindez");
        }
        function addEdit(e)
        {
          $scope.editableItem.clearLayers();
          var layer = e.target;
          $scope.editableItem.addLayer(layer);

        }


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
                    FactoryUnidades.listar().then(function (d) {


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
                $scope.markers = unidadesSeleccionadas.concat(ServicioReferencias.ListaReferenciasCompuesto);
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

            $scope.markers = unidadesSeleccionadas.concat(ServicioReferencias.ListaReferenciasCompuesto);
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

            $scope.markers = unidadesSeleccionadas.concat(ServicioReferencias.ListaReferenciasCompuesto);
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
            $scope.cargarGeocercas();
            $scope.cargarReferencias();

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

        $scope.geoJSON = function(){
            return ServicioGeocerca.geojson;
        };

        $scope.markers2 = function(){
            return $scope.markers;
        };

        $scope.ListarReferencias = function(){
            /*ServicioMapa.vista = "components/Referencias/vista.html";
             abrirModal('modal-contenedor',"Lista de Referencias",1,3);
             */
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl:'components/Referencias/vista.html',
                controller:'ControllerReferencia',
                size:'lg',
                resolve:{
                    items:function(){
                        return [];
                    }
                }
            });
            modalInstance.result.then(function (referencia) {
                //console.log($scope.layers.overlays[referencia.Categoria]);
                tmp=$scope.layers.overlays[referencia.Categoria].visible;
                if(typeof referencia==='undefined'){}else{
                    if(!tmp){
                        tmpPunto = {
                            //layer: referencia.Categoria,
                            categoria:referencia.Categoria,
                            lat: referencia.Latitud,
                            lng: referencia.Longitud,
                            message:referencia.Nombre,
                            focus: false,
                            icon: {
                                iconUrl: referencia.url,
                                shadowUrl: referencia.url,
                                iconSize:     [25, 25], // size of the icon
                                shadowSize:   [25, 25] // size of the shadow
                            }
                        };
                        ServicioReferencias.ListaReferenciasCompuesto.push(tmpPunto);
                        markersTmp.push(tmpPunto);
                        $scope.markers=$scope.markers.concat([tmpPunto]);
                    }
                }
            });
        };

        $scope.Geocercas = function(){
            ServicioMapa.vista = "components/Main/vistaGeocercas.html";
            abrirModal('modal-contenedor',"Geocercas",1,3);
            setTimeout(function(){
                cargarMapa();
            },500);
        };

        $scope.listarGeocercas = function(){
          var modalInstance = $uibModal.open({
            animation:true,
            templateUrl:'components/Geocercas/vistaListarGeocerca.html',
            controller:'ControllerGeocercas',
            size:'md',
            resolve:{
              items:function(){
                return [];
              }
            }
          });
        }

        $scope.Filtros = function(){

            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'components/Filtros/VistaCrear.html',
                controller: 'FiltroController',
                size:'lg',
                resolve: {
                    items: function () {
                        return [];

                    }
                }
            });
        }

        //Funcion Para Listar los Filtros
        $scope.listarFiltros = function(){

            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'components/Filtros/VistaListarFiltros.html',
                controller: 'FiltroController',
                size:'md',
                resolve: {
                    items: function () {
                        return [];

                    }
                }
            });

        }

        $scope.categorias = function(){

            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'components/Categorias/VistaCrearCategoria.html',
                controller: 'CategoriaController',
                size:'md',
                resolve: {
                    items: function () {
                        return [];

                    }
                }
            });

        }

        $scope.listarCategorias = function(){

            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'components/Categorias/VistaListarCategoria.html',
                controller: 'CategoriaController',
                size:'md',
                resolve: {
                    items: function () {
                        return [];

                    }
                }
            });

        }

        //Modal para crear una nueva alerta por medio  de correo
        $scope.Alertas = function(){

            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'components/AlertasCorreo/VistaCrearAlerta.html',
                controller: 'AlertaController',
                size:'lg',
                resolve: {
                    items: function () {
                        return [];

                    }
                }
            });

        }
        /*Listar Alertas*/
        $scope.listarAlertas = function(){

            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'components/AlertasCorreo/VistaListarAlertas.html',
                controller: 'AlertaController',
                size:'md',
                resolve: {
                    items: function () {
                        return [];

                    }
                }
            });

        }

        $scope.crearMotorista = function(){

            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'components/Motorista/vistaCrearMotorista.html',
                controller: 'motoristaController',
                size:'md',
                resolve: {
                    items: function () {
                        return [];

                    }
                }
            });

        }

        $scope.listarMotoristas = function(){
          var modalInstance = $uibModal.open({
            animation:true,
            templateUrl:'components/Motorista/vistaListarMotoristas.html',
            controller:'motoristaController',
            size:'md',
            resolve:{
              items:function(){
                return [];
              }
            }
          });
        }

        //Lugares No Autorizados
        $scope.noAutorizados = function(){

            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'components/lugaresNoAutorizados/crearNoAutorizado.html',
                controller: 'noAutorizadosController',
                size:'md',
                resolve: {
                    items: function () {
                        return [];

                    }
                }
            });

        };

        $scope.verAutorizados= function () {
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'components/lugaresNoAutorizados/verAutorizadas.html',
                controller: 'autorizadosCtrl',
                size:'lg',
                resolve: {
                    items: function () {
                        return [];

                    }
                }
            });
            modalInstance.result.then(function (referencia) {
                console.log($scope.layers.overlays[referencia.Categoria]);
                tmp=$scope.layers.overlays[referencia.Categoria].visible;
                if(typeof referencia==='undefined'){}else{
                    if(!tmp){
                        tmpPunto = {
                            //layer: referencia.Categoria,
                            categoria:referencia.Categoria,
                            lat: referencia.Latitud,
                            lng: referencia.Longitud,
                            message:referencia.Nombre,
                            focus: false,
                            icon: {
                                iconUrl: referencia.url,
                                shadowUrl: referencia.url,
                                iconSize:     [25, 25], // size of the icon
                                shadowSize:   [25, 25] // size of the shadow
                            }
                        };
                        ServicioReferencias.ListaReferenciasCompuesto.push(tmpPunto);
                        markersTmp.push(tmpPunto);
                        $scope.markers=$scope.markers.concat([tmpPunto]);
                    }
                }
            });
        };

        //Enlazar Rastras a Unidades
        $scope.enlazarRastra = function(){

            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'components/Enlaces/vistaEnlazarRastras.html',
                controller: 'enlacesController',
                size:'md',
                resolve: {
                    items: function () {
                        return [];

                    }
                }
            });

        };

        //Desenlazar Rastra
        $scope.desenlazarRastra = function(){

            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'components/Enlaces/vistaDesenlazarRastras.html',
                controller: 'enlacesController',
                size:'md',
                resolve: {
                    items: function () {
                        return [];

                    }
                }
            });

        };


        $scope.RastrasEnlazada = function(){

            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'components/Enlaces/ShowRastrasEnlazadas.html',
                controller: 'enlacesController',
                size:'md',
                resolve: {
                    items: function () {
                        return [];

                    }
                }
            });

        };

        //Crear Rastras
        $scope.crearRastras= function () {
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'components/Enlaces/vistaCrearRastras.html',
                controller: 'enlacesController',
                size:'md',
                resolve: {
                    items: function () {
                        return [];

                    }
                }
            });
        };

        //editarRastras
        $scope.editarRastras= function () {
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'components/Enlaces/vistaListarRastras.html',
                controller: 'enlacesController',
                size:'md',
                resolve: {
                    items: function () {
                        return [];

                    }
                }
            });
        };

    //Crear Transferencias
    $scope.crearTransferencias= function () {
        var modalInstance = $uibModal.open({
            animation:true,
            templateUrl: 'components/Transferencias/crearTransferencias.html',
            controller: 'TransferenciasController',
            size:'lg',
            resolve: {
                items: function () {
                    return [];

                }
            }
        });
    };

    //Listar Transferencias
    $scope.listarTransferencias= function () {
        var modalInstance = $uibModal.open({
            animation:true,
            templateUrl: 'components/Transferencias/verTransferencias.html',
            controller: 'TransferenciasController',
            size:'lg',
            resolve: {
                items: function () {
                    return [];

                }
            }
        });
    };

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
                        tmpPunto={
                            lat: _res.lat,
                            lng: _res.lon,
                            message: "Vehiculo: "+_res.unidad+" <br>Fecha: "+_res.fechahora+" <br>Vel: "+_res.velocidad+" km/h." +
                            "<br><a href='' class='marker-delete-button'>Eliminar Referencia</a>",
                            focus: false
                        };
                        markersTmp.push(tmpPunto);
                        idx=markersTmp.indexOf(tmpPunto);
                        tmpPunto.idx=idx;
                        markersTmp[idx]=tmpPunto;
                        ServicioReferencias.ListaReferenciasCompuesto.push(tmpPunto);
                        $scope.markers=$scope.markers.concat([tmpPunto]);
                    }


                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });


        }

        $scope.saveGeocerca = function(){
            abrirModal('modal-CrearGeocerca',"Guardar Geocerca",2,1);
        };

        $scope.ActualizarGeocerca = function(){
            abrirModal('modal-ActualizarGeocerca',"Actualizar Geocerca...",2,1);
        };

        $scope.eliminarGeocerca = function(idGeocerca) {
            var r = confirm("Esta Seguro?");
            if (r == false)
                return;

            var header = {
                headers:{
                    authorization:token
                }
            };
            var req = {
                method: 'DELETE',
                url: 'geocercas',
               headers:header.headers,
                params: { id: idGeocerca }
            };

            $http(req).then(
                function(d){
                    console.log(d);
                    if (d.data.msg == true)
                    {

                        //ServicioMapa.vista ="components/Main/vistaOpciones.html";

                        $("#modal-contenedor").modal("hide");
                        $.bootstrapGrowl("Geocerca Eliminada!", {type: 'success'});
                    }
                    else{
                        $.bootstrapGrowl("Error! No se Pudo Eliminar", {type: 'danger'});
                    }
                }
                );

        }

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

       //Arreglo para guardar las categoras y pasarselas al select multiple check
       $scope.categoriasListas = [];

});
SabuesoAPP.controller("mainCtrl",function($scope,$uibModal,$http,$window,$location,$interval,FactoryMain,$log,webNotification){
    //var audio = new Audio('assets/sounds/capisci.mp3');
    var audio = new Audio('assets/sounds/Notification1.mp3');
    //audio.volume = 0.7;

    $("#contenedor123").next('div').empty();
    $scope.vistaPrincipal = "pizarron.html";
    //$scope.vistaPrincipal = "components/viajes/viajes.html";
    $scope.empresa = globalHeader.empresa;
    $scope.usuario = globalHeader.usuario;

    $scope.currentPassword;
    $scope.newPassword;
    $scope.confirmPassword;


  $scope.reportes = function() {
    $window.open('http://chnreportes.stgands.com/?v='+globalHeader.authorization, 'C-Sharpcorner');
  }

  $scope.viajes = function(){
      $window.open("/viajes?t="+globalHeader.authorization, 'C-Sharpcorner');
  }

  $scope.monitoreo = function(){
    $window.open('/monitoreo/?v='+globalHeader.authorization, 'C-Sharpcorner');
  }

    $scope.setVistaPrincipal = function(url)
    {
        if (url != $scope.vistaPrincipal )
        {
            $scope.vistaPrincipal = url;
        }
    };

    $scope.test = function(){
      alert("Test")
    }

    $scope.getVistaPrincipal = function()
    {
        return $scope.vistaPrincipal ;
    }

    $scope.cambiarPasswordModal = function(){
      var modalInstance = $uibModal.open({
        animation:true,
        templateUrl:'components/Main/vistaCambiarPassword.html',
        controller:'mainCtrl',
        size:'sm',
        resolve:{
          items:function(){
            return [];
          }
        }
      });
    }

    $scope.cambiarPassword = function(){

      //parametros
      var data = {
        pass:$scope.newPassword,
        opass:$scope.currentPassword
      }

      if ($scope.newPassword == $scope.confirmPassword) {

        $http({
	 			method: 'POST',
				data:data,
	  		url: '/resetPass'

    		}).then(function(response) {
            var res = response.data
      			console.log(res);
            if (response.data.msg == false) {
              $.bootstrapGrowl("Contraseñas actual incorrecta", {type: 'danger',delay: 10000});
            }else{
              $.bootstrapGrowl("Contraseñas se cambio exitosamente", {type: 'success',delay: 10000});

              $scope.currentPassword = "";
              $scope.newPassword = "";
              $scope.confirmPassword = "";


            }

        }, function(error) {
            console.log(error);
    		});

		  };
    }

    $scope.alertas = 0;
    var listaAlertas = [];
    var detenciones = [];
    var detenciones30 = [];
    var sinReportar=[];

    var intervalo=$interval(function(){
        FactoryMain.alertas().then(function(res){
            if(res.status==200){
                if (angular.isObject(res.data)){
                    if(res.data.msg==true){
                        if(listaAlertas.length+detenciones.length+sinReportar.length >= 1000){
                            listaAlertas = [];
                            $scope.alertas = 0;
                            detenciones=[];
                        }
                        $scope.alertas += res.data.info.length;
                        listaAlertas = res.data.info.concat(listaAlertas);
                        if (res.data.info.length > 0){
                            audio.play();
                        }
                    }
                }
            }
        });

        FactoryMain.detenidos().then(function (res) {
            //console.log("antes");
            //console.log(detenciones);
            if(res.status==200){
                if (angular.isObject(res.data)){
                    if(res.data.msg==true){
                        if((listaAlertas.length+detenciones.length+sinReportar.length) >= 1000){
                            listaAlertas = [];
                            $scope.alertas = 0;
                            detenciones=[];
                        }

                        if(detenciones.length==0){
                            $scope.alertas += res.data.info.length;
                            detenciones=res.data.info.concat(detenciones);
                            if(detenciones.length>0){
                                audio.play();
                            }
                        }else if(detenciones.length>0){
                            if(_.isEqual(res.data.info,detenciones)){} else{
                                tmp=res.data.cantidad-detenciones.length;
                                if(tmp!=0){
                                    if(tmp<0){
                                        detenciones=res.data.info;
                                    }else{
                                        $scope.alertas+=Math.abs(tmp);
                                        detenciones=res.data.info;
                                        audio.play();
                                    }
                                }else{
                                    detenciones=res.data.info;
                                }
                                //console.log("despues");
                                //console.log(detenciones);
                            }
                        }
                    }

                    //web notifications
                    if($scope.alertas>0){
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
                }
            }

        });

        FactoryMain.detenidos30().then(function(res){
            if(res.status == 200){
                if(angular.isObject(res.data)){
                    if(res.data.msg == true){
                        if((listaAlertas.length + detenciones30.length) >= 1000){
                            listaAlertas = [];
                            $scope.alertas = 0;
                            detenciones30 = [];
                        }

                        if(detenciones30.length == 0){
                            $scope.alertas += res.data.info.length;
                            detenciones30 = res.data.info;
                            if(detenciones30.length > 0){
                                audio.play();
                            }
                        }else if(detenciones30.length>0){
                            if(_.isEqual(res.data.info,detenciones30)){} else{
                                tmp = res.data.cantidad - detenciones30.length;
                                if(tmp != 0){
                                    if(tmp < 0){
                                        detenciones30 = res.data.info;
                                    }else{
                                        $scope.alertas += Math.abs(tmp);
                                        detenciones30 = res.data.info;
                                        audio.play();
                                    }
                                }else{
                                    detenciones30 = res.data.info;
                                }
                            }
                        }
                    }
                }

                //web notifications
                notificacionWeb();
            }
        });

      FactoryMain.sinReportarf().then(function (res) {
        if(res.status==200){
          if (angular.isObject(res.data)){
            if(res.data.msg==true){
              if((listaAlertas.length+detenciones.length+sinReportar.length) >= 1000){
                listaAlertas = [];
                sinReportar= [];
                $scope.alertas = 0;
                detenciones=[];
              }

              if(sinReportar.length==0){
                $scope.alertas += res.data.info.length;
                sinReportar=res.data.info.concat(sinReportar);
                if(sinReportar.length>0){
                  audio.play();
                }
              }else if(sinReportar.length>0){
                if(_.isEqual(res.data.info,sinReportar)){} else{
                  tmp=res.data.cantidad-sinReportar.length;
                  if(tmp!=0){
                    if(tmp<0){
                      sinReportar=res.data.info;
                    }else{
                      $scope.alertas+=Math.abs(tmp);
                      sinReportar=res.data.info;
                      audio.play();
                    }
                  }else{
                    sinReportar=res.data.info;
                  }

                }
              }
            }

            //web notifications
            if($scope.alertas>0){
              webNotification.showNotification('Nuevas Alertas', {
                body: 'Alertas sin leer: '+$scope.alertas,
                icon: 'assets/img/Logo.png',

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
          }
        }

      });
    },60000);

    function notificacionWeb(){
        if($scope.alertas>0){
            webNotification.showNotification('Nuevas Alertas', {
                body: 'Alertas sin leer: '+$scope.alertas,
                icon: 'assets/img/Logo.png',
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
    }

    $scope.showAlerts = function(){
        $scope.alertas = 0;
        var modalInstance = $uibModal.open({
            animation:true,
            templateUrl:'components/Main/vistaAlertas.html',
            controller:'alertasCtrl',
            size:'lg',
            resolve:{
                alertas:function(){
                    return [listaAlertas, detenciones, detenciones30, sinReportar];
                }
            }
        });

        modalInstance.result.then(function (alerta) {
            /*if (alerta == 0){
             listaAlertas = ultimasAlertas;
             }*/
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    }

    $scope.clearInterval= function () {
        $interval.cancel(intervalo);
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

angular.module("Sabueso").controller('alertasCtrl', function ($scope, $uibModalInstance,alertas,$location, $anchorScroll, $uibModal) {

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
      return alertas[3];
    }

    $scope.detenidos30 = function(){
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

    $scope.tiempo = function(fechahora){
        return moment(moment.utc(fechahora)).locale('es-ES').fromNow(true).toString();
    }

    $scope.addComentario = function(detencion){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/Main/modalAgregarComentario.html',
            controller: comentario,
            scope: $scope,
            size: 'sm',
            resolve: {
                detencion: function(){
                    return detencion;
                }
            }
        });

        modalInstance.result.then(function(result){
            console.log(result);
        },
        function(result){
            console.log(result);
        });
    }

    var comentario = function(detencion, FactoryMain, $scope, $uibModalInstance){
        $scope.agregarComentario = function(){
            var data = {
                DetenidoId: detencion.DetenidoId,
                Comentario: $scope.comentario       
            };

            FactoryMain.agregarComentario(data).then(function(result){
                if(result.status === 200){
                    if(result.data.msg === true){
                        $.bootstrapGrowl("Comentario Agregado Exitosamente!", {type: 'success'});
                        var tmp = detencion;
                        tmp.Comentario = $scope.comentario;

                        $uibModalInstance.dismiss(tmp);
                    }else{
                        $.bootstrapGrowl("Error! No se agrego el comentario", {type: 'danger'});
                    }
                }else{
                    $.bootstrapGrowl("Error! No se agrego el comentario", {type: 'danger'});
                }
            });
        }
    }
});
