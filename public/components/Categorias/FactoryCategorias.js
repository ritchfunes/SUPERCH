SabuesoAPP.factory('FactoryCrearCategoria', function($http,$q) {

    'use strict';
    var categoriaRequest = $q.defer();

    
    categoriaRequest.guardar = function(parametros)
    {
        var request = $http({
           method:'POST',
            url:'/categorias',
            data:parametros,
           

        });

        return request;
    }


     categoriaRequest.Obtenercategorias = function()
    {
        var request = $http({
            method: 'GET',
            url: '/categorias',
            
        });
        return request;
    }


    categoriaRequest.eliminar = function(idCategoria)
    {
        var request = $http({

            method:'DELETE',
            url:'/categorias',
            data:idCategoria,
            headers:{"Content-Type":"application/json;charset=utf-8"}
        });

        return request;
    }


    

    return categoriaRequest;


});
