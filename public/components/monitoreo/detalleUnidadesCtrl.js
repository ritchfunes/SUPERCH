/**
 * Created by Jeffry Romero on 19/10/2016.
 */
SabuesoAPP.controller("detalleUnidadesCtrl", function (geocerca,$scope,FactoryGeocercas) {
    $scope.detalles=[];
    $scope.nombreGeocerca=geocerca[0].NombreGeocerca;
    $scope.cantidad=geocerca[0].Cantidad;

    $scope.init= function () {
        $scope.detalles=geocerca[1];
    };

    $scope.exports= function () {
        var blob = new Blob([document.getElementById('detalleUnidades').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Reporte Unidades en Geocerca "+$scope.nombreGeocerca+".xls");
    }
});