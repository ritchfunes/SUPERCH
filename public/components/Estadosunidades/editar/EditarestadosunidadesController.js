SabuesoAPP.controller("editarestadosunidadesCtrl", function($scope, $uibModalInstance, $uibModal, estadounidad,  FactoryCrearEstadosUnidades )
{
    
    
    $scope.init = function(){

        $scope.estadounidad = estadounidad;

        $scope.estadounidad.Activo = 1 ;
        
    }




    $scope.editarEstadounidades = function(){
    

        data = {
            PK_Estado: $scope.estadounidad.PK_Estado,
            Estado: $scope.estadounidad.Estado,
            Observacion: $scope.estadounidad.Observacion,
            Activo: $scope.estadounidad.Activo
        }


     //   data = deleteEmptyFields(data);

        FactoryCrearEstadosUnidades.editar(data).then(function(res){
            if(res.status == 200){

                if(data.Activo == 1)
                {
                    $scope.estadounidad['Activo'] = "activo" ;
                }
                else {
                    $scope.estadounidad['Activo'] = "inactivo" ;
                }
                $.bootstrapGrowl("Estado unidad editado exitosamente!", {type: 'success',delay: 10000});
                $uibModalInstance.close($scope.estadounidad);
            }
             else {
                $.bootstrapGrowl("Error editar estado unidad", {type: 'danger',delay: 10000});
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