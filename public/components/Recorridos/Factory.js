/**
 * Created by Roberto on 19/11/2015.
 */
SabuesoAPP.factory('FactoryRecorrido',function($http,$q) {
    'use strict';
    var Recorrido = $q.defer();


    Recorrido.listaRecorrido = function(unidad,desde,hasta)
    {


        var request = $http({
            method: "get",
            url: '/recorridos',
            params: {
                imei:unidad.Imei,
                desde:desde,
                hasta:hasta
            },
            headers: globalHeader
        });

        return (request);
    };

    return Recorrido;

});