SabuesoAPP.factory('FactoryMotorista', function($http,$q) {

    'use strict';
    var motoristaRequest = $q.defer();

    motoristaRequest.guardar = function(parametros)
    {
        var request = $http({
           method:'POST',
            url:'/conductores',
            data:parametros,


        });

        return request;
    }


     motoristaRequest.Obtenerconductores = function()
    {
        var request = $http({
            method: 'GET',
            url: '/conductores',

        });
        return request;
    }

    motoristaRequest.ObtenerconductoresDisponibles = function()
    {
        var request = $http({
            method: 'GET',
            url: '/conductoresDisponibles',

        });
        return request;
    }

    motoristaRequest.eliminar = function(idCategoria)
    {
        var request = $http({

            method:'DELETE',
            url:'/conductores',
            data:idCategoria,
            headers:{"Content-Type":"application/json;charset=utf-8"}
        });

        return request;
    }


    motoristaRequest.sinViaje = function(){
        let request = $http({
            method: 'GET',
            url: '/conductores/viaje'
        });

        return request;
    }

    motoristaRequest.editar = function(params){
        let request = $http({
            method: 'PUT',
            url: '/conductores',
            data: params
        });

        return request;
    }

    return motoristaRequest;


});
