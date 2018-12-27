SabuesoAPP.factory('factoryMonitoreo',function($http,$q) {

    'use strict';
    var monitoreoDash = $q.defer();

    monitoreoDash.getData = function()
    {
        var request = $http({
           method:'GET',
            url:'/limitevelocidadDetalle',
        });

        return request;
    }


    return monitoreoDash;


});
