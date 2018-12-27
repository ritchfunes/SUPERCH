SabuesoAPP.factory('FactoryCrearMantenimiento', function($http , $q ) {

    'use strict';
    var ModeloMantenimientoRequest = $q.defer();
    

    ModeloMantenimientoRequest.editar = function(params)
    {
        let request = $http( {
            method: 'PUT' , 
            url: '/mantenimiento' , 
            data: params
        }) ;
        return request ;
    }
    
    
    
    ModeloMantenimientoRequest.eliminar = function(idMantenimiento){
        var request = $http({
            method: 'delete' , 
            url: '/mantenimiento' , 
            data:idMantenimiento ,
            headers: {"Content-Type":"application/json;charset=utf-8"}
        });
       return request ;
    }
    
    ModeloMantenimientoRequest.guardar = function(parametros){
        var request = $http({
            method: 'POST' , 
            url: '/mantenimiento' , 
            data: parametros ,
        });
        return request ;
    }
    
    ModeloMantenimientoRequest.get = function(){
       var request = $http({
           method: 'GET' , 
           url: '/mantenimiento' , 
       });
        return request ;
    }


    
     return ModeloMantenimientoRequest ; 
    
    } ) ;