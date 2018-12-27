/**
 * Created by Roberto on 17/08/2015.
 */
SabuesoAPP.factory('FactoryReferencias', function($http,$q) {

    'use strict';
    var referenciaRequest = $q.defer();

    referenciaRequest.iconosReferencias = function()
    {
        var request = $http({
           method:'get',
           url:'referencias/iconos',
           headers:globalHeader
        });
        return request;
    };


    referenciaRequest.info =  function()
    {
        return $http.get('referencias');  //1. this returns promise
    };


    referenciaRequest.categorias = function()
    {
        var request = $http({
            method: 'GET',
            url: 'categorias',
            headers:globalHeader
        });
        return request;
    };


    referenciaRequest.guardar = function(parametros)
    {
        var request = $http({
           method:'POST',
            url:'referencias',
            data:parametros,
            headers:globalHeader,

        });

        return request;
    };


    referenciaRequest.eliminar = function(idReferencia)
    {
        var request = $http({
            method:'DELETE',
            url:'referencias',
            params:idReferencia,
            headers:globalHeader
        });

        return request;

    };

    referenciaRequest.modificar= function (ref) {
        var request = $http({
            method:'PUT',
            url:'referencias',
            data: ref,
            headers:globalHeader
        });

        return request;
    };

    return referenciaRequest;


});