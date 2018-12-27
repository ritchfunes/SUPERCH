/**
 * Created by Roberto on 18/11/2015.
 */
SabuesoAPP.controller('RecorridoCtrl',function($scope,$http,leafletData,ServicioUnidades,ServicioMapa
                                                ,ServicioReferencias,ServicioGeocerca,FactoryRecorrido,$timeout,$q){
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
    $scope.indice = 0 ; //indice que lleva la posicion actual cuando se ejecuta el recorrido
    $scope.pausa = 0; //indica si se pauso la ejecucion del recorrido
    $scope.stop = 0; // indica si se detuvo el recorrido
    $scope.ejecutando = 0; //1 = ejecutando ,0 = detenido
    $scope.nombreUnidad = "Test";
    $scope.urlUnidad ="";




    $scope.fechaDesde = "";
    $scope.fechaHasta = ""

    $scope.ListaRecorrido = []; //Recorrido del Vehiculo
    $scope.ListaRecorridoTabla = []; //Recorrido para mostra en la tabla

    $scope.ListaRecorridoCompuesto = [];

    $scope.marker = [false];
    $scope.marker[0] = {
        lat: 1,
        lng: 1,
        //message:value.Nombre,
        focus: false,
        label: {
            message: $scope.nombreUnidad,
            options: {
                noHide: true
            }
        },

        icon: {
            iconUrl: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Marker-Outside-Chartreuse-icon.png',//value.url,
            shadowUrl: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Marker-Outside-Chartreuse-icon.png',//value.url,
            iconSize:     [40, 40], // size of the icon
            shadowSize:   [40, 40], // size of the shadow
            //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            //shadowAnchor: [4, 62],  // the same for the shadow
            //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor

        }
    } //Maker de el vehiculo

    var currentTime = new Date();
    var ano = currentTime.getFullYear()
    var mes = currentTime.getMonth()
    var dia = currentTime.getDate()

    $scope.fechaDesde = {
        value: new Date(ano, mes,dia, 8, 00)
    };

    $scope.fechaHasta = {
        value: new Date(ano, mes,dia, 18, 00)
    };

    $scope.ListaUnidades = function()
    {
        return ServicioUnidades.ListaUnidades;
        //console.log()
    }
    $scope.utcTimeToLocalTime = function(dateTime) {
        var localTime  = moment.utc(dateTime).toDate();
        return  moment(localTime).format('YYYY-MM-DD HH:mm:ss');
    }

    $scope.localTimeToUtc = function(dateTime){
        var now = dateTime
        var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        return moment(new Date(now_utc)).format('YYYY-MM-DD HH:mm:ss');
    }


    $scope.fromNow1 = function(FechaHora){
        tmpTime = $scope.utcTimeToLocalTime(FechaHora);
        var now1 = moment(tmpTime).fromNow(true)
        return now1;
    };

    $scope.cargarRecorrido = function(unidad)
    {
        $scope.ListaRecorridoCompuesto = [];
        $scope.Paths.p1.latlngs = [];
        $scope.decorations.markers.coordinates = [];
        var recorridoDesde = $scope.localTimeToUtc($scope.fechaDesde.value);
        var recorridoHasta = $scope.localTimeToUtc($scope.fechaHasta.value);
        console.log(recorridoDesde);
        console.log(recorridoHasta);

        $scope.nombreUnidad = unidad.Vehiculo;
        $scope.urlUnidad = unidad.url;
        FactoryRecorrido.listaRecorrido(unidad,recorridoDesde,recorridoHasta).then(function(d)
        {

                $scope.ListaRecorrido = d.data.info;
                angular.copy($scope.ListaRecorrido,$scope.ListaRecorridoTabla);


                angular.forEach(d.data.info, function(value, key) {
                    var tmpPunto = [value.Latitud, value.Longitud ];
                    var tmpPunto2 = {
                        lat: value.Latitud?value.Latitud:0,
                        lng: value.Longitud?value.Longitud:0,
                        //message:value.Nombre,
                        focus: false,
                        //draggable:true,
                        label: {
                            message: $scope.nombreUnidad,
                            options: {
                                noHide: true
                            }
                        },
                        icon: {
                            iconUrl: $scope.urlUnidad,//value.url,
                            shadowUrl: $scope.urlUnidad,//value.url,
                            iconSize:     [45, 45], // size of the icon
                            shadowSize:   [45, 45], // size of the shadow
                            //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                            //shadowAnchor: [4, 62],  // the same for the shadow
                            //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor

                        }
                    };
                    $scope.ListaRecorridoCompuesto.push(tmpPunto2);
                    $scope.Paths.p1.latlngs.push(tmpPunto);
                    $scope.decorations.markers.coordinates.push(tmpPunto);
                });

                $scope.stop = 0;
                $scope.indice = 0;
                $scope.pausa = 0;
                $scope.ejecutando = 0;

                var tmpObj =$scope.ListaRecorridoCompuesto[$scope.indice]
                $scope.setMarker(tmpObj);
                $scope.setCenter(tmpObj.lat,tmpObj.lng);

        });

    };

    $scope.getMarker = function()
    { return $scope.marker; }

    $scope.setMarker = function(obj)
    { $scope.marker[0] = obj; }



    $scope.atras = function()
    {
        if ($scope.indice > 0)
        {
            $scope.indice --;
            var tmpObj = $scope.ListaRecorridoCompuesto[$scope.indice];
            $scope.marker[0] = tmpObj;
            $scope.setCenter(tmpObj.lat,tmpObj.lng)

        }
    }
    $scope.siguiente = function()
    {
        if ($scope.indice < ($scope.ListaRecorridoCompuesto.length -1))
        {
            $scope.indice ++;
            var tmpObj = $scope.ListaRecorridoCompuesto[$scope.indice];
            $scope.marker[0] = tmpObj;
            $scope.setCenter(tmpObj.lat,tmpObj.lng)

        }
    }


    $scope.play = function()
    {

        if ($scope.ejecutando == 0)
        {
            $scope.ejecutando = 1;
        }
        else
        { return; }


        // si pausa es 0 pues no hay pausa
        if ($scope.pausa == 0)
        {
            //$scope.indice = 0;
        }
        else
        {
            $scope.pausa =0;
        }

        //si el indice esta en 0 entonces cancelamos el pausa para poder ejecutar el seguimiento del recorrido
        if($scope.indice == 0)
            $scope.stop =0;

        myLoop();

    };

    $scope.pausaFnt = function()
    {
        $scope.pausa = $scope.indice;
        $scope.ejecutando = 0;
    }

    $scope.stopFnt = function()
    {
        $scope.stop = 1;
        $scope.indice = 0;
        $scope.pausa = 0;
        $scope.ejecutando = 0;
        var tmpObj =$scope.ListaRecorridoCompuesto[$scope.indice]
        $scope.setMarker(tmpObj);
        $scope.setCenter(tmpObj.lat,tmpObj.lng);
    }

    function myLoop () {
        console.log($scope.ListaRecorrido[$scope.indice]);
        if ($scope.pausa > 0 )
            return;

        if ($scope.stop == 1)
        {
            $scope.indice = 0;
            $scope.pausa = 0;
            $scope.stop = 0;
            return;
        }

        //por si se carga otro recorrido hay q parar la recursividad
        if ($scope.ejecutando == 0)
        {    return;    }

        setTimeout(function () {

            $timeout($q(function(){
                var tmpObj =$scope.ListaRecorridoCompuesto[$scope.indice]
                $scope.setMarker(tmpObj);
                $scope.setCenter(tmpObj.lat,tmpObj.lng);
            }),10);
            $scope.indice++;

            if ($scope.indice < $scope.ListaRecorridoCompuesto.length-1 )
                myLoop();


        }, 400)
    }

    angular.extend($scope, {
        center:{
            lat: 15.529,
            lng: -88.027,
            zoom: 15
        },
        decorations: {
            markers: {
                coordinates: [[51.9, -0.4], [51.505, -0.09], [51.0, -0.4]],
                patterns:  [
                    {
                        offset: 0,
                        repeat: 0,
                        symbol: L.Symbol.dash({pixelSize: 0, pathOptions: {color: '#f00', weight: 0}})
                    },
                    {
                        offset: '0%',
                        repeat: 120,
                        symbol: L.Symbol.arrowHead({pixelSize: 10, polygon: false, pathOptions: {stroke: true,color: 'black'}})
                    }
                ]
            }
        },
        Paths: {
            p1: {
                color: '#ffe659',
                weight: 6,
                latlngs: [
                ],
                //message: "<h3>Route from London to Rome</h3><p>Distance: 1862km</p>",
            }

        },
        controls: {

            fullscreen: {
                position: 'topleft'
            }
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
            overlays: {
                draw: {
                    name: 'draw',
                    type: 'group',
                    visible: true,
                    layerParams: {
                        showOnSelector: false
                    }
                }
            }
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
        events: { // or just {} //all events
            markers:{
                enable: [ 'dragend' ]
                //logic: 'emit'
            }
        },
        geojson:{}

    });




    $scope.center1 = function()
    {
        return $scope.center;
    }

    $scope.setCenter = function(lat,lng)
    {
        $scope.center.lat = lat;
        $scope.center.lng = lng;
    }


    $scope.localizar = function(lon,lat,idx)
    {
        if ($scope.ejecutando == 1 && $scope.pausa == 0)
        {
            $.bootstrapGrowl("No se Puede localizar el Punto Mientras se Ejectuta el Seguimiento", {type: 'info'});
            return;
        }

        /*$scope.marker[1] = {
            lat: lat,
            lng: lon,
            //message:value.Nombre,
            focus: false,
            //draggable:true,

            icon: {
                iconUrl: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Marker-Outside-Chartreuse-icon.png',//value.url,
                shadowUrl: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Marker-Outside-Chartreuse-icon.png',//value.url,
                iconSize:     [40, 40], // size of the icon
                shadowSize:   [40, 40], // size of the shadow
                //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                //shadowAnchor: [4, 62],  // the same for the shadow
                //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor

            }
        };
        $scope.setCenter(lat,lon);*/
        $scope.indice = idx;
        var tmpObj =$scope.ListaRecorridoCompuesto[$scope.indice]
        $scope.setMarker(tmpObj);
        $scope.setCenter(tmpObj.lat,tmpObj.lng);
    }


    $scope.posicionActual = function()
    {
        return $scope.ListaRecorrido[$scope.indice];
    }

    $scope.listaRecorridoTabla = function()
    {
        return $scope.ListaRecorridoTabla;
    }

})