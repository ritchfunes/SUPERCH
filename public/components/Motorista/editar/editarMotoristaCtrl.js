SabuesoAPP.controller("editarMotoristaCtrl", function($scope, $uibModalInstance, $uibModal, motorista, FactoryMotorista ){
    $scope.init = function(){

        $scope.motorista = motorista;

        $scope.motorista.FechaExp = new Date(motorista.FechaExp);

        $scope.estados = [{
            id: 0,
            estado: "Disponible"
        }, {
            id: 1,
            estado: "Asignado a Viaje"
        }];
    }


    $scope.editarMotorista = function(){

        data = {
            id: $scope.motorista.IdConductor,
            nombre: $scope.motorista.Nombre,
            apellido: $scope.motorista.Apellido,
            codigo: $scope.motorista.Codigo,
            telefono: $scope.motorista.Telefono,
            direccion: $scope.motorista.Direccion,
            identidad: $scope.motorista.Identidad,
            fechaExp: moment($scope.motorista.FechaExp).format('YYYY-MM-DD HH:mm'),
            ficha: $scope.motorista.Ficha,
            empresa: $scope.motorista.EmpresaId,
            estado: $scope.motorista.Estado
        }



        data = deleteEmptyFields(data);

        FactoryMotorista.editar(data).then(function(res){
            if(res.status == 200){
                $.bootstrapGrowl("Motorista editado exitosamente!", {type: 'success',delay: 10000});
                $uibModalInstance.close($scope.motorista);
            }
             else {
                $.bootstrapGrowl("Error al editar Motorista", {type: 'danger',delay: 10000});
            }
        });
    }

    function deleteEmptyFields(data){
        for(key in data){
            if(typeof data[key] === 'undefined' || data[key] === '' || data[key] == null || data[key] === 'Invalid date'){
                delete data[key];
            }
        }
        return data;
    }
});