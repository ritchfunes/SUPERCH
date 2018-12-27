/**
 * Created by Jeffry Romero on 01/09/2016.
 */
SabuesoAPP.controller("autorizadosCtrl",function($scope,FactoryAutorizados,ServicioReferencias,$uibModal,$rootScope,$uibModalInstance){
    $scope.init= function () {
        FactoryAutorizados.ObtenerRefAutorizadas().then(function (res) {
            if(res.data.msg==true){
                ServicioReferencias.lugaresAutorizados=res.data.info;
            }
        });
    };

    $scope.getLugaresAutorizados= function () {
        return ServicioReferencias.lugaresAutorizados;
    };

    $scope.modificar=function(referencia){
        var modalInstance = $uibModal.open({
            animation:true,
            templateUrl: 'components/lugaresNoAutorizados/editarAutorizado.html',
            controller: 'editAutorizadosCtrl',
            size:'md',
            resolve: {
                referencia: function () {
                    return referencia;
                }
            }
        });
    };

    $scope.localizar=function(referencia){
        var lon = referencia.Longitud; //lon / puntos.length;
        var lat = referencia.Latitud; //lat / puntos.length;
        console.log(lon);
        console.log(lat);
        $rootScope.$broadcast('eventName', {lon: lon,lat: lat });
        $uibModalInstance.close(referencia);
    };

    $scope.eliminar=function(referencia,idParada){
        data={id:idParada};
        FactoryAutorizados.EliminarRefAutorizadas(data).then(function(res){
            if(res.data.msg==true){
                idx=ServicioReferencias.lugaresAutorizados.indexOf(referencia);
                ServicioReferencias.lugaresAutorizados.splice(idx,1);
                $.bootstrapGrowl("La Referencia Autorizada fue modificada exitosamente!", {type: 'success', delay: 120000})
            }else{
                $.bootstrapGrowl("Error, la referencia autorizada no se ha modificado", {type: 'danger',delay: 120000});
            }
        });
    };
});

SabuesoAPP.controller("editAutorizadosCtrl",function($scope,referencia,FactoryAutorizados,ServicioReferencias,$uibModalInstance){
    $scope.referencia={};

    $scope.init= function () {
        $scope.referencia=referencia;
    };

    $scope.modificar= function () {
        if($scope.referencia.Radio<=0){
            $.bootstrapGrowl("Error, el radio del lugar autorizada no puede ser menor o igual a cero", {type: 'warning',delay: 120000});
        }else{
            var data={
                id: $scope.referencia.ParadasId,
                referencias: $scope.referencia.ReferenciaId,
                radio: $scope.referencia.Radio
            };

            FactoryAutorizados.EditarRefAutorizadas(data).then(function (res) {
                if(res.data.msg==true){
                    idx=ServicioReferencias.lugaresAutorizados.indexOf(referencia);
                    ServicioReferencias.lugaresAutorizados[idx].ReferenciaId=$scope.referencia.ReferenciaId;
                    ServicioReferencias.lugaresAutorizados[idx].Radio=$scope.referencia.Radio;

                    $.bootstrapGrowl("Referencia Autorizada borrada exitosamente!", {type: 'success', delay: 120000});
                    $uibModalInstance.close();
                }else{
                    $.bootstrapGrowl("Error, la referencia autorizada no se ha borrado", {type: 'danger',delay: 120000});
                }
            });
        }
    }
});