SabuesoAPP.factory('FactoryCrearFalla', function($http,$q) {


    'use strict';
    var TipoFallaRequest = $q.defer();



    TipoFallaRequest.editar = function(params){
        let request = $http({
            method: 'PUT',
            url: '/tipofalla',
            data: params
        });

        return request;
    }


    TipoFallaRequest.eliminar = function(idTipoFalla)
    {


        var request = $http({

            method:'delete',
            url:'/tipofalla',
            data:idTipoFalla,
            headers:{"Content-Type":"application/json;charset=utf-8"}
        });

        return request;
    }


    TipoFallaRequest.guardar = function(parametros)
    {
        var request = $http({
           method:'POST',
            url:'/tipofalla',
            data:parametros,
           

        });

        return request;
    }

    

    TipoFallaRequest.gettipofalla = function()
    {

        var request = $http(
            {
                method: 'GET',
                url: '/tipofalla',
            }) ;
            return request ;
    }
   

    
    return TipoFallaRequest ; 

});
