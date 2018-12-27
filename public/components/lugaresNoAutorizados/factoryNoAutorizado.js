SabuesoAPP.factory('FactoryAutorizados', function($http,$q) {

    'use strict';
    var AutorizadosRequest = $q.defer();

    AutorizadosRequest.guardar = function(parametros)
    {
        var request = $http({
           method:'POST',
            url:'/paradas',
            data:parametros,


        });

        return request;
    };

    AutorizadosRequest.ObtenerRefNoAsignadas = function()
   {
       var request = $http({
           method: 'GET',
           url: '/paradas/true',

       });
       return request;
   };

    AutorizadosRequest.ObtenerRefAutorizadas = function()
    {
        var request = $http({
            method: 'GET',
            url: '/paradas'
        });
        return request;
    };

    AutorizadosRequest.EliminarRefAutorizadas = function(id)
    {
        var request = $http({
            method: 'delete',
            url: '/paradas',
            params:id
        });
        return request;
    };

    AutorizadosRequest.EditarRefAutorizadas = function(ref)
    {
        var request = $http({
            method: 'put',
            url: '/paradas',
            data:ref
        });
        return request;
    };

    return AutorizadosRequest;


});
