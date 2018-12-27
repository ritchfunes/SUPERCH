SabuesoAPP.factory('FactoryCrearEstadosUnidades', function($http,$q) {


    'use strict';
    var estadosunidadesRequest = $q.defer();



    estadosunidadesRequest.editar = function(params){
        let request = $http({
            method: 'PUT',
            url: '/estadosunidades',
            data: params
        });

        return request;
    }


    estadosunidadesRequest.eliminar = function(idEstadosunidad)
    {


        var request = $http({

            method:'delete',
            url:'/estadosunidades',
            data:idEstadosunidad,
            headers:{"Content-Type":"application/json;charset=utf-8"}
        });

        return request;
    }


    estadosunidadesRequest.guardar = function(parametros)
    {
        var request = $http({
           method:'POST',
            url:'/estadosunidades',
            data:parametros,
           

        });

        return request;
    }

    

    estadosunidadesRequest.getestadosunidades = function()
    {

        var request = $http(
            {
                method: 'GET',
                url: '/estadosunidades',
            }) ;
            return request ;
    }
   

    
    return estadosunidadesRequest ; 

});
