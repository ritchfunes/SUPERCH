SabuesoAPP.factory('FactoryAlerta', function($http,$q) {

    'use strict';
    var AlertaRequest = $q.defer();

    AlertaRequest.guardar = function(parametros)
    {
        var request = $http({
           method:'POST',
            url:'/notificaciones',
            data:parametros,


        });

        return request;
    }

    AlertaRequest.ObtenerAlertas = function()
   {
       var request = $http({
           method: 'GET',
           url: '/notificaciones',

       });
       return request;
   }

   AlertaRequest.eliminar = function(idAlerta){

     var request = $http({

        method:'DELETE',
        url:'/notificaciones',
        data:idAlerta,
        headers:{"Content-Type":"application/json;charset=utf-8"}

      });

      return request;
   }


   AlertaRequest.actualizar = function(parametros){
     var request = $http({
       method:'PUT',
       url:'/notificaciones',
       data:parametros,
     });
     return request;
   }


    return AlertaRequest;


});
