SabuesoAPP.factory('FactoryCrearTaller', function($http , $q ) {

'use strict';
var ModeloTallerRequest = $q.defer();

ModeloTallerRequest.editar = function(params)
{
    let request = $http( {
        method: 'PUT' , 
        url: '/taller' , 
        data: params
    }) ;
    return request ;
}



ModeloTallerRequest.eliminar = function(idTaller){
    var request = $http({
        method: 'delete' , 
        url: '/taller' , 
        data:idTaller ,
        headers: {"Content-Type":"application/json;charset=utf-8"}
    });
   return request ;
}

ModeloTallerRequest.guardar = function(parametros){
    var request = $http({
        method: 'POST' , 
        url: '/taller' , 
        data: parametros ,
    });
    return request ;
}

ModeloTallerRequest.get = function(){
   var request = $http({
       method: 'GET' , 
       url: '/taller' , 
   });
    return request ;
}
 return ModeloTallerRequest ; 

} ) ;