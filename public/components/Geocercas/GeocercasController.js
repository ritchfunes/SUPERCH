/**
 * Created by Roberto on 24/07/2015.
 */

//SabuesoAPP.controller("ControllerReferencia",function($scope,$http,FactoryReferencias,ServicioReferencias,ServicioMapa)
SabuesoAPP.controller("ControllerGeocercas",function($scope,$rootScope,$http,ServicioMapa,FactoryGeocercas)
{




    var header = {
        headers:{
            authorization:token
        }
    };
    $scope.id = "";
    $scope.nombre ="";
    $scope.descripcion = "";
    $scope.color = "#000000";
    $scope.puntos = "";
    $scope.estado = "VISIBLE";


    $scope.guardar = function()
    {
        console.log($scope.nombre +" : " + $scope.descripcion +" : " + $scope.puntos + " : " + $scope.color + " : " + $scope.estado + " : ");
        ///return;
        data = {
            nombre:$scope.nombre,
            descripcion:$scope.descripcion,
            color:$scope.color,
            puntos:$scope.puntos,
            estado:$scope.estado
        };
        //console.log(data)
        $http.post("geocercas",data,header)
            .success(function(data){
                if (data.msg == true)
                {
                    $scope.nombre ="";
                    $scope.descripcion = "";
                    $scope.color = "#000000";
                    $scope.puntos = "";



                    //ServicioMapa.vista ="components/Main/vistaOpciones.html";

                    $("#modal-CrearGeocerca").modal("hide");
                    $("#modal-contenedor").modal("hide");
                    $.bootstrapGrowl("Geocerca guardada!", {type: 'success'});
                }
                else{
                    $.bootstrapGrowl("Error! no se pudo guardar", {type: 'danger'});
                }
            })
            .error(function(err){
                alert(err);
            });

    };


    $scope.actualizar = function()
    {
        console.log($scope.id +" : " + $scope.nombre +" : " + $scope.descripcion +" : " + $scope.puntos + " : " + $scope.color + " : " + $scope.estado + " : ");
        data = {
            id:$scope.id,
            nombre:$scope.nombre,
            descripcion:$scope.descripcion,
            color:$scope.color,
            puntos:$scope.puntos,
            estado:$scope.estado
        };

        $http.put("geocercas",data,header)
            .success(function(data)
            {
                if (data.msg == true)
                {

                    $scope.nombre ="";
                    $scope.descripcion = "";
                    $scope.color = "#000000";
                    $scope.puntos = "";



                    //ServicioMapa.vista ="components/Main/vistaOpciones.html";
                    $("#modal-ActualizarGeocerca").modal("hide");
                    $("#modal-contenedor").modal("hide");
                    $.bootstrapGrowl("Geocerca Actualizada!", {type: 'success'});

                }
                else{
                    $.bootstrapGrowl("Error! No se Pudo Guardar", {type: 'danger'});
                }
            })
            .error(function(err){
                alert(err);
            });

    }

    $scope.listaGeocercas = [];
    $scope.mostrarGeocercas = function(){

      //$scope.listaGeocercas = [];

      FactoryGeocercas.todas().then(function(d) {
          var Geocercas = d.data.info;
          angular.forEach(Geocercas, function(value, key) {
              var val = JSON.parse(value.pos);
              var geo = {
                  Id:value.id,
                  Nombre:val.properties.Nombre,
                  Descripcion:val.properties.Descripcion,
                  Marcado:value.marcado,
                  Puntos:val.geometry.coordinates[0]
              }
              $scope.listaGeocercas.push(geo);

          });

        });


    }


    $scope.localizar = function(geocerca){

        var puntos = geocerca.Puntos ;
        var minLon = puntos[0][0];
        var maxLon = puntos[0][0];
        var minLat = puntos[0][1];
        var maxLat = puntos[0][1];

        for(idx in puntos){
            minLon = puntos[idx][0] < minLon?puntos[idx][0]:minLon;
            maxLon = puntos[idx][0] > maxLon?puntos[idx][0]:maxLon;

            minLat = puntos[idx][1] < minLat?puntos[idx][1]:minLat;
            maxLat = puntos[idx][1] > maxLat?puntos[idx][1]:maxLat;
        }
        var lon = (minLon + maxLon) / 2 //lon / puntos.length;
        var lat = (minLat + maxLat) / 2 //lat / puntos.length;

        $rootScope.$broadcast('eventName', {lon: lon,lat: lat });

    }


    $scope.eliminarGeocerca = function(elemento,idGeocerca){
      //alert(idGeocerca);
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

                  var index = $scope.listaGeocercas.indexOf(elemento);
                  $scope.listaGeocercas.splice(index,1);

                  $rootScope.$broadcast('CambioEnGeocerca');
              }
              else{
                  $.bootstrapGrowl("Error! No se Pudo Eliminar", {type: 'danger'});
              }
          }
          );

    }



});
