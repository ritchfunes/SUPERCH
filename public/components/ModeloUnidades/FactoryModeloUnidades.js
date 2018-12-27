SabuesoAPP.factory('FactoryCrearModelounidaes', function($http,$q) {


    'use strict';
    var ModelounidadesRequest = $q.defer();



    ModelounidadesRequest.editar = function(params){
        let request = $http({
            method: 'PUT',
            url: '/modeloUnidad',
            data: params
        });

        return request;
    }


    ModelounidadesRequest.eliminar = function(idModelounidades)
    {


        var request = $http({

            method:'delete',
            url:'/modeloUnidad',
            data:idModelounidades,
            headers:{"Content-Type":"application/json;charset=utf-8"}
        });

        return request;
    }


    ModelounidadesRequest.guardar = function(parametros)
    {
        var request = $http({
           method:'POST',
            url:'/modeloUnidad',
            data:parametros,
           

        });

        return request;
    }

    

    ModelounidadesRequest.get = function()
    {

        var request = $http(
            {
                method: 'GET',
                url: '/modeloUnidad',
            }) ;
            return request ;
    }
   

    
    return ModelounidadesRequest ; 

});
