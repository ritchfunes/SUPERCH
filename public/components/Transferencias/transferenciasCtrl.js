/**
 * Created by Jeffry Romero on 09/09/2016.
 */
SabuesoAPP.controller('TransferenciasController', function ($scope,ServicioUnidades,FactoryTransferencias,ServicioTransferencias,$uibModal,FactoryUnidades,FactoryViajeCompleto,FactoryMotorista) {

    var check=null;
    $scope.init=function(){
        $scope.template="<div class=\"modal-header\">\
            <h3>{{title}}</h3>\
        </div>\
\
        <div class=\"modal-body\">\
            <label for=\"\">{{bodyTxt}}</label>\
    </div>\
\
    <div class=\"modal-footer\">\
    <button class=\"btn btn-primary\" ng-click=\"$dismiss('yes')\">Si</button>\
    <button class=\"btn btn-warning\" ng-click=\"$dismiss('no')\">No</button>\
    </div>";
        $scope.data={};
        $scope.NombreViaje="Seleccione un viaje";
        check=moment().format('MM/DD/YYYY hh:mm:ss a');
        $scope['fechahora']=moment(check).toDate();

        if(ServicioUnidades.ListaUnidades.length<=0) $scope.listarUnidades();
        if(ServicioTransferencias.listaViajes.length<=0) {
            $scope.listarViajesCompletos();
        }
        $scope.ventanaAtencion = $scope.now = moment(check).toDate();
        $scope.ventanaRetorno=moment(check).toDate();
        cargarMotoristas()
    };
    $scope.motoristas = [];
    $scope.cargarUnidades=function(){
        return ServicioUnidades.ListaUnidades;
    };

    $scope.cargarConductores = function(){
        FactoryMotorista.sinViaje().then(function (res){
            if (res.status == 200){
                ServicioMotorista.listaMotoristaSinViaje = res.data.info;
                console.log (ServicioMotorista.listaMotoristaSinViaje);
            }
        });
    };

    $scope.listarMotoristas = function(){
        return ServicioMotorista.listaMotoristaSinViaje;
    };

    $scope.guardar= function () {
        $scope.saveValidation=true;
        check=moment().format('MM/DD/YYYY hh:mm:ss a');
        
        if(typeof $scope.data.FK_ConductoresId ==="undefined"){
            $.bootstrapGrowl("Advertencia, por favor seleccione un conductor", {type: 'warning',delay: 120000});
            $scope.saveValidation=false;
        }
        else if(typeof $scope.data.vehiculo==="undefined"){
            $.bootstrapGrowl("Advertencia, por favor seleccione una Unidad", {type: 'warning',delay: 120000});
            $scope.saveValidation=false;
        }else if(typeof $scope.data.transferencia==="undefined"){
            $.bootstrapGrowl("Advertencia, por favor ingrese la Transferencia", {type: 'warning',delay: 120000});
            $scope.saveValidation=false;
        }else if((new Date($scope.fechahora).getTime() > new Date(check).getTime())){
            $.bootstrapGrowl("Advertencia, por favor ingrese una fecha valida", {type: 'warning',delay: 120000});
            $scope.saveValidation=false;
        }else if(new Date($scope.now).getTime() === new Date($scope.ventanaAtencion).getTime()){
            $.bootstrapGrowl("Advertencia, La ventana de atencion tiene que ser mayor a la hora actual. " +
                "Recordar que la Ventana de Atencion es la hora de llegada al CD.", {type: 'warning',delay: 120000});
            $scope.saveValidation=false;
        }else if((typeof $scope.data.viajecompleto === "undefined")){
            $.bootstrapGrowl("Advertencia, por favor seleccione un viaje", {type: 'warning',delay: 120000});
            $scope.saveValidation=false;
        }else if($scope.data.vehiculo.Rastra==""){
            $scope.title="La Rastra no esta Enlazada con la Unidad";
            $scope.bodyTxt="¿Desea guardar la Transferencia?";
            var confirmModal=$uibModal.open({
                animation:true,
                template:$scope.template,
                scope: $scope,
                backdrop:'static',
                size:'md'
            });

            confirmModal.result.then(null, function (res) {
                if(res=='no'){
                    $scope.saveValidation=false;
                    $.bootstrapGrowl("La Transferencia no fue creada", {type: 'danger',delay: 120000});
                }else{
                    save();
                }
            });
        }else {
            save();
        }
    };

    var save=function(){
        data={
            imei:$scope.data.vehiculo.Imei
        };
        FactoryTransferencias.termino(data).then(function (res) {
            if(res.status==200 || res.status==304){
                if(res.data.msg==true){
                    var termino=res.data.info[0].Termino;
                    //if(termino==1){
                    if(true){
                        $scope.data['imei']=$scope.data.vehiculo.Imei;
                        $scope.data['rastra']=$scope.data.vehiculo.Rastra;
                        $scope.data.fechahora=localTimeToUtc($scope.fechahora);
                        $scope.data.ventanaAtencion=$scope.ventanaAtencion;
                        $scope.data.ventanaRetorno=$scope.ventanaRetorno;

                        if(!($scope.ventanaAtencion===null && $scope.ventanaRetorno===null)){
                            if($scope.ventanaAtencion<=$scope.fechahora || $scope.ventanaRetorno<=$scope.fechahora){
                                $.bootstrapGrowl("Error, las ventanas tienen que tener una fecha mayor a la fecha de creacion",{type: 'danger',delay:12000});
                                $scope.saveValidation=false;
                            }else if(moment($scope.ventanaAtencion).isSame($scope.ventanaRetorno)){
                                $.bootstrapGrowl("Error, las fechas de ventanas no pueden ser iguales",{type: 'danger',delay:12000});
                                $scope.saveValidation=false;
                            }else if($scope.ventanaAtencion>$scope.ventanaRetorno){
                                $.bootstrapGrowl("Error, la fecha de la Ventana de Atencion debe ser MENOR a la fecha de Ventana de Retorno",{type: 'danger',delay:12000});
                                $scope.saveValidation=false;
                            }else{
                                $scope.data.ventanaAtencion=localTimeToUtc($scope.ventanaAtencion);
                                $scope.data.ventanaRetorno=localTimeToUtc($scope.ventanaRetorno);
                            }
                        }

                        if($scope.saveValidation==true){
                            FactoryTransferencias.guardar($scope.data).then(function (res) {
                                if (res.status == 200) {
                                    if (res.data.msg == true) {
                                        check = moment().format('MM/DD/YYYY hh:mm:ss a');
                                        $scope.fechahora = moment(check).toDate();
                                        $.bootstrapGrowl("Transferencia Creada Exitosamente!", {
                                            type: 'success',
                                            delay: 120000
                                        });
                                    } else {
                                        $.bootstrapGrowl("Error, la Transferencia no fue creada", {
                                            type: 'danger',
                                            delay: 120000
                                        });
                                    }
                                } else {
                                    $.bootstrapGrowl("Error, la Transferencia no fue creada", {
                                        type: 'danger',
                                        delay: 120000
                                    });
                                }
                            });
                        }else{
                            $.bootstrapGrowl("Error, la Transferencia no fue creada", {type: 'danger',delay: 120000});
                        }
                    }else{
                        $.bootstrapGrowl("La Unidad tiene una Transferencia en progreso", {type: 'danger',delay: 120000});
                    }
                }
            }
        });
    };


    //Listar Transferencias
    $scope.initListar= function () {
        $scope.cargarListaTrans();
    };

    $scope.cargarListaTrans= function () {
        FactoryTransferencias.listar().then(function (res) {
            if(res.status==200){
                if(res.data.msg==true){
                    ServicioTransferencias.listaTransferencias=res.data.info;

                    for(x in ServicioTransferencias.listaTransferencias){
                        if(ServicioTransferencias.listaTransferencias[x].FechaHora!=null){
                            var fechahora=utcTimeToLocalTime(ServicioTransferencias.listaTransferencias[x].FechaHora);
                            ServicioTransferencias.listaTransferencias[x].FechaHora=moment(fechahora).format('MM/DD/YYYY hh:mm:ss a');
                        }
                        if(ServicioTransferencias.listaTransferencias[x].VentanaAtencion!=null){
                            var atencion=utcTimeToLocalTime(ServicioTransferencias.listaTransferencias[x].VentanaAtencion);
                            ServicioTransferencias.listaTransferencias[x].VentanaAtencion=moment(atencion).format('MM/DD/YYYY hh:mm:ss a');
                        }
                        if(ServicioTransferencias.listaTransferencias[x].VentanaRetorno!=null){
                            var retorno=utcTimeToLocalTime(ServicioTransferencias.listaTransferencias[x].VentanaRetorno);
                            ServicioTransferencias.listaTransferencias[x].VentanaRetorno=moment(retorno).format('MM/DD/YYYY hh:mm:ss a');
                        }
                    }
                }
            }else{
                $.bootstrapGrowl("Error, no se pudo cargar la informacion de las Transferencias", {type: 'danger',delay: 120000})
            }
        });
    };

    $scope.listaTransferencias= function () {
        return ServicioTransferencias.listaTransferencias;
    };

    $scope.editar= function (transferencia) {
        var modalInstance = $uibModal.open({
            animation:true,
            templateUrl: 'components/Transferencias/modificarTransferencias.html',
            controller: 'editarTransferenciasCtrl',
            size:'lg',
            resolve: {
                transferencia: function () {
                    return transferencia;
                },
                template: function () {
                    var template="<div class=\"modal-header\">\
            <h3>{{title}}</h3>\
        </div>\
\
        <div class=\"modal-body\">\
            <label for=\"\">{{bodyTxt}}</label>\
    </div>\
\
    <div class=\"modal-footer\">\
    <button class=\"btn btn-primary\" ng-click=\"$dismiss('yes')\">Si</button>\
    <button class=\"btn btn-warning\" ng-click=\"$dismiss('no')\">No</button>\
    </div>";
                    return template;
                }
            }
        });
    };

    $scope.listarUnidades= function () {
        FactoryUnidades.listarCH().then(function (res) {
            if(res.status==200){
                if(res.data.msg==true){
                    ServicioUnidades.ListaUnidades=res.data.info;
                }
            }
        });
    };

    $scope.listarViajesCompletos= function () {
        FactoryViajeCompleto.listar().then(function (res) {
            if(res.status==200 || res.status==304){
                if(res.data.msg==true){
                    ServicioTransferencias.listaViajes=res.data.info;
                    $scope.cargarViajes();
                }
            }
        });
    };
    
    $scope.cargarViajes= function () {
        return ServicioTransferencias.listaViajes;
    };

    function cargarMotoristas(){
        FactoryMotorista.ObtenerconductoresDisponibles()
        .then( function ( res ){
            $scope.motoristas = res.data.info;
        });
    }

    $scope.selectedValue= function (value) {
        $scope.data.viajecompleto=value.ViajeCompletoId;
        $scope.NombreViaje=value.Nombre;
        fecha=moment($scope.ventanaAtencion);
        time=value.Retorno.split(':');
        dur=moment.duration({
            hours: parseInt(time[0]),
            minutes: parseInt(time[1])
        });
        newFecha=moment(fecha).add(dur);

        $scope.ventanaRetorno=moment(newFecha).toDate();
        $scope.show=true;
        $scope.diff=value.Retorno;
    };
});

SabuesoAPP.controller('editarTransferenciasCtrl', function (transferencia, template, $scope,ServicioUnidades,FactoryTransferencias,ServicioTransferencias,$uibModalInstance, $uibModal,ServicioMotorista) {
    var check=null;
    $scope.init= function () {
        $scope.template=template;
        check=moment(transferencia.FechaHora).format('MM/DD/YYYY hh:mm:ss a');
        $scope.data={ };
        $scope.data.id=transferencia.TransferenciaId;
        //$scope.data['unidad']={imei:transferencia.Imei,vehiculo:transferencia.Vehiculo};
        $scope.data.imei=transferencia.Imei;

        $scope.data['vehiculo']={
            Imei:transferencia.Imei,
            NombreCompleto:transferencia.Vehiculo,
            Rastra:transferencia.Rastra
        };

        $scope.data.transferencia=transferencia.Transferencia;
        $scope['fechahora']=moment(check).toDate();
        $scope.data.viajecompleto=transferencia.ViajeCompletoId;
        $scope.NombreViaje=transferencia.Viaje;
        $scope.ventanaAtencion=moment(transferencia.VentanaAtencion).toDate();
        $scope.ventanaRetorno=moment(transferencia.VentanaRetorno).toDate();

//        $scope.data.Conductor;

 //       $scope.data1={};
        $scope.data['motorista']={
        Codigo:ServicioMotorista.listaMotoristaSinViaje.FK_ConductoresId,
        Motorista:ServicioMotorista.listaMotoristaSinViaje.Motorista,
        };


    };

    $scope.cargarUnidades= function () {
        return ServicioUnidades.ListaUnidades;
    };

    $scope.modificar= function () {
        check=moment().format('MM/DD/YYYY hh:mm:ss a');
        if(typeof $scope.data.vehiculo==="undefined"){
            $.bootstrapGrowl("Advertencia, por favor seleccione una Unidad", {type: 'warning',delay: 120000})
            $scope.saveValidation=false;
        }else if(typeof $scope.data.transferencia==="undefined"){
            $.bootstrapGrowl("Advertencia, por favor ingrese una Transferencia", {type: 'warning',delay: 120000})
        }else if((new Date($scope.fechahora).getTime() > new Date(check).getTime())){
            $.bootstrapGrowl("Advertencia, por favor ingrese una fecha valida", {type: 'warning',delay: 120000})
            $scope.saveValidation=false;
        }else if((typeof $scope.data.viajecompleto === "undefined")){
            $.bootstrapGrowl("Advertencia, por favor seleccione un viaje", {type: 'warning',delay: 120000})
            $scope.saveValidation=false;
        }else if($scope.data.vehiculo.Rastra==""){
            $scope.title="La Rastra no esta Enlazada con la Unidad";
            $scope.bodyTxt="¿Desea guardar la Transferencia?";
            var confirmModal=$uibModal.open({
                animation:true,
                template:$scope.template,
                scope: $scope,
                backdrop:'static',
                size:'md'
            });

            confirmModal.result.then(null, function (res) {
                if(res=='no'){
                    $scope.saveValidation=false;
                    $.bootstrapGrowl("La Transferencia no fue creada", {type: 'danger',delay: 120000});
                }else{
                    if(transferencia.Imei!=$scope.data.vehiculo.imei){
                        checkTransferencia();
                    }else{
                        editar();
                    }
                }
            });
        }else{
            if(transferencia.Imei!=$scope.data.vehiculo.imei){
                checkTransferencia();
            }else{
                editar();
            }
        }
    };

    var editar= function () {
        $scope.data['imei']=$scope.data.vehiculo.Imei;
        $scope.data['rastra']=$scope.data.vehiculo.Rastra;
        $scope.data.fechahora=localTimeToUtc($scope.fechahora);
        $scope.data.ventanaAtencion=$scope.ventanaAtencion;
        $scope.data.ventanaRetorno=$scope.ventanaRetorno;

        $scope.saveValidation=true;
        if(!($scope.ventanaAtencion===null && $scope.ventanaRetorno===null)){
            if($scope.ventanaAtencion<=$scope.fechahora || $scope.ventanaRetorno<=$scope.fechahora){
                $.bootstrapGrowl("Error, las ventanas tienen que tener una fecha mayor a la fecha de creacion",{type: 'danger',delay:12000});
                $scope.saveValidation=false;
            }else if(moment($scope.ventanaAtencion).isSame($scope.ventanaRetorno)){
                $.bootstrapGrowl("Error, las fechas de ventanas no pueden ser iguales",{type: 'danger',delay:12000});
                $scope.saveValidation=false;
            }else if($scope.ventanaAtencion>$scope.ventanaRetorno){
                $.bootstrapGrowl("Error, la fecha de la Ventana de Atencion debe ser MENOR a la fecha de Ventana de Retorno",{type: 'danger',delay:12000});
                $scope.saveValidation=false;
            }else{
                $scope.data.ventanaAtencion=localTimeToUtc($scope.ventanaAtencion);
                $scope.data.ventanaRetorno=localTimeToUtc($scope.ventanaRetorno);
            }
        }
        FactoryTransferencias.editar($scope.data).then(function (res) {
            if(res.status==200){
                if(res.data.msg==true){
                    index=ServicioTransferencias.listaTransferencias.indexOf(transferencia);
                    ServicioTransferencias.listaTransferencias[index].Imei=$scope.data.imei;
                    ServicioTransferencias.listaTransferencias[index].Vehiculo=$scope.data.vehiculo.NombreCompleto;
                    ServicioTransferencias.listaTransferencias[index].Transferencia=$scope.data.transferencia;
                    ServicioTransferencias.listaTransferencias[index].FechaHora=moment($scope.fechahora).format('MM/DD/YYYY hh:mm:ss a');
                    ServicioTransferencias.listaTransferencias[index].Rastra=$scope.data.rastra;
                    ServicioTransferencias.listaTransferencias[index].Viaje=$scope.NombreViaje;
                    ServicioTransferencias.listaTransferencias[index].ViajeCompletoId=$scope.data.viajecompleto;
                    ServicioTransferencias.listaTransferencias[index].Conductor=res.data.info[0]['Conductor'];
                    if($scope.ventanaAtencion==null && $scope.ventanaRetorno==null){
                        ServicioTransferencias.listaTransferencias[index].VentanaAtencion=null;
                        ServicioTransferencias.listaTransferencias[index].VentanaRetorno=null;
                    }else{
                        ServicioTransferencias.listaTransferencias[index].VentanaAtencion=moment($scope.ventanaAtencion).format('MM/DD/YYYY hh:mm:ss a');
                        ServicioTransferencias.listaTransferencias[index].VentanaRetorno=moment($scope.ventanaRetorno).format('MM/DD/YYYY hh:mm:ss a');
                    }

                    $.bootstrapGrowl("Transferencia modificada exitosamente!", {type: 'success',delay: 120000});
                    $uibModalInstance.close();
                }
            }else if(res.status==400){
                $.bootstrapGrowl("Error, Solicitud incorrecta al servidor", {type: 'danger',delay: 120000});
            }else{
                $.bootstrapGrowl("Error, la Transferencia no se pudo modificar", {type: 'danger',delay: 120000});
            }
        });
    };

    $scope.cargarViajes= function () {
        return ServicioTransferencias.listaViajes;
    };

    $scope.selectedValue= function (value) {
        $scope.data.viajecompleto=value.ViajeCompletoId;
        $scope.NombreViaje=value.Nombre;
    };

    var checkTransferencia= function () {
        data={
            imei:$scope.data.vehiculo.Imei
        };
        FactoryTransferencias.termino(data).then(function (res) {
            if(res.status==200 || res.status==304) {
                if (res.data.msg == true) {
                    var termino;
                    if(data.imei==transferencia.Imei){
                        termino=1;
                    }else{
                        termino = res.data.info[0].Termino;
                    }
                    if(termino==1){
                        editar();
                    }else{
                        $.bootstrapGrowl("La Unidad tiene una Transferencia en progreso", {type: 'danger',delay: 120000});
                    }
                }
            }
        });
    }
});