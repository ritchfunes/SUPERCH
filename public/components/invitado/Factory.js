/**
 * Created by Roberto on 17/03/2016.
 */
SabuesoInvitadoAPP.factory('FactoryInvitado', function($http,$q) {
    'use strict';
    var unidades = $q.defer();


    unidades.getUnidad = (function()
    {

        var request = $http({
            method: "get",
            url: "/Posicion",
            headers:{authorization: _token}
        });

        return( request );
    });

    unidades.posiciones = function()
    {
        var request = $http({
            method: "get",
            url: "/listaPosicion",
            headers:{authorization: _token}
        });
        return request;

    };

    unidades.geocoding = function(data)
    {
        var request = $http({
            method: "get",
            params: data,
            url: "/geocode",
            headers:{authorization: _token}
        });
        return request;
    };

    return unidades;


});