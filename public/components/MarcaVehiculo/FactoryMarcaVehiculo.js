SabuesoAPP.factory('FactoryCrearMarcaVehiculo', function($http,$q) {


    'use strict';
    var MarcaVehiculoRequest = $q.defer();



    MarcaVehiculoRequest.editar = function(params){
        let request = $http({
            method: 'PUT',
            url: '/marcavehiculo',
            data: params
        });

        return request;
    }


    MarcaVehiculoRequest.eliminar = function(idMarcaVehiculo)
    {


        var request = $http({

            method:'delete',
            url:'/marcavehiculo',
            data:idMarcaVehiculo,
            headers:{"Content-Type":"application/json;charset=utf-8"}
        });

        return request;
    }


    MarcaVehiculoRequest.guardar = function(parametros)
    {
        var request = $http({
           method:'POST',
            url:'/marcavehiculo',
            data:parametros,
           

        });

        return request;
    }

    

    MarcaVehiculoRequest.getmarcavehiculo = function()
    {

        var request = $http(
            {
                method: 'GET',
                url: '/marcavehiculo',
            }) ;
            return request ;
    }
   

    
    return MarcaVehiculoRequest ; 

});
