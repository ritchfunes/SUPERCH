/**
 * Created by Jeffry Romero on 12/09/2016.
 */
SabuesoAPP.factory('FactoryTransferencias', function($http,$q) {

    'use strict';
    var transferenciasRequest = $q.defer();

    transferenciasRequest.guardar = function(parametros)
    {
        var request = $http({
            method:'POST',
            url:'/transferencias',
            data:parametros,
            headers:globalHeader,
        });
        return request;
    };

    transferenciasRequest.listar = function()
    {
        var request = $http({
            method:'GET',
            url:'/transferencias',
            headers:globalHeader,
        });
        return request;
    };

    transferenciasRequest.editar = function(parametros)
    {
        var request = $http({
            method:'PUT',
            url:'/transferencias',
            data:parametros,
            headers:globalHeader,
        });
        return request;
    };

    transferenciasRequest.termino= function (parametros) {
        var request=$http({
            method: 'GET',
            url: '/transferencias/check',
            params: parametros,
            headers: globalHeader
        });

        return request;
    };

    transferenciasRequest.reporteTerminadas = function (){
        var request = $http({
            method: 'GET',
            url: '/transferencias/terminadas',
            headers: globalHeader
        });

        return request;
    }

    return transferenciasRequest;
});

SabuesoAPP.factory('FactoryViajeCompleto', function($http,$q){
    'use strict';
    var viajeRequest = $q.defer();

    viajeRequest.listar= function () {
        var request=$http({
            method: 'GET',
            url: '/viajeCompleto',
            headers: globalHeader
        });

        return request;
    };

    return viajeRequest;
});