/**
 * Created by GMG on 14/06/2016.
 */
SabuesoAPP.controller("enlacesController", function ($scope, FactoryEnlaces, ServiceEnlaces, $uibModalInstance, $uibModal) {
    $scope.selectedUnit={};
    $scope.selectedRastra={};
    $scope.idEnlace={};


    $scope.listaUnidades=[];
    $scope.listaRastras=[];
    $scope.listaRastrasTodas=[];
    $scope.listaEnlazados=[];

    $scope.listarNoEnlazados= function () {
        if(ServiceEnlaces.unidadesSinEnlazar.length<=0){
            FactoryEnlaces.unidadesSinEnlace().then(function (result) {
                ServiceEnlaces.unidadesSinEnlazar=result.data.info;
                $scope.listaUnidades=result.data.info;
            });
           // console.log(ServiceEnlaces.unidadesSinEnlazar);
        }else if(ServiceEnlaces.unidadesSinEnlazar.length>0){
            $scope.listaUnidades=ServiceEnlaces.unidadesSinEnlazar;
        }

        if(ServiceEnlaces.rastrasSinEnlazar.length<=0){
            FactoryEnlaces.rastraSinEnlace().then(function (result) {
                ServiceEnlaces.rastrasSinEnlazar=result.data.info;
                $scope.listaRastras=result.data.info;
            });
        }else if(ServiceEnlaces.rastrasSinEnlazar.length>0){
            $scope.listaRastras=ServiceEnlaces.rastrasSinEnlazar;
        }
    };

    $scope.enlazar= function () {
        $scope.date = new Date();

        console.log( $scope.date) ;
        var data=[];
        data.push({
            unidadId: $scope.selectedUnit.UnidadId,
            rastraId: $scope.selectedRastra.RastraId,
            nombreUnidad: $scope.selectedUnit.Nombre_Vehiculo,
            nombreRastra: $scope.selectedRastra.Rastra ,
            Fecha:moment($scope.date).format('YYYY-MM-DD') 
        });

    //    console.log(data);
     //   console.log("enlazar en controller");

        FactoryEnlaces.enlazar(data).then(function (result) {
            if(result.data.msg==true){
                $.bootstrapGrowl("La rastra se enlazo exitosamente!", {type: 'success', delay: 10000});
                index=$scope.listaUnidades.indexOf($scope.selectedUnit);
                $scope.listaUnidades.splice(index,1);
                ServiceEnlaces.unidadesSinEnlazar=$scope.listaUnidades;

                index2= $scope.listaRastras.indexOf($scope.selectedRastra);
                $scope.listaRastras.splice(index2,1);
                ServiceEnlaces.rastrasSinEnlazar=$scope.listaRastras;
                //agregar nueva fila a ListaEnlazados si no esta vacia
                /*if(ServiceEnlaces.listaEnlazados.lenght>0){
                    newRow={
                        EnlaceId: result.info,
                        UnidadId: selectedUnit.UnidadId,
                        Nombre_Vehiculo: selectedUnit.Nombre_Vehiculo,
                        RastraId: selectedRastra.RastraId,
                        Rastra: selectedRastra.Rastra
                    };
                    console.log(JSON.stringify(newRow));
                    ServiceEnlaces.listaEnlazados.push(newRow);
                    //console.log(ServiceEnlaces.listaEnlazados[ServiceEnlaces.listaEnlazados.indexOf(newRow)].EnlaceId);
                }*/
                $scope.selectedUnit={};
                $scope.selectedRastra={};
                ServiceEnlaces.listaEnlazados=[];
                $scope.listarEnlazados();
                /*$scope.unidadesId=[];
                $scope.rastrasId=[];
                ServiceEnlaces.unidadesSinEnlazar=[];
                ServiceEnlaces.rastrasSinEnlazar=[];
                ServiceEnlaces.listaEnlazados=[];*/
                //$uibModalInstance.dismiss("cancel");
            }else{
                $.bootstrapGrowl("Error, La rastra no pudo ser enlazada", {type: 'danger', delay: 10000});
                console.log(result);
            }
        });
    };

    $scope.listarEnlazados= function () {
        if(ServiceEnlaces.listaEnlazados.length==0){
            FactoryEnlaces.unidadesEnlazadas().then(function (result) {
                ServiceEnlaces.listaEnlazados=result.data.info;
                $scope.listaEnlazados=result.data.info;
            })
        }else if(ServiceEnlaces.listaEnlazados.length>0){
            $scope.listaEnlazados=ServiceEnlaces.listaEnlazados;
        }
    };

    $scope.desenlazar= function () {
        if(typeof $scope.idEnlace==="undefined"){
            $.bootstrapGrowl("Error, tiene que seleccionar una unidad para desenlazarla", {type: 'danger', delay: 10000});
        }else{
            data={
                id:$scope.idEnlace.EnlaceId,
                enlace: $scope.idEnlace.Rastra + " - " + $scope.idEnlace.Nombre_Vehiculo
            };
            FactoryEnlaces.desenlazar(data).then(function (result) {
                if(result.data.msg==true){
                    $.bootstrapGrowl("La rastra se desenlazo exitosamente!", {type: 'success', delay: 10000});
                    index=$scope.listaEnlazados.indexOf($scope.idEnlace);
                    $scope.listaEnlazados.splice(index,1);
                    ServiceEnlaces.listaEnlazados=$scope.listaEnlazados;
                    //agregar valores a listas de unidades y rastras sin enlazar solo si estas listas no estan vacias
                    /*if(ServiceEnlaces.unidadesSinEnlazar.length>0 && ServiceEnlaces.rastrasSinEnlazar.length>0){
                        ServiceEnlaces.unidadesSinEnlazar.push({
                            UnidadId: $scope.idEnlace.UnidadId,
                            Nombre_Vehiculo: $scope.idEnlace.Nombre_Vehiculo
                        });
                        ServiceEnlaces.rastrasSinEnlazar.push({
                            RastraId: $scope.idEnlace.RastraId,
                            Rastra: $scope.idEnlace.Rastra
                        });
                    }*/
                    ServiceEnlaces.unidadesSinEnlazar=[];
                    ServiceEnlaces.rastrasSinEnlazar=[];
                    $scope.listarNoEnlazados();
                    $scope.idEnlace={};
                }else{
                    $.bootstrapGrowl("Error, La rastra no pudo ser desenlazada", {type: 'danger', delay: 10000});
                    console.log(result);
                }
            });
        }
    };

    $scope.crearRastra= function () {
        data={
            rastra: $scope.rastra,
            barcode: $scope.barcode
        };

        if($scope.placa==""){}else{
            data['placa']=$scope.placa;
        }

        console.log(data);

        FactoryEnlaces.crearRastra(data).then(function (result) {
            if(result.data.msg==true) {
                $.bootstrapGrowl("Rastra creada exitosamente!", {type: 'success', delay: 10000});
                $scope.rastra="";
                $scope.barcode="";
                $scope.placa="";
            }else{
                $.bootstrapGrowl("Error, La Rastra No pudo ser creada", {type: 'danger', delay: 10000});
                console.log(result);
            }
        });
    };
    
    $scope.listarRastras= function () {
        if(ServiceEnlaces.listaRastras.length<=0){
            FactoryEnlaces.rastras().then(function (result) {
                ServiceEnlaces.listaRastras=result.data.info;
                $scope.listaRastrasTodas=result.data.info;
            });
        }else if(ServiceEnlaces.listaRastras.length>0){
            $scope.listaRastrasTodas=ServiceEnlaces.listaRastras;
        }
    };

    $scope.editarRastra= function (rastra) {
        var modalInstance = $uibModal.open({
            animation:true,
            templateUrl:'components/Enlaces/vistaModRastras.html',
            controller:'editarRastraController',
            size:'lg',
            resolve:{
                rastra:function(){
                    return rastra;
                }
            }
        });
        modalInstance.result.then(function (rastraMod) {
            index=$scope.listaRastrasTodas.indexOf(rastra);
            //console.log($scope.listaRastrasTodas[index]);
            $scope.listaRastrasTodas[index]=rastraMod;
            //console.log($scope.listaRastrasTodas[index]);
        });
    };


    
});

SabuesoAPP.controller("editarRastraController", function ($scope, rastra, $uibModalInstance, FactoryEnlaces, ServiceEnlaces) {
    $scope.rastra=rastra.Rastra;
    $scope.barcode=rastra.Barcode;
    $scope.placa=rastra.Placa;

    $scope.editarRastra= function () {
        data={};
        if($scope.rastra==""){}else{
            data['Rastra']=$scope.rastra;
        }
        if($scope.barcode==""){}else{
            data['Barcode']=$scope.barcode;
        }
        if($scope.placa==""){}else{
            data['Placa']=$scope.placa;
        }

        console.log(data);

        if((typeof data['Rastra']==="undefined") || (typeof data['Barcode']==="undefined")){
            $.bootstrapGrowl("Algo salio mal, La Rastra No se puede modificar porque le faltan el Nombre de la Rastra o el Barcode", {type: 'warning', delay: 20000});
            console.log("algo fue mal");
        }else{
            data['RastraId']=rastra.RastraId;
            FactoryEnlaces.editarRastra(data).then(function (result) {
                if(result.data.msg==true) {
                    $.bootstrapGrowl("Rastra modificada exitosamente!", {type: 'success', delay: 10000});
                    $uibModalInstance.close(data);
                    rastra=data;
                }else {
                    $.bootstrapGrowl("Error, La Rastra No pudo ser modificada", {type: 'danger', delay: 10000});
                    console.log(result);
                    //$uibModalInstance.dismiss("cancel");
                }
            });
        }
    };
});