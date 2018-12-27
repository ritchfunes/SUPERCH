/**
 * Created by Roberto on 02/10/2015.
 */
SabuesoAPP.factory('FactoryAlertas',function($http,$q){
    'use strict';
    var main = $q.defer();

  main.listar = (function()
  {

    var request = $http({
      method: "get",
      url: "/unidadesAlertas",
      data: {},
      headers:{authorization: token}
    });

    return( request );
  });


    main.posicion = function(imei,vehiculo)
    {

        var request = $http({
            method: "post",
            url: "comandos/posicion",
            data: {
                imei: imei,
                vehiculo : vehiculo
            },
            timeout:30000

        });

        return( request );
    };

    main.Llavines = function(imei,vehiculo)
    {
        var request = $http({
            method: "post",
            url: "comandos/llavines",
            //params: {
            //    action: "add"
            //},
            data: {
                imei: imei,
                vehiculo:vehiculo
            },

        });

        return( request );
    }

    main.habilitar = function(imei,vehiculo)
    {
        var request = $http({
            method: "post",
            url: "comandos/habilitar",
            data: {
                imei: imei,
                vehiculo: vehiculo
            },

        });
        return( request );
    }

    main.apagar = function(imei,vehiculo)
    {
        var request = $http({
            method: "post",
            url: "comandos/apagar",
            data: {
                imei: imei,
                vehiculo:vehiculo
            },

        });
        return( request );
    }


    main.prueba = function(imei)
    {
        var request = $http({
            method: "get",
            url: "/posiciones?imei="+imei,
            data: {
                imei: imei
            },

        });
        return( request );
    }

    main.tmpToken = function(data)
    {
        var request = $http({
            method: "post",
            url: "/generarVisita",
            data:data
        });
        return request;
    }

    main.accesoSeguimiento = function(data){
        var request = $http({
            method:"post",
            url: "/accesoSeguimiento",
            data:data
        })
        return request;
    }

    main.rastro = function(data){
        var request = $http({
            method: "post",
            url: "/recorridosHora",
            data:data
        });
        return request;
    }

    main.alertas = function(){
        var request = $http({
            method: "get",
            url: "/alertas",
        });
        return request;
    };

    main.detenidos= function () {
        var request=$http({
            method: "get",
            url: "/alertasDetenidos"
        });
        return request;
    };

    main.sinReportarf= function () {
      var request=$http({
        method: "get",
        url: "/alertasSinReportar"
      });
      return request;
    };

  return main;
});


SabuesoAPP.service('APIInterceptor', function($rootScope, tokenService,$cookies) {
    var service = this;

    service.request = function(config) {

        var currentUser = tokenService;
        var access_token = currentUser ? currentUser.token : null;

        /*
        if (typeof $cookies.get('sabuesoToken') === 'undefined')
        {
            //alert('no hay token');
            var access_token = currentUser ? currentUser.token : null;

        }
        else{
            //alert($cookies.get('sabuesoToken'))
            var access_token = $cookies.get('sabuesoToken');

        }
        */






        if (access_token) {
            config.headers.authorization = access_token;
        }
        return config;
    };

    service.responseError = function(response) {
        return response;
    };


});

SabuesoAPP
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('APIInterceptor');
    });
