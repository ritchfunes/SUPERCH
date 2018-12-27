



SabuesoAPP.factory('FactoryCrearTurnos', function($http,$q) {


    'use strict';
    var turnosRequest = $q.defer();


   


    turnosRequest.editar = function(params){
        let request = $http({
            method: 'PUT',
            url: '/turnos',
            data: params
        });

        return request;
    }


    turnosRequest.eliminar = function(idTurno)
    {


        var request = $http({

            method:'delete',
            url:'/turnos',
            data:idTurno,
            headers:{"Content-Type":"application/json;charset=utf-8"}
        });

        return request;
    }

    turnosRequest.guardar = function(parametros)
    {
        var request = $http({
           method:'POST',
            url:'/turnos',
            data:parametros,
           

        });

        return request;
    }
    
    turnosRequest.getturnos = function()
    {

        var request = $http(
            {
                method: 'GET',
                url: '/turnos',
            }) ;
            return request ;
    }
   
    return turnosRequest ; 

});
