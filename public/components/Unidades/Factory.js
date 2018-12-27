/**
 * Created by Roberto on 21/08/2015.
 */
SabuesoAPP.factory('FactoryUnidades', function($http,$q) {
    'use strict';
    var unidades = $q.defer();


    unidades.listar = (function()
    {

        var request = $http({
            method: "get",
            url: "/unidades",
            data: {},
            headers:{authorization: token}
        });

        return( request );
    });

    unidades.listarCH = (function()
    {

        var request = $http({
            method: "get",
            url: "/unidades/CH",
            data: {},
            headers:{authorization: token}
        });

        return( request );
    });

    unidades.listaPorEmpresa = function(){
        var request = $http({
            method: "get",
            url: "/unidades/empresas",
            data: {},
            headers:{authorization: token}
        });

        return request;
    };

    return unidades;
});