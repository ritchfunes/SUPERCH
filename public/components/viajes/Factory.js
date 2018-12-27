/**
 * Created by Roberto on 19/11/2015.
 */
SabuesoAPP.factory('FactoryViaje',function($http,$q) {
    'use strict';
    var viaje = $q.defer();

    viaje.listaViajes = function(){
        var request = $http({
            method: "get",
            url: '/viajes',
        });

        return (request);
    };

    viaje.viajesFinalizados = function(){
        var request = $http({
            method: "get",
            url: '/viajes/finalizado',
        });

        return (request);
    };

    viaje.viajesDetenciones = function(data){
        var request = $http({
            method: "get",
            url: '/viajes/detenidos',
            params:data
        });

        return (request);
    };

    viaje.viajesVelocidades = function(data){
        var request = $http({
            method: "get",
            url: '/viajes/velocidades',
            params:data
        });

        return (request);
    };


    viaje.viajesEventos = function(data){
        var request = $http({
            method: "get",
            url: '/viajes/eventos',
            params:data
        });

        return (request);
    };

    viaje.viajesExcesos = function(data){
        var request = $http({
            method: "get",
            url: '/viajes/excesos',
            params:data
        });

        return (request);
    };

    viaje.cancelarViaje = function(data){
        var request = $http({
            method: "PUT",
            url: '/viajes/cancelar',
            headers :'Content-Type:application/json',
            data:data
        });

        return (request);
    };

    viaje.uniSinTransf  = function(){
        var request = $http({
            method: "GET",
            url: '/viajes/uniSinTransf',
            //headers :'Content-Type:application/json',
            //data:data
        });

        return (request);
    };


    viaje.tiemposViaje  = function(data){
        var request = $http({
            method: "GET",
            url: '/viajes/tiempos',
            params:data
        });

        return (request);
    };

    viaje.geocoder = function (data) {
        var request = $http({
            method: "GET",
            url: "/geocoder",
            params: data
        });

        return request;
    };


    return viaje;

});