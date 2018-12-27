/**
 * Created by Roberto on 15/02/2016.
 */
SabuesoAPP.factory('FiltrosFactory',function($q,$http)
{
   var Filtros = $q.defer();

    Filtros.guardar = function(params)
    {
        var request = $http({
            url:"/filtros",
            method:"POST",
            data:params
        });
        return request;
    }


    Filtros.obtener = function(){

        var request = $http({
            url:"/filtros",
            method:"GET",
        });
      return request;
    }

    Filtros.eliminar = function(idFiltro){

      var request = $http({

         method:'DELETE',
         url:'/filtros',
         data:idFiltro,
         headers:{"Content-Type":"application/json;charset=utf-8"}

       });

       return request;
    }

    Filtros.actualizar = function(parametros){

      var request = $http({
        method:'PUT',
        url:'/filtros',
        data:parametros,
      });

      return request;
    }


    return Filtros;

});
