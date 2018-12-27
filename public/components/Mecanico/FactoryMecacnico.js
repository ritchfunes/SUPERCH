SabuesoAPP.factory('FactoryCrearMecanico', function($http , $q ) {

    'use strict';
    var MecanicoRequest = $q.defer();
    

    MecanicoRequest.editar = function(params)
    {
        let request = $http( {
            method: 'PUT' , 
            url: '/mecanicos' , 
            data: params
        }) ;
        return request ;
    }
    
    
    
    MecanicoRequest.eliminar = function(idMecanico){
        var request = $http({
            method: 'delete' , 
            url: '/mecanicos' , 
            data:idMecanico ,
            headers: {"Content-Type":"application/json;charset=utf-8"}
        });
       return request ;
    }
    
    MecanicoRequest.guardar = function(parametros){
        var request = $http({
            method: 'POST' , 
            url: '/mecanicos' , 
            data: parametros ,
        });
        return request ;
    }
    
    MecanicoRequest.get = function(){
       var request = $http({
           method: 'GET' , 
           url: '/mecanicos' , 
       });
        return request ;
    }


    
     return MecanicoRequest ; 
    
    } ) ;