


SabuesoAPP.factory('FactoryProyeccionPlanTurnos', function($http,$q) {


    'use strict';
    var ProyeccionPlanTurnosRequest = $q.defer();


    ProyeccionPlanTurnosRequest.Obtenerturnos = function()
    {
        var request = $http({
            method: 'GET',
            url: '/turnos'
        });
        return request;
    };

    

    ProyeccionPlanTurnosRequest.editar = function(params){
        let request = $http({
            method: 'PUT',
            url: '/proyeccionplanturnos',
            data: params
        });

        return request;
    }


    ProyeccionPlanTurnosRequest.eliminar = function(idproyeccionplanturnos)
    {


        var request = $http({

            method:'delete',
            url:'/proyeccionplanturnos',
            data:idproyeccionplanturnos,
            headers:{"Content-Type":"application/json;charset=utf-8"}
        });

        return request;
    }

    ProyeccionPlanTurnosRequest.guardar = function(parametros)
    {
        var request = $http({
           method:'POST',
            url:'/proyeccionplanturnos',
            data:parametros,
           

        });

        return request;
    }
    
    ProyeccionPlanTurnosRequest.getProyeccionPlanTurnos = function()
    {

        var request = $http(
            {
                method: 'GET',
                url: '/proyeccionplanturnos',
            }) ;
            return request ;
    }
   


    return ProyeccionPlanTurnosRequest ; 

});
