

SabuesoAPP.factory('FactoryCrearunidadesDisponibles', function($http,$q) 
{


    'use strict';
    var unidadesDisponiblesRequest = $q.defer();

    unidadesDisponiblesRequest.getDisponibilidadunidadessemanal=function (parametros) {
        var request = $http({
          method:'GET',
          url:'/Disponibilidadunidadessemanal',
          params:parametros,
    
    
        });
    
        return request;
      }

    unidadesDisponiblesRequest.insertarDisponibilidadunidadessemanal = function()
    {
        var request = $http({
           method:'POST',
            url:'/Disponibilidadunidadessemanal'
            
           

        });

        return request;
    }


    unidadesDisponiblesRequest.Obtenerestadosunidades = function()
    {
        var request = $http({
            method: 'GET',
            url: '/estadosunidades'
        });
        return request;
    };

    unidadesDisponiblesRequest.Obtenereunidades = function()
    {
        var request = $http({
            method: 'GET',
            url: '/unidades'
        });
        return request;
    };


    unidadesDisponiblesRequest.editar = function(params){
        let request = $http({
            method: 'PUT',
            url: '/unidadesdisponibles',
            data: params
        });

        return request;
    }


    unidadesDisponiblesRequest.eliminar = function(idunidadesDisponibles)
    {


        var request = $http({

            method:'delete',
            url:'/unidadesdisponibles',
            data:idunidadesDisponibles,
            headers:{"Content-Type":"application/json;charset=utf-8"}
        });

        return request;
    }


    unidadesDisponiblesRequest.guardar = function(parametros)
    {
        var request = $http({
           method:'POST',
            url:'/unidadesdisponibles',
            data:parametros,
           

        });

        return request;
    }
    
    unidadesDisponiblesRequest.getunidadesdisponiblesonline = function()
    {

        var request = $http(
            {
                method: 'GET',
                url: '/unidadesdisponiblesonline',
            }) ;
            return request ;
    }
   

    unidadesDisponiblesRequest.getunidadesdisponible = function()
    {

        var request = $http(
            {
                method: 'GET',
                url: '/unidadesdisponibles',
            }) ;
            return request ;
    }
    return unidadesDisponiblesRequest ; 

});
