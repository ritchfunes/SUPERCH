


SabuesoAPP.factory('FactoryProyeccionPlan', function($http,$q) {


    'use strict';
    var ProyeccionPlanRequest = $q.defer();


    ProyeccionPlanRequest.ObtenerViajeCompleto = function()
    {
        var request = $http({
            method: 'GET',
            url: '/ViajeCompleto'
        });
        return request;
    };

    

    ProyeccionPlanRequest.editar = function(params){
        let request = $http({
            method: 'PUT',
            url: '/ProyeccionPlan',
            data: params
        });

        return request;
    }


    ProyeccionPlanRequest.eliminar = function(idProyeccionPlan)
    {


        var request = $http({

            method:'delete',
            url:'/ProyeccionPlan',
            data:idProyeccionPlan,
            headers:{"Content-Type":"application/json;charset=utf-8"}
        });

        return request;
    }

    ProyeccionPlanRequest.guardar = function(parametros)
    {
        var request = $http({
           method:'POST',
            url:'/ProyeccionPlan',
            data:parametros,
           

        });

        return request;
    }
    
    ProyeccionPlanRequest.getProyeccionPlan = function()
    {

        var request = $http(
            {
                method: 'GET',
                url: '/ProyeccionPlan',
            }) ;
            return request ;
    }
   


    return ProyeccionPlanRequest ; 

});
