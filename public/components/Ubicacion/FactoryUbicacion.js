SabuesoAPP.factory('FactoryCrearUbicacion', function($http , $q ) {

    'use strict';
    var ModeloUbicacionRequest = $q.defer();
    
    ModeloUbicacionRequest.editar = function(params)
    {
        let request = $http( {
            method: 'PUT' , 
            url: '/ubicacion' , 
            data: params
        }) ;
        return request ;
    }
    
    
    
    ModeloUbicacionRequest.eliminar = function(idUbicacion){
        var request = $http({
            method: 'delete' , 
            url: '/ubicacion' , 
            data:idUbicacion ,
            headers: {"Content-Type":"application/json;charset=utf-8"}
        });
       return request ;
    }
    
    ModeloUbicacionRequest.guardar = function(parametros){
        var request = $http({
            method: 'POST' , 
            url: '/ubicacion' , 
            data: parametros ,
        });
        return request ;
    }
    
    ModeloUbicacionRequest.get = function(){
       var request = $http({
           method: 'GET' , 
           url: '/ubicacion' , 
       });
        return request ;
    }
     return ModeloUbicacionRequest ; 
    
    } ) ;