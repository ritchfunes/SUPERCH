/**
 * Created by Roberto on 17/08/2015.
 */
SabuesoAPP.factory('FactoryEmpresas', function($http,$q) {

    'use strict';
    var empresaRequest = $q.defer();




    empresaRequest.listar =  function()
    {
        return $http({
            method:"get",
            url:"empresas",
        });  //1. this returns promise
    }

    empresaRequest.listarUsuarios =  function(empresa)
    {
        //console.log(empresa);
        return $http({
            method:"get",
            url:"usuarios",
            params:{
                empresaId:empresa
            }

        });  //1. this returns promise
    }

    empresaRequest.generarAcceso =  function(data)
    {
        //console.log(empresa);
        return $http({
            method:"POST",
            url:"generarAcceso",
            data:data

        });  //1. this returns promise
    }



    return empresaRequest;


});
