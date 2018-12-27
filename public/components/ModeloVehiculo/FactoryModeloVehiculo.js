SabuesoAPP.factory('FactoryCrearModeloVehiculo', function($http,$q) {


    'use strict';
    var ModeloVehiculoRequest = $q.defer();



    ModeloVehiculoRequest.editar = function(params){
        let request = $http({
            method: 'PUT',
            url: '/modelovehiculo',
            data: params
        });

        return request;
    }


    ModeloVehiculoRequest.eliminar = function(idModeloVehiculo)
    {


        var request = $http({

            method:'delete',
            url:'/modelovehiculo',
            data:idModeloVehiculo,
            headers:{"Content-Type":"application/json;charset=utf-8"}
        });

        return request;
    }


    ModeloVehiculoRequest.guardar = function(parametros)
    {
        var request = $http({
           method:'POST',
            url:'/modelovehiculo',
            data:parametros,
           

        });

        return request;
    }

    

    ModeloVehiculoRequest.get = function()
    {

        var request = $http(
            {
                method: 'GET',
                url: '/modelovehiculo',
            }) ;
            return request ;
    }
   

    
    return ModeloVehiculoRequest ; 

});
