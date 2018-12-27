

SabuesoAPP.factory('FactoryCrearproyeccionPlanunidades', function($http,$q) {


    'use strict';
    var proyeccionplaunidadRequest = $q.defer();


    proyeccionplaunidadRequest.Obtenerplanunidades = function()
    {
        var request = $http({
            method: 'GET',
            url: '/estadosunidades'
        });
        return request;
    };


    proyeccionplaunidadRequest.editar = function(params){
        let request = $http({
            method: 'PUT',
            url: '/proyeccionplanunidades',
            data: params
        });

        return request;
    }


    proyeccionplaunidadRequest.eliminar = function(idplanunidades)
    {


        var request = $http({

            method:'delete',
            url:'/proyeccionplanunidades',
            data:idplanunidades,
            headers:{"Content-Type":"application/json;charset=utf-8"}
        });

        return request;
    }


    proyeccionplaunidadRequest.guardar = function(parametros)
    {
        var request = $http({
           method:'POST',
            url:'/proyeccionplanunidades',
            data:parametros,
           

        });

        return request;
    }
    
    proyeccionplaunidadRequest.getplanunidades = function()
    {

        var request = $http(
            {
                method: 'GET',
                url: '/proyeccionplanunidades',
            }) ;
            return request ;
    }
   
    return proyeccionplaunidadRequest ; 

});
