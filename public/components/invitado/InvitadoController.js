/**
 * Created by GMG on 09/07/2015.
 */

var overlay;
intervaloUnidades = function(){};

angular.module("SabuesoInvitado").controller("invitadoCtrl",function($scope,leafletData,FactoryInvitado,$http,$interval){
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
        $scope.markers = [false];
        $scope.markers[0] = {
            lat: 1,
            lng: 1,
            //message:value.Nombre,
            focus: false,
            label: {
                message: "",
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
        var intervalo = 20;
        $scope.contIntervalo = intervalo;

        $scope.ubicacion="";


        angular.extend($scope, {
            center:{
                lat: 15.529,
                lng: -88.027,
                zoom: 10
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

            },
            Paths:{
                p1: {
                    color: 'yellow',
                    weight:4,
                    latlngs:
                        [

                        ],
                    //message: "<h3>Route from London to Rome</h3><p>Distance: 1862km</p>",
                }
            }



        });
        $scope.ActualizarUnidades = function() {

            FactoryInvitado.getUnidad().then(function (d) {
                        $scope.unidad = d.data.info[0];
                        var lista = d.data.info;
                        angular.forEach(lista, function (value, key) {
                            var tmpPunto = [value.Latitud, value.Longitud ];

                            var tmpPunto2 = {
                                lat: value.Latitud,
                                lng: value.Longitud,
                                Imei:value.Imei,
                                label: {
                                    message: value.VehiculoFull + "Vel: "+value.Velocidad+"KM/Ph",
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
                            //$scope.markers[0] = ;
                            $scope.setMarker(tmpPunto2)
                            $scope.Paths.p1.latlngs.push(tmpPunto);
                            setCenter(value.Latitud,value.Longitud )

                            geocode();
                        });


                    });


            };

        function cargarPosiciones()
        {
            FactoryInvitado.posiciones().then(function(res){
               //console.log(res.data.info);
                var posiciones = res.data.info;

                var tmpPosicciones = [];
                for(var row in posiciones){
                    tmpPosicciones.push([posiciones[row].Latitud, posiciones[row].Longitud]);
                }
                $scope.Paths.p1.latlngs = tmpPosicciones;



            });

        }



        $scope.init = function()
        {
            $scope.ubicacion="";
            $scope.ActualizarUnidades();
            //intervaloUnidades = setInterval(function(){
            //    $scope.ActualizarUnidades();
            //},intervalo);
            cargarPosiciones();
        }

        $interval(function(){

            $scope.contIntervalo --;
            if ($scope.contIntervalo == 0)
            {
                $scope.ActualizarUnidades();
                $scope.contIntervalo = intervalo;
            }

        },1000);

        $scope.getMarker = function()
        { return $scope.markers; }

        $scope.setMarker = function(uniMarker)
        { $scope.markers[0] = uniMarker}

        function setCenter(lat,lon){
            $scope.center.lat = lat;
            $scope.center.lng = lon;
        }

        $scope.fromNow1 = function(FechaHora)
        {
            tmpTime = $scope.utcTimeToLocalTime(FechaHora);
            var now1 = moment(String(tmpTime)).fromNow(true)
            return now1;

        };


    $scope.gaugeSettings = {
        ranges: [{ startValue: 0, endValue: 130, style: { fill: '#4cb848', stroke: '#4cb848' }, startDistance: 0, endDistance: 0 },
            { startValue: 130, endValue: 180, style: { fill: '#fad00b', stroke: '#fad00b' }, startDistance: 0, endDistance: 0 },
            { startValue: 180, endValue: 180, style: { fill: '#e53d37', stroke: '#e53d37' }, startDistance: 0, endDistance: 0 }],
            cap: { size: '5%', style: { fill: '#2e79bb', stroke: '#2e79bb' } },
            border: { style: { fill: '#8e9495', stroke: '#7b8384', 'stroke-width': 1 } },
            ticksMinor: { interval: 5, size: '5%' },
            ticksMajor: { interval: 20, size: '10%' },
            labels: { position: 'outside', interval: 20 },
            pointer: { style: { fill: '#2e79bb' }, width: 5 },
            animationDuration: 1500
    };
    // slider's settings.
    $scope.sliderSettings = { min: 0, max: 180, mode: 'fixed', ticksFrequency: 20, width: 150, value: 120, showButtons: false };
    // gauge and slider value.
    $scope.value = 0;

    geocode= function () {
        if(typeof $scope.unidad === 'undefined'){}else{
            data={
                lat: $scope.unidad.Latitud,
                lon: $scope.unidad.Longitud
            };
            FactoryInvitado.geocoding(data).then(function (res) {
                $scope.ubicacion=res.data.obj.properties.nombre;
            });
        }
    }

});
