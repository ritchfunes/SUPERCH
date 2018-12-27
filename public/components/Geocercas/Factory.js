/**
 * Created by Roberto on 1/09/2015.
 */
SabuesoAPP.factory('FactoryGeocercas', function($http) {

    return {
        info: function() {
            return $http.get('geocercas',{headers: {authorization: token}});  //1. this returns promise
        },
        todas: function()
        {
            return $http.get('geocercas/true');
        },
        unidades: function (data) {
            return $http.get('geocercas/unidades', { params: data });
        }
    };

});
