/**
 * Created by Roberto on 13/11/2015.
 */
SabuesoAPP.factory('FactoryPizarron',function($http,$q){
    'use strict';
    var pizarraRequest = $q.defer();

    pizarraRequest.iconosVehiculos = function(){
        var request = $http({
            method:"get",
            url:"iconos",
            //headers:globalHeader
        });

        return (request);

    };

    pizarraRequest.actualizarVehiculosInfo = function(parametros)
    {
        var request = $http({
            method:"PUT",
            url:"/unidades",
            data:parametros,
            //headers:globalHeader
        });

        return (request);
    };

    return pizarraRequest;


});


SabuesoAPP.service('ServicioPizarron',function(FactoryPizarron)
{

    this.iconosVehiculos = [];





});
